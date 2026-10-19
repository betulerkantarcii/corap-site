#!/usr/bin/env node
/**
 * Etsy CSV → content/products.imported.json
 *
 * Usage:
 *   npm run import:etsy -- path/to/EtsyListingsDownload.csv [--links path/to/links.csv] [--out file.json]
 *
 * Etsy export: Shop Manager → Settings → Options → Download Data → "Currently for sale listings".
 * That CSV has no listing URLs, so pass --links with a two-column CSV:
 *     title,url
 *     Caffeinated Çorap Tee,https://www.etsy.com/listing/123456789/...
 * (the first column may be the listing title or the slug). Unmatched listings
 * fall back to the shop front and are reported.
 *
 * Re-running keeps anything you edited by hand in the JSON for the same slug:
 * Turkish texts, category, featured/isNew flags and image alt texts.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const SHOP_URL = "https://www.etsy.com/shop/THEHOUSECATcorap";
const DEFAULT_OUT = "content/products.imported.json";

/* ---------- args ---------- */
const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args.splice(i, 2)[1];
};
const linksPath = flag("--links");
const outPath = resolve(flag("--out") ?? DEFAULT_OUT);
const csvPath = args[0];
if (!csvPath) {
  console.error("Usage: npm run import:etsy -- <etsy.csv> [--links links.csv] [--out file.json]");
  process.exit(1);
}

/* ---------- tiny RFC 4180 CSV parser (handles quotes + newlines in fields) ---------- */
function parseCsv(text) {
  text = text.replace(/^﻿/, "");
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  const [header, ...body] = rows.filter((r) => r.some((v) => v.trim() !== ""));
  const keys = header.map((h) => h.trim().toUpperCase());
  return body.map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] ?? "").trim()])));
}

/* ---------- helpers ---------- */
const TR_MAP = {
  ç: "c",
  ğ: "g",
  ı: "i",
  İ: "i",
  ö: "o",
  ş: "s",
  ü: "u",
  Ç: "c",
  Ğ: "g",
  Ö: "o",
  Ş: "s",
  Ü: "u",
};
const slugify = (s) =>
  s
    .replace(/[çğıİöşüÇĞÖŞÜ]/g, (ch) => TR_MAP[ch])
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");

function guessCategory(text) {
  const t = text.toLowerCase();
  if (/hoodie|sweatshirt|kapüşon|kapuson/.test(t)) return "hoodie";
  if (/t-?shirt|\btee\b|tişört|tisort|shirt/.test(t)) return "tshirt";
  if (/sticker|decal|çıkartma/.test(t)) return "sticker";
  return "print";
}

function variantsFrom(row) {
  const out = [];
  for (const n of [1, 2]) {
    const name = row[`VARIATION ${n} NAME`] || row[`VARIATION ${n} TYPE`];
    const values = row[`VARIATION ${n} VALUES`];
    if (name && values) {
      out.push({
        name_en: name,
        name_tr: name,
        options: values
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean),
      });
    }
  }
  return out.length ? out : undefined;
}

/* ---------- run ---------- */
const rows = parseCsv(readFileSync(csvPath, "utf8"));
if (!rows.length || !("TITLE" in rows[0])) {
  console.error("This doesn't look like an Etsy listings export (no TITLE column).");
  process.exit(1);
}

const links = new Map();
if (linksPath) {
  for (const r of parseCsv(readFileSync(linksPath, "utf8"))) {
    const key = r.TITLE ?? r.SLUG ?? Object.values(r)[0];
    const url = r.URL ?? Object.values(r)[1];
    if (key && url) links.set(slugify(key), url);
  }
}

const previous = existsSync(outPath) ? JSON.parse(readFileSync(outPath, "utf8")) : [];
const prevBySlug = new Map(previous.map((p) => [p.slug, p]));

const seen = new Set();
const missingLinks = [];
const needsTurkish = [];

const products = rows.map((row, index) => {
  let slug = slugify(row.TITLE) || `listing-${index + 1}`;
  while (seen.has(slug)) slug += "-2";
  seen.add(slug);

  const prev = prevBySlug.get(slug);
  const title = row.TITLE;
  const desc = row.DESCRIPTION.replace(/\r/g, "").trim();
  const images = Object.keys(row)
    .filter((k) => /^IMAGE\d+$/.test(k) && row[k])
    .sort((a, b) => Number(a.slice(5)) - Number(b.slice(5)))
    .map((k, i) => ({
      src: row[k],
      alt_en: prev?.images?.[i]?.alt_en ?? `${title} — photo ${i + 1}`,
      alt_tr: prev?.images?.[i]?.alt_tr ?? `${title} — fotoğraf ${i + 1}`,
    }));

  const etsyUrl = links.get(slug) ?? prev?.etsyUrl ?? SHOP_URL;
  if (etsyUrl === SHOP_URL) missingLinks.push(title);

  const title_tr = prev?.title_tr ?? title;
  if (title_tr === title) needsTurkish.push(slug);

  return {
    slug,
    title_tr,
    title_en: title,
    description_tr: prev?.description_tr ?? desc,
    description_en: desc,
    price: Number.parseFloat(row.PRICE) || 0,
    currency: row.CURRENCY_CODE || "USD",
    category: prev?.category ?? guessCategory(`${title} ${row.TAGS}`),
    tags: row.TAGS
      ? row.TAGS.split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [],
    images,
    etsyUrl,
    variants: variantsFrom(row),
    featured: prev?.featured ?? index < 4,
    isNew: prev?.isNew ?? false,
    soldOut: Number.parseInt(row.QUANTITY || "1", 10) <= 0,
  };
});

writeFileSync(outPath, JSON.stringify(products, null, 2) + "\n");

console.log(`✓ ${products.length} products → ${outPath}`);
if (missingLinks.length) {
  console.log(`\n⚠ ${missingLinks.length} without a listing URL (linking to the shop front):`);
  missingLinks.forEach((t) => console.log(`   - ${t}`));
}
if (needsTurkish.length) {
  console.log(
    `\n⚠ ${needsTurkish.length} need Turkish title/description (English copied for now):`,
  );
  needsTurkish.forEach((s) => console.log(`   - ${s}`));
}
console.log("\nCheck each product's category in the JSON — it was guessed from the title/tags.");
