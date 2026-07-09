# Damdavy Technologies — SEO Audit Report

Prepared from the Screaming Frog SEO Spider crawl export (24 CSV files in `/Users/ram/Documents/SEO DAMDAVY`) of `https://damdavytechnologies.com.ng`, combined with how the rebuilt Next.js site should resolve each finding.

---

## 1. Audit summary at a glance

| Area | Finding | Severity | Affects |
|---|---|---|---|
| Homepage `<title>` | Completely empty | **High** | Homepage |
| Meta descriptions | 7 of 12 indexable pages missing | Medium | Most pages |
| Canonicals | 3 pages missing canonical; 4 canonicalised to **non-indexable HTTP URLs** | **High** | `/quote`, both blog posts |
| HTTP URLs | 3 URLs still served over `http://` | **High** | Whole site trust signal |
| H1 duplicates | 3 pages share duplicate H1s | Low | Blog/archive |
| H2 non-sequential | 8 pages skip heading order | Low | Accessibility/structure |
| Image alt text | 18 images = **100%** missing alt text | Medium | Accessibility + image SEO |
| Image size | 8 images over 100 kB (44%) | Medium | Page speed |
| Internal links | 12 internal outlinks (100%) have **no anchor text** | Medium | Crawl/context |
| Security headers | HSTS, X-Frame-Options, CSP, Referrer-Policy, X-Content-Type-Options all missing on **110 URLs (96%)** | Low–High | Trust + security |
| Sitemaps | No sitemap detected in the audit | High | Discoverability |
| PageSpeed/PSI | Not configured — **no PSI data returned** | High | Can't measure Core Web Vitals |
| Mobile | No mobile alternate / viewport strategy reported | Low | Mobile parity |
| Response time | 87.7% under 1s; 7.9% in 2–3s range | OK–Medium | Server performance |
| Indexability | 106 indexable / 5 non-indexable out of 111 | OK | — |

**Headline:** the site is crawlable and mostly fast, but it is leaking SEO value through an empty homepage title, missing meta descriptions, broken canonicals pointing at HTTP/non-indexable URLs, no sitemap, no security headers, and images with zero alt text.

---

## 2. The high-priority problems (fix first)

### 2.1 Homepage has an empty `<title>` (High)

From `page_titles_all.csv`:
```
https://damdavytechnologies.com.ng/   Title: ""   Length: 0
```
The single most important page on the site has no title at all. Google will invent one (often a bad one), and social sharing has nothing to work with.

**Also:** 7 of 12 pages have titles under 30 characters / 200px (`About`, `Services`, `Projects`, `Our Blog`) — far too short to target keywords or communicate value.

### 2.2 Broken canonicals pointing to non-indexable HTTP URLs (High)

From `canonicals_all.csv` and `directives_all.csv`, these pages are canonicalised **to an `http://` version that is non-indexable**:

| Page | Canonical points to |
|---|---|
| `/quote` | `http://damdavytechnologies.com.ng/quote/` |
| `/quote/` | `http://damdavytechnologies.com.ng/quote/` |
| `/5-non-negotiable-questions-to-ask-before-you-pay/` | `http://...5-non-negotiable-questions-to-ask-before-you-pay/` |
| `/the-business-case-for-solar/` | `http://...the-business-case-for-solar/` |

This is flagged as **"Canonicals: Non-Indexable Canonical" (High)** and **"Security: HTTP URLs (High)**. Search engines are told to consolidate ranking signals to a URL that itself redirects and is non-indexable — the canonical will likely be ignored, causing ranking unpredictability. The HTTP canonicals also undermine HTTPS trust.

### 2.3 No sitemap (High)

`sitemaps_all.csv` lists pages but no `sitemap.xml` reference was detected. Without a sitemap, discovery and submission to Google Search Console is slower and less reliable.

### 2.4 No PageSpeed / Core Web Vitals data (High)

`pagespeed_all.csv` returned **blank PSI request status** for every page — PageSpeed Insights was never connected during the crawl. That means there is zero measured data on LCP, CLS, INP, or TBT. Given the heavy plugin stack (see §4), this is almost certainly a real problem hiding unmeasured.

### 2.5 100% of audited images missing alt text (Medium, accessibility-critical)

From `issues_overview_report.csv`:
```
Images: Missing Alt Text — 18 images — 100%
```
Every image the auditor flagged has empty alt text. This hurts both image search and accessibility for visually impaired users. Combined with 8 oversized images (>100 kB, 44%), the image layer is both unhelpful to crawlers and slower than it should be.

---

## 3. Medium and low issues

### 3.1 Meta descriptions missing on 7 pages (58%)

The homepage, About, Services, Projects, Our Blog, and both blog posts have **no meta description**. Only Contact Us has one (`Need help with your solar goals?...`). Descriptions don't directly rank but strongly affect click-through rate from search results.

### 3.2 Heading structure problems

