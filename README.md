# The House Cat · Çorap — website

The shop window for **Çorap**, a brown tabby who always wears white socks. The site tells her story, shows the products and sends buyers to **Etsy** to check out. It's in **Turkish and English**.

Built with Next.js, TypeScript and Tailwind CSS. It's ready to deploy on Vercel.

---

## 1. Run it on your computer

You need **Node.js 20 or newer** ([nodejs.org](https://nodejs.org)). Then, in this folder:

```bash
npm install
```

```bash
npm run dev
```

Open <http://localhost:3000>. You'll be sent to `/tr` or `/en` depending on your browser's language. Changes you save show up right away.

Other useful commands:

| Command                              | What it does                                                                  |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| `npm run build`                      | Builds the real, optimized site (run this before deploying to catch mistakes) |
| `npm start`                          | Runs the built site                                                           |
| `npm run lint` / `npm run typecheck` | Checks the code for mistakes                                                  |
| `npm run format`                     | Tidies the code formatting                                                    |
| `npm run import:etsy -- file.csv`    | Imports products from Etsy (see below)                                        |

---

## 2. Where things live

| I want to change…                                                 | Edit this                                                                                              |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Products                                                          | `content/products.imported.json` (after an Etsy import) or `content/products.ts` (the sample products) |
| Any text on the site (buttons, headings, intros)                  | `messages/en.json` and `messages/tr.json`                                                              |
| The "Meet Çorap" page: story, fun facts, gallery, day in the life | `content/about.ts`                                                                                     |
| Instagram photos on the home page                                 | `content/instagram.ts`                                                                                 |
| Customer reviews                                                  | `content/reviews.ts`                                                                                   |
| Instagram / Etsy links, game reward code                          | `content/site.ts`                                                                                      |
| Colors and fonts                                                  | `app/globals.css` (top of the file) and `app/[locale]/layout.tsx`                                      |

Text in **both** language files must keep the same keys (the words before the colon). Only change the text after the colon.

---

## 3. Products

### Import from Etsy (recommended)

1. On Etsy: **Shop Manager → Settings → Options → Download Data → "Currently for sale listings"**. You get a `.csv` file.
2. Etsy's file doesn't include each listing's web address. Make a small `links.csv` with two columns, the listing title and its Etsy link:

   ```
   title,url
   Caffeinated Çorap Tee,https://www.etsy.com/listing/123456789/caffeinated-corap-tee
   ```

3. Run:

   ```bash
   npm run import:etsy -- ~/Downloads/EtsyListingsDownload.csv --links links.csv
   ```

This writes `content/products.imported.json`, and the site uses it automatically instead of the sample products. The script tells you which products still need a Turkish title or a link. Product photos come straight from Etsy's image servers.

**Running it again is safe.** Anything you've edited by hand in the JSON for the same product is kept: Turkish texts, category, "featured"/"new" flags and image descriptions.

### Edit a product by hand

Open `content/products.imported.json` and change the fields. What each one means:

| Field                                                      | Meaning                                                                                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `slug`                                                     | The product's web address: `/shop/<slug>`. Lowercase, dashes, no spaces.                                                            |
| `title_tr`, `title_en`, `description_tr`, `description_en` | Name and description in each language                                                                                               |
| `price`, `currency`                                        | e.g. `32` and `"USD"`                                                                                                               |
| `category`                                                 | One of `tshirt`, `hoodie`, `print`, `sticker`                                                                                       |
| `images`                                                   | List of photos. The first one is the main photo. Each needs `alt_tr` / `alt_en`: a short description for blind visitors and Google. |
| `etsyUrl`                                                  | The Etsy listing link. Tracking (UTM) tags are added automatically.                                                                 |
| `variants`                                                 | Optional sizes or colors, shown on the product page (buyers choose on Etsy)                                                         |
| `featured`                                                 | `true` = shown first and in the "sock drawer" on the home page                                                                      |
| `isNew`                                                    | `true` = "New" badge                                                                                                                |
| `soldOut`                                                  | `true` = "Sold out" badge; the button becomes "See it on Etsy"                                                                      |

New local photos go in `public/products/`, referenced as `"/products/my-photo.jpg"`.

### Switching to a real cart later

Every buy button goes through `lib/checkout.ts`. To use Shopify, Stripe or similar, add a new provider there; the page design doesn't need to change.

---

## 4. Instagram, reviews, newsletter, game

- **Instagram strip:** in `content/instagram.ts`, list the posts you want: image, post link (Instagram → ⋯ → Copy link) and a short description. Nothing is scraped from Instagram.
- **Reviews:** paste **real** reviews from Etsy into `content/reviews.ts`. The section stays hidden until there's at least one.
- **Newsletter ("Join the sock club"):** works out of the box in "stub" mode, which logs sign-ups and sends nothing. To connect a real mailing list, add these settings in Vercel (or in a `.env.local` file on your computer):
  - Brevo: `NEWSLETTER_PROVIDER=brevo`, `BREVO_API_KEY`, `BREVO_LIST_ID`
  - Mailchimp: `NEWSLETTER_PROVIDER=mailchimp`, `MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`

  See `.env.example`. Never put keys in the code.

- **"Catch the Sock" reward:** set `gameReward.code` in `content/site.ts` to a real Etsy coupon code. Players who score at least `minScore` see it. While it's empty, players get a "share my score" button instead.

---

## 5. Deploy to Vercel

1. Put this folder on GitHub (a new private repository is fine). The `reference/` folder of original artwork is deliberately left out: the files are too big for git.
2. On [vercel.com](https://vercel.com): **Add New → Project → import the repository**. Vercel detects Next.js, so keep the defaults.
3. In **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` = your final address (e.g. `https://thehousecat.com`). It's used for Google, the sitemap and link previews. Add the newsletter settings too if you're connecting one.
4. Deploy. Every later push to GitHub redeploys automatically.
5. Optional: **Settings → Domains** to connect your own domain, then update `NEXT_PUBLIC_SITE_URL` and redeploy.

After going live, submit `https://your-domain/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

---

## 6. Things worth knowing

- **Languages:** every page exists at `/tr/...` and `/en/...`. Visitors land on their browser's language, and the TR | EN switch is remembered.
- **Calm mode and sound:** visitors can turn off decorative motion (moon icon) and turn sounds on (paw icon). Sound is off by default. Anyone whose device asks for reduced motion gets calm behaviour automatically.
- **Easter eggs:** type `corap` anywhere for a sock rain. Between 22:00 and 06:00 (the visitor's time) Çorap naps in the hero; add `?night=1` to the address to preview it. Pet her (stroke or click) to make her purr.
- **Previews (not public):** `/en/dev/mascot` (every pose and mood, logo, icons), `/en/dev/fonts` (Turkish characters in every font weight), `/en/dev/reviews` (review-card layout). They're hidden from search engines.
- **Share images** (what shows when a link is posted on WhatsApp, X, etc.) are generated automatically for each language and each product.

### Project layout (for developers)

```
app/                 pages (app/[locale]/…), API route, sitemap, robots, icons, share images
components/mascot    SVG cartoon Çorap: <Corap pose mood lookAt …/>
components/delight   cursor, peeking, purring, sock rain, sound/calm settings
components/game      Catch the Sock (loaded only when someone presses Play)
components/sections  home-page sections
components/shop      product grid, cards, gallery, Etsy button
components/about     fact cards, gallery, timeline
content/             everything the owner edits
lib/                 product data helpers, checkout, newsletter, SEO, sounds
messages/            all site text, en + tr
scripts/             Etsy CSV import
```

---

## 7. Placeholders still to replace

| What                                             | Where                                 | Status                                                                                        |
| ------------------------------------------------ | ------------------------------------- | --------------------------------------------------------------------------------------------- |
| All 8 products (titles, prices, variants, links) | `content/products.ts`                 | Samples built from the real designs; marked "Sample" on the site. Replaced by an Etsy import. |
| Çorap's story (second paragraph)                 | `content/about.ts`                    | Marked "Sample text"                                                                          |
| "A day in the life" schedule                     | `content/about.ts`                    | Playful sample, marked "Sample text"                                                          |
| Instagram posts                                  | `content/instagram.ts`                | Use site photos and all link to the profile                                                   |
| Customer reviews                                 | `content/reviews.ts`                  | Empty, so the section is hidden                                                               |
| Game reward code                                 | `content/site.ts` → `gameReward.code` | Empty; share card shown instead                                                               |
| Newsletter service                               | Vercel environment variables          | Stub (sends nothing)                                                                          |
| Site address                                     | `NEXT_PUBLIC_SITE_URL`                | Defaults to `http://localhost:3000`                                                           |
