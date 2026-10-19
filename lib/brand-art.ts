import { readFile } from "node:fs/promises";
import { join } from "node:path";

/*
  Shared bits for generated images (Open Graph cards, Apple touch icon).
  Rendered by next/og at build time, so colors are hex mirrors of the tokens
  in app/globals.css and the paw geometry mirrors MARK_LEG in components/ui/Logo.tsx.
*/
export const BRAND = {
  night: "#120d0a",
  caramel: "#b98a5e",
  spot: "#2e1f15",
  sock: "#fbf7f2",
  pink: "#f2b8b5",
  pinkDeep: "#e08f8a",
};

const LEG = (x: number) => `
  <g transform="translate(${x} 0)">
    <path fill="${BRAND.sock}" d="M-12 4L-9 -1L-5 3L-1 -2L3 3L7 -1L12 4C11 14 9 22 9 30C9 38 14 44 14 52C14 59 9 62 0 62S-14 59 -14 52C-14 44 -9 38 -9 30C-9 22 -11 14 -12 4Z"/>
    <path fill="${BRAND.caramel}" d="M-12 4L-9 -1L-5 3L-1 -2L3 3L7 -1L12 4C11 14 9 22 9 30V32L6 34L3 32L0 34L-3 32L-6 34L-9 32V30C-9 22 -11 14 -12 4Z"/>
    <g fill="${BRAND.spot}">
      <ellipse cx="-4" cy="11" rx="3.2" ry="1.7" transform="rotate(-14 -4 11)"/>
      <ellipse cx="4" cy="19" rx="3" ry="1.6" transform="rotate(12 4 19)"/>
      <ellipse cx="-3" cy="26" rx="2.4" ry="1.4"/>
    </g>
    <g fill="${BRAND.pink}">
      <ellipse cx="-9" cy="59.6" rx="3" ry="1.4"/><ellipse cx="0" cy="60.6" rx="3" ry="1.4"/><ellipse cx="9" cy="59.6" rx="3" ry="1.4"/>
    </g>
    <path fill="none" stroke="${BRAND.spot}" stroke-width="1.5" stroke-linecap="round" d="M-4.5 54V61M4.5 54V61"/>
  </g>`;

/** The two-sock-paws logo mark as an SVG data URI (viewBox 61×68). */
export const MARK_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1.5 -4 61 68">${LEG(15)}${LEG(43)}</svg>`,
)}`;

/** Fredoka 600 (latin + latin-ext so Ç Ş Ğ İ ı render) for next/og. */
export async function brandFonts() {
  const load = (subset: string) =>
    readFile(join(process.cwd(), `assets/fonts/fredoka-${subset}-600-normal.woff`));
  const [latin, ext] = await Promise.all([load("latin"), load("latin-ext")]);
  return [
    { name: "Fredoka", data: latin, weight: 600 as const, style: "normal" as const },
    { name: "Fredoka", data: ext, weight: 600 as const, style: "normal" as const },
  ];
}

/** Reads an image from /public as a data URI (next/og can't fetch relative URLs at build). */
export async function publicImageDataUri(src: string) {
  if (/^https?:/.test(src)) return src;
  const buf = await readFile(join(process.cwd(), "public", src));
  const type = src.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${type};base64,${buf.toString("base64")}`;
}