- **H1 duplicate (3 pages):** the two blog posts each emit two H1s (the page title plus the post heading), and the archive pages reuse "Article & News".
- **H2 non-sequential (8 pages):** heading levels skip, which weakens both accessibility (screen-reader navigation) and content clarity for crawlers.
- **H2 duplicate (7 pages):** the same H2 ("Start Your Journey to Reliable, Affordable Power") repeats across pages, reducing page uniqueness.

### 3.3 Internal linking is weak

- **12 of 12 internal outlinks (100%) have no anchor text.** Empty or image-only links give crawlers and users no context about the destination.
- **1 non-descriptive anchor** ("learn more" style) flagged.
- **4 internal 3xx redirects** are being linked to directly instead of their final destinations (e.g., `/about` → `/about/`).

### 3.4 Security headers missing on 96% of URLs

On **110 of 114 URLs**, all of these are missing:
- `Strict-Transport-Security` (HSTS)
- `X-Frame-Options`
- `Content-Security-Policy`
- `Referrer-Policy`
- `X-Content-Type-Options`

These are not classic "SEO" but they affect browser trust signals, can affect how Google evaluates site quality/security, and matter for the `.ng` hosting layer.

### 3.5 Readability

One page flagged as "Very Difficult" and one as "Difficult" on the Flesch reading-ease scale — long sentences and complex wording. Solar-buying copy should aim for a broad audience, not university-graduate level.

---

## 4. Root cause: the WordPress/Elementor/WooCommerce stack

The `directives_all.csv` and `resources.csv` files reveal the real weight behind these issues. The crawl picked up assets from a large plugin stack loading on essentially every page:

- **Elementor + Elementor Pro** (frontend CSS/JS bundles, per-post CSS files)
- **WooCommerce** (cart, checkout, add-to-cart, blockUI, sourcebuster, js-cookie — loaded even on marketing pages)
- **CartFlows + CartFlows Pro** (the `/quote` "Check Savings" funnel)
- **ElementsKit Lite** (widgets, icon packs)
- **Skyboot custom icons** (Themify, Elegant, Linear icon font files)
- **PixelYourSite** (Facebook pixel + GTM dual-tagging)
- **Site Kit / Google Tag Manager** (GTM-TSW6L7TW, GT-WP5JLMNF, G-HZ9W3767FH — three tracking scripts)
- **Trustindex** (review loader from `cdn.trustindex.io`)
- **Country-code-field for Elementor forms** (intl-tel-input)

This is why the site has title/meta/canonical gaps (WordPress auto-generates them inconsistently), why `/quote` is a non-indexable CartFlows step, and why there's no clean Core Web Vitals story. The blog posts being canonicalised to non-indexable URLs is almost certainly a CartFlows/WordPress permalink + SSL mismatch.

---

## 5. How the new Next.js site fixes each finding

The rebuild already resolves several of these by construction. Here is the item-by-item plan.

### 5.1 Titles & meta descriptions — already fixed, with room to expand

The new `app/layout.tsx` sets a real title template and default description, and each page exports its own `metadata` (e.g., `app/about/page.tsx` has `title: "About"` which renders as `"About — Damdavy Technologies"`).

**Next step to fully close the audit:** expand each page's title and description to target keywords and fill the 30–60 char / 920px window the old site left empty. Recommended values:

| Page | New `<title>` | Meta description |
|---|---|---|
| Home | `Solar Installation in Ogun State | Damdavy Technologies` | `Dependable solar systems for Nigerian homes and businesses. Cut fuel costs, enjoy uninterrupted power, and get expert installation and support.` |
| About | `About Damdavy Technologies | Solar Energy Experts` | `Damdavy Technologies helps homes and businesses reduce fuel costs and enjoy steady electricity with dependable, cost-saving solar systems.` |
| Services | `Solar Services | Installation, Batteries & Maintenance` | `Solar panel installation, commercial and residential systems, battery backup, inverters, energy audits, and maintenance from Damdavy Technologies.` |
| Projects | `Solar Projects & Installations | Damdavy Technologies` | `See Damdavy solar installations for homes, commercial buildings, industrial backup, and open-field arrays across Nigeria.` |
| Blog | `Solar Tips & Insights | Damdavy Blog` | `Practical solar advice: choosing an installer, calculating ROI, and reducing generator dependence in Nigeria.` |
| Contact | `Contact Damdavy Technologies | Get a Solar Quote` | `Request a free solar quote or talk to the Damdavy team about installation, batteries, and maintenance in Ogun State.` |

### 5.2 Canonicals — fix the HTTP/non-indexable problem structurally

In the old site, canonicals pointed to `http://` non-indexable URLs. In Next.js, canonicals are deterministic: the `metadataBase` in `app/layout.tsx` is already set to the HTTPS URL, so every generated canonical is clean HTTPS and self-referencing.

**Action for the new site:** add an explicit `alternates.canonical` to each page's metadata to guarantee self-referencing HTTPS canonicals, and 301 the old HTTP URLs to HTTPS at the hosting/edge layer (Vercel or your CDN). Never link internally to `/about` (trailing-slash variant) — link only to the canonical `/about`.

### 5.3 Sitemap & robots — add what's missing

The old site had **no sitemap**. Next.js App Router supports this natively.

**Action:** create `app/sitemap.ts` (auto-generates `/sitemap.xml` from the route list) and `app/robots.ts` (generates `/robots.txt` pointing to the sitemap and allowing crawling). This is a 15-minute addition that directly closes a High finding.

### 5.4 Images — alt text + optimization

Old site: **100% of audited images had no alt text**, and 44% were over 100 kB.

The new site already passes descriptive `alt` to every `next/image` (e.g., `"Solar panels and clean energy infrastructure"`), which closes the accessibility + image-SEO gap immediately.

**Action to fully close it:**
- Audit every `<Image>` in the new codebase to confirm alt text describes content (not keyword-stuffed).
- Run the downloaded hero/project images through compression (Squoosh/sharp) and serve modern formats.
- Let `next/image` handle responsive `sizes` + automatic optimization (already wired with `sizes=` on fill images).

### 5.5 Headings — enforce one H1 and sequential order

Old site: duplicate H1s on blog posts, non-sequential H2s, repeated H2s across pages.

The new site already uses **exactly one `<h1>` per page** (inside `PageHero`/hero), with `<h2>` section titles and `<h3>` card titles — sequential by construction. No more "Article & News" H1 duplicated across archives.

**Action:** when adding the blog post detail pages later, keep the post title as the single H1 and demote the section headings.

### 5.6 Internal links — descriptive anchors

Old site: 100% of internal outlinks had no anchor text.

The new site uses descriptive anchors throughout (`Request quote`, `Call Damdavy`, `Explore services`, nav labels). No bare image links without context.

**Action:** keep this discipline — never ship a link labeled "click here" or an icon-only link without an `aria-label` or visible text.

### 5.7 Security headers — add via Next.js config

Old site: all 5 security headers missing on 96% of URLs.

**Action:** add a `headers()` function to `next.config.ts` that sets, on every route:
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- A baseline `Content-Security-Policy`

This is a config-only change — no plugin juggling like WordPress required.

### 5.8 PageSpeed / Core Web Vitals — measure, then optimize

Old site: **no PSI data at all**, and a heavy plugin stack.

The new site is statically prerendered (the build output shows all pages as `○ (Static)`), ships only the motion/WebGL libraries it needs, lazy-loads the WebGL scene as a client component, and respects `prefers-reduced-motion`.

**Action:**
- Re-run PageSpeed Insights / Lighthouse on the deployed new site to get real LCP/CLS/INP numbers.
- Confirm the WebGL hero doesn't hurt mobile LCP — if it does, gate it behind `IntersectionObserver` or a "tap to view" on low-end devices.
- Keep `next/image` optimization on.

### 5.9 Readability

Old site: copy flagged as difficult/very-difficult.

The new copy uses shorter sentences and plainer language (e.g., "Power back in your hands. Comfort back in your day."). When you write final service and blog copy, aim for Flesch ease of 55+ (roughly: short sentences, common words).

### 5.10 HTTP → HTTPS and redirects

Old site: 3 HTTP URLs + 4 internal 3xx redirects.

**Action:** force HTTPS at the host (Vercel does this automatically), and make all internal links point to the final canonical URL so there are zero redirect hops.

---

## 6. Recommended next actions (ranked)

1. **Add `app/sitemap.ts` and `app/robots.ts`** — closes the missing-sitemap High finding.
2. **Expand page titles + meta descriptions** to the recommended values in §5.1 — fixes the empty homepage title and short titles.
3. **Add security headers in `next.config.ts`** — closes 5 security warnings across 110 URLs in one change.
4. **Confirm HTTPS-only + clean canonicals** at deployment — fixes the High HTTP-URL and non-indexable-canonical findings.
5. **Compress images + verify all alt text** — fixes the 100% missing-alt and 44% oversized-image findings.
6. **Re-run Lighthouse/PSI on the live new site** to get the Core Web Vitals numbers the old audit never captured.
7. **Submit the new sitemap to Google Search Console** and request re-crawl.
8. **Plan the blog** — publish the two existing posts as real indexable articles (not CartFlows steps) and build the content roadmap from the improvement report.

---

## 7. What's already better in the new site (no action needed)

- ✅ Homepage has a real title (no more empty `<title>`)
- ✅ Per-page metadata via the Next.js Metadata API
- ✅ Clean HTTPS self-referencing canonicals via `metadataBase`
- ✅ One H1 per page, sequential heading order
- ✅ Descriptive internal link anchors
- ✅ Alt text on every meaningful image
- ✅ Static prerendered pages (fast first paint)
- ✅ `next/image` optimization + responsive `sizes`
- ✅ Reduced-motion fallbacks for accessibility
- ✅ No WooCommerce/CartFlows bloat on marketing pages

The biggest remaining wins are mechanical: sitemap, robots, security headers, and expanded title/description copy — all small, high-impact changes.
