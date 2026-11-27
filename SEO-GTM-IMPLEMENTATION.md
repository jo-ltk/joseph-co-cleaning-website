# SEO, Google Tag Manager & Performance: Implementation Notes

Stack: Next.js 15 (App Router), React 19, Tailwind 3. Production domain: `https://josephcleaning.co.uk` (from `lib/seo.ts`).
Branch worked on: `feat/mobile-motion-tap-bubbles`. Nothing has been committed.

## 1. Audit summary (before changes)

Already good: App Router Metadata API via `buildMetadata()` on most pages, `app/sitemap.ts`, `app/robots.ts`, JSON-LD (Organization, LocalBusiness, WebSite, Service, Breadcrumb), `next/image` on most images.

Problems found:

| # | Problem | Severity |
|---|---|---|
| 1 | No GTM / GA4 anywhere | Missing |
| 2 | Root layout set `alternates.canonical = homepage`. `/areas-we-cover`, `/gallery`, `/privacy-policy`, `/terms-of-service` are client components with no metadata, so they inherited **homepage canonical and homepage title/description** | High |
| 3 | Schema `logo` pointed to `/images/logo.png`, which does not exist (real file: `/logo.png`) | Medium |
| 4 | Schema contained **unverified** business data: opening hours (Mon–Fri 08–18, Sat 09–16), `priceRange: "££"`, geo coordinates (code comment: "update with exact"). None of it appears on the site | High (violates "no invented info") |
| 5 | Schema `SearchAction` pointed at `/portfolio?search=`, which does not exist | Medium |
| 6 | Every service page emitted the same generic Service schema ("Professional cleaning services") plus an unpriced `offers` block | Medium |
| 7 | `lib/seo.ts` held a dead duplicate of `localBusinessSchema` / `serviceSchema` / `faqSchema` with the same guessed data | Low |
| 8 | Sitemap stamped `lastModified: now` on every static URL (misleading to crawlers) | Low |
| 9 | Meta descriptions 166–254 chars (truncated in results); About title repeated the brand name; noindex admin page carried a canonical; short Care descriptions | Low |
| 10 | Hero image (2 MB PNG) served raw via `<img>` / CSS background; `logo.png` (1.3 MB, 1024×1024) rendered raw 4× in navbar and footer | High (perf) |
| 11 | `.env` is **not** currently tracked (correction: my first draft wrongly said it was). It is ignored via `.gitignore`, but it was committed in the past and removed in commit `252a4b2`, so its old contents remain in Git history | High, see section 9 |
| 12 | Site copy claims "across the UK" while `/areas-we-cover` lists only Somerset, Devon, Gloucestershire, Bristol | Content decision, not changed |

Not found: existing GA/GTM (no duplicate-tracking risk), cookie banner, CI, tests, ESLint config.

## 2. Google Tag Manager

Container: `GTM-T59Q4PQL`. Installed **once**, in the root layout.

- `components/analytics/GoogleTagManager.tsx`: `next/script` (`afterInteractive`) bootstrap + loader, and the `<noscript>` iframe.
- `app/layout.tsx`: renders both. No other file contains the container ID except `lib/gtm.ts`.
- `dataLayer` is created only if missing (`window.dataLayer = window.dataLayer || []`), so an existing layer is preserved.

**Deviation from the snippet you supplied.** The supplied snippet loads `gtm.js` but never pushes the `gtm.start` / `event: 'gtm.js'` entry that GTM's own container snippet pushes. Without it, GTM triggers such as *Container Loaded / Page View* do not fire correctly. I used the standard GTM container bootstrap (which includes `gtm.start`) plus your `gtag()` helper pattern for Consent Mode. I could not open your GTM account to confirm which snippet it shows; if it shows something different, replace the body of `GoogleTagManager.tsx` and keep the single-install structure.

**Consent Mode (needs your decision).** The site has no cookie banner. I set Consent Mode defaults to **denied** (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`) before GTM loads. Effect: GA4 tags that respect consent will not set cookies until a banner calls `gtag('consent','update',{analytics_storage:'granted'})`. If you would rather collect analytics without a banner, change the defaults in `GoogleTagManager.tsx`, but whether that is acceptable under UK PECR/GDPR is a legal question I have not verified. I did not build a banner (design + legal copy decision).

**Page views / client-side navigation.** I deliberately added **no** manual `page_view` pushes. Use exactly one of:
1. GTM → GA4 Configuration/Google tag fires on *Initial Pageview*, plus a GA4 Event tag `page_view` on a **History Change** trigger; or
2. GA4 Enhanced Measurement "Page changes based on browser history events".

Do not enable both. Tested: initial load, SPA navigation, back, forward each produced one `gtm.js` request and no extra dataLayer entries (see section 8).

**GA4.** No Measurement ID exists in the code and I did not invent one. Create/identify the GA4 property and add the Google tag inside GTM.

## 3. Conversion events

Defined in `lib/gtm.ts`. All events are free of personal data (no names, emails, phone numbers, message text).

| Event | Fires when | Parameters | Where |
|---|---|---|---|
| `phone_click` | click on any `tel:` link | `link_location` (path), `site_section` (`cleaning`/`care`) | `ConversionLinkTracker` (one delegated listener in root layout) |
| `whatsapp_click` | click on `wa.me/` or `api.whatsapp.com/` link (incl. floating button) | same | same |
| `email_click` | click on any `mailto:` link | same | same |
| `contact_form_success` | booking server action returned `success: true` | `form_id`: `contact_page` or `instant_estimate` | `app/contact/page.tsx`, `components/estimate/InstantEstimateModal.tsx` |
| `care_application_success` | `/api/care/apply` returned success | `form_id`: `care_apply` | `components/care/CareApplyForm.tsx` |

Behaviour change to know about: after a successful booking the site redirects the visitor to WhatsApp. The redirect now waits for the dataLayer `eventCallback` (max 250 ms) so the conversion has a chance to be sent before the page unloads.

`booking_click` / `enquiry_click` were **not** implemented: CTAs are ordinary links to `/contact`, so a GTM *Click – Just Links* trigger (URL contains `/contact`) is cleaner than extra code.

**GTM setup required (not done, needs account access).** For each event: Trigger type *Custom Event* with the event name → GA4 Event tag with the same event name (add `link_location`, `site_section`, `form_id` as event parameters via Data Layer Variables) → mark `contact_form_success`, `care_application_success`, `phone_click`, `whatsapp_click` as key events in GA4 → test in GTM Preview. **Conversions are not operational until this is done.**

## 4. Technical SEO

- **Metadata**: every public route has a unique title, description, canonical, OG and Twitter data via `buildMetadata()`. New `layout.tsx` files supply metadata for the four client-component pages (`app/areas-we-cover`, `gallery`, `privacy-policy`, `terms-of-service`).
- **Canonical strategy**: HTTPS, non-www, no trailing slash, built from `siteUrl` in `lib/seo.ts`. The root-level canonical and `openGraph.url` were removed (they leaked the homepage URL to pages without their own). `noIndex` pages (admin, vine-cottage) get **no** canonical.
- **Sitemap** (`/sitemap.xml`, `app/sitemap.ts`): 18 static routes + portfolio case studies from the database. Excludes admin, `vine-cottage` (noindex), API, 404. `lastModified` removed for static pages; portfolio entries keep real dates.
- **robots.txt** (`app/robots.ts`): allows `/`, blocks `/admin` and `/api`, points to the sitemap. `_next` assets are not blocked. Admin is protected by auth middleware and `noindex`; robots.txt is not relied on for security.
- **Structured data** (`lib/schema.ts`): Organization + LocalBusiness/CleaningService + WebSite sitewide; per-page Service (now with the specific service name and the four verified regions), BreadcrumbList on service/portfolio pages. Removed: opening hours, priceRange, geo, SearchAction, UK-wide areaServed, `offers`. Fixed logo URL. No ratings or reviews are fabricated (portfolio case-study `review` data comes from the existing database content).

## 5. Local SEO (verified information only)

Used only what the site itself displays: name *Joseph & Co Cleaning Services Ltd*; address 32 Willow Man Road, Bridgwater, TA6 4HW; phones +44 7787 857305 / +44 7570 421556; email josephandcocleaningservicesltd@gmail.com; service regions Somerset, Devon, Gloucestershire, Bristol; Facebook and Instagram profiles. Home, About, Contact and Areas descriptions now state the Bridgwater base / the four regions.

**Not added, because unverified:** opening hours, price range, coordinates, certifications, years of experience. Add them to `lib/schema.ts` once you confirm them (and match your Google Business Profile).

Inconsistencies for you to resolve: `privacy-policy` shows email `JosephandCol.t.d@outlook.com` while the rest of the site uses the Gmail address; `booking.tsx` sends from `hello@josephco.uk` while `.env.example` says `mail.josephcleaning.co.uk`.

## 6. Images and performance

Changed:
- Hero: raw `<img>` and CSS `background-image` → `next/image` with `priority`, `sizes="100vw"`, descriptive alt (desktop copy is decorative, `alt=""`).
- Logos (navbar ×3, footer): raw 1.3 MB `<img>` → `next/image` with width/height (no layout shift) and `sizes`.

Not changed (design risk): the remaining home-page cost is JavaScript (GSAP/ScrollTrigger/SplitText, Lenis smooth scroll, framer-motion, hero intro animation). Options for a follow-up: lazy-load below-the-fold motion, drop Lenis on touch devices, convert the multi-MB source PNGs in `public/images` to WebP/AVIF at source (they are optimised at request time by `next/image`, but the originals inflate build/storage), and move the mobile-only/desktop-only hero duplication to a single responsive hero.

## 7. Open-source tools

| Tool | Decision |
|---|---|
| Lighthouse | Used (v12 via `npx`, no dependency added) |
| Lighthouse CI | Added as config only: `lighthouserc.json` + `.github/workflows/lighthouse.yml`, run through `npx @lhci/cli`, **no package.json dependency**. Asserts SEO ≥ 0.9 (error); performance/a11y/best-practices are warnings so it won't block PRs while JS performance is still being worked on. **The workflow has not been run on GitHub, and it was NOT pushed**: the push credentials lacked the GitHub `workflow` scope. The file remains locally at `.github/workflows/lighthouse.yml` (untracked); push it later after `gh auth refresh -s workflow`, or add it via the GitHub web UI. |
| web-vitals | Not added. GA4 collects Core Web Vitals data only if you build a reporting pipeline; adds code without a current consumer. |
| SEO packages (next-seo, next-sitemap) | Not added: Next's native Metadata/sitemap/robots conventions already cover it. |

No new runtime dependencies were added.

## 8. Test results

Environment: production build (`next build` + `next start`) on localhost, Chrome 1280×900 and 390×800 (puppeteer-core from a scratch folder, not added to the project), Lighthouse 12 mobile defaults.

**Tested successfully**
- `tsc --noEmit`: clean. `next build`: succeeds (MongoDB DNS errors in the log are the sandbox being offline; the site falls back to fixtures).
- 22 routes fetched: all HTTP 200 (the unknown URL returns 404). No duplicate titles or descriptions. Canonical correct on every indexable page; noindex pages have none. 0 `<img>` without `alt` on any route. All JSON-LD blocks parse as JSON.
- GTM in a real browser: one `gtm.js` request, one script element, container initialised (`gtm.js`, `gtm.dom`, `gtm.load` seen), zero console/page errors, no extra loads on SPA navigation, back and forward. One `<noscript>` iframe in HTML.
- `phone_click` and `whatsapp_click` each fire once per click with no personal data.
- robots.txt and sitemap.xml render correctly with absolute HTTPS URLs.
- Lighthouse SEO score 100 on `/`, `/services`, `/contact`, `/services/end-of-tenancy-cleaning`.

**Before → after (home page, Lighthouse mobile, same machine)**

| | Before | After |
|---|---|---|
| Performance | 41 | 43 |
| LCP | 20.6 s | 12.5 s |
| Total page weight | 4,382 KiB | 2,557 KiB |
| TBT | 3,180 ms | 2,520 ms |
| CLS | 0.003 | 0.003 |
| SEO / A11y / Best practices | 100 / 92 / 100 | 100 / 92 / 100 |

Performance remains **poor** (LCP/TBT far from the 2.5 s / 200 ms targets) on this simulated mobile profile, driven by main-thread JavaScript. Lighthouse lab numbers on a developer machine are indicative only; use PageSpeed Insights / field data after deploying.

**Tested with caveats**
- Four-page Lighthouse run for services/contact/eot was done concurrently, so only their SEO/a11y/best-practices numbers (SEO 100; a11y 96–100; best-practices 100) are trustworthy; their performance numbers are not.
- After the final six service-description trims I re-ran `tsc` only, not the rendered-HTML audit.

**Not tested**
- `contact_form_success` / `care_application_success` end to end (needs working Resend email + DB). The code path runs only on a success result, but I did not submit a real form.
- ESLint (no ESLint config/dependency in the project), unit/integration/e2e tests (none exist).
- Tablet viewport and visual regression of the hero/logo changes (build and Lighthouse render fine; I did not compare screenshots).
- Lighthouse CI GitHub workflow.

**Requires production deployment / Google account access**
- Google Tag Assistant, GA4 DebugView, Search Console (verify domain, submit sitemap), Rich Results Test and Schema validator on the live URL, PageSpeed Insights, www/non-www and HTTP→HTTPS redirect behaviour at the host.

## 9. Remaining issues and manual steps

1. **`.env` is in Git history** (5 commits touch it; removed from tracking in `252a4b2`). If the repo has been pushed to GitHub, treat those secrets as exposed: rotate Resend, MongoDB, Cloudinary, admin password, `SESSION_SECRET` and OpenRouter keys. See section 12.
2. Decide the consent approach (section 2) and, if needed, add a cookie banner that sends Consent Mode updates.
3. In GTM: add the GA4 Google tag (your Measurement ID), the page-view approach, the five event tags and triggers (section 3), then Preview and Publish.
4. Search Console: verify `josephcleaning.co.uk`, submit `https://josephcleaning.co.uk/sitemap.xml`.
5. Confirm and add real opening hours / price range / coordinates to schema, and align with Google Business Profile.
6. Decide on geographic copy: pages say "UK" widely while the business lists four regions.
7. About / Services / Contact body copy was **not** rewritten; only metadata. Content changes need your confirmation of facts.
8. Performance follow-ups listed in section 6.
9. The consent default means GA4 will look empty until step 2/3 are done; this is expected.

## 10. Files

Created: `lib/gtm.ts`, `components/analytics/GoogleTagManager.tsx`, `components/analytics/ConversionLinkTracker.tsx`, `app/areas-we-cover/layout.tsx`, `app/gallery/layout.tsx`, `app/privacy-policy/layout.tsx`, `app/terms-of-service/layout.tsx`, `lighthouserc.json`, `.github/workflows/lighthouse.yml`, this file.

Modified: `app/layout.tsx`, `app/sitemap.ts`, `lib/schema.ts`, `lib/seo.ts`, `app/page.tsx`, `app/about/page.tsx`, `app/contact/layout.tsx`, `app/contact/page.tsx`, `app/portfolio/page.tsx`, `app/services/page.tsx` and the seven `app/services/*/page.tsx` pages (descriptions), `app/care/privacy/page.tsx`, `app/care/terms/page.tsx`, `components/Hero.tsx`, `components/Navbar.tsx`, `components/Footer.tsx`, `components/care/CareApplyForm.tsx`, `components/estimate/InstantEstimateModal.tsx`.

## 11. Deployment checklist

1. Rotate secrets that appear in Git history (section 9.1).
2. Review `git diff`, run `npm run build`, deploy.
3. Open the live site with GTM Preview / Tag Assistant; confirm one container load.
4. Configure GTM tags, consent handling, publish.
5. Verify Search Console, submit sitemap, run Rich Results Test on `/`, a service page and a portfolio page.
6. Run PageSpeed Insights on `/` and `/services`.
7. Confirm `http://`, `www.` variants 301 to `https://josephcleaning.co.uk` at the host.

## Official documentation

- GTM install: https://support.google.com/tagmanager/answer/14847097
- Next.js metadata: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- robots.txt: https://developers.google.com/crawling/docs/robots-txt/create-robots-txt
- Canonicals: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Consent Mode: https://support.google.com/tagmanager/answer/10718549
- Lighthouse CI: https://github.com/GoogleChrome/lighthouse-ci

## 12. Final task: `.env` and conversion tracking

### 12.1 `.env` and Git
- Tracked now? **No.** `git ls-files --error-unmatch .env` finds nothing, so no `git rm --cached` was needed (it had already been removed in `252a4b2`).
- Ignored? **Yes**, `.gitignore:45: .env` (`git check-ignore -v .env`). No change to `.gitignore` was needed.
- Local `.env` intact? **Yes**, 659 bytes, untouched; its contents were never printed. `.env.example` (placeholders) is still tracked.
- Production build ran successfully with the local `.env` present after this check.
- Nothing committed or pushed. **History still contains old values**, so rotation is still recommended (9.1).

### 12.2 Tracking code reused (no duplicates added)
No tracking code was changed for this task. Existing `lib/gtm.ts`, `GoogleTagManager.tsx`, `ConversionLinkTracker.tsx` (single delegated listener), contact page, instant-estimate modal and `CareApplyForm.tsx` were inspected and reused as-is.

### 12.3 GTM container configuration: prepared, NOT applied
I have no access to your GTM or GA4 accounts (and no tool to change them), so **nothing has been configured in GTM or GA4 and no GA4 Measurement ID was provided**. Instead I generated an importable container file: **`gtm/GTM-T59Q4PQL-import.json`** (valid JSON; the import itself is untested). It contains:

| Type | Items |
|---|---|
| Variable | `GA4 Measurement ID` (constant, placeholder `REPLACE_WITH_YOUR_GA4_MEASUREMENT_ID`) |
| Data Layer Variables | `DLV - link_location`, `DLV - site_section`, `DLV - form_id` |
| Custom Event triggers | `CE - phone_click`, `whatsapp_click`, `email_click`, `contact_form_success`, `care_application_success` |
| Tags | `GA4 - Google tag` (Initial Pageview only) + five `GA4 Event - <name>` tags. The click events send `link_location` + `site_section`; the two form events send `form_id` |

Page views: the Google tag fires on Initial Pageview; SPA page changes rely on GA4 **Enhanced Measurement → "Page changes based on browser history events"** (on by default). No History Change trigger is included, so page views are not doubled.

**Manual steps (needs your Google account):**
1. GTM → Admin → *Import Container* → choose the file → workspace *New* (or an existing one) → **Merge → Rename conflicting** → Confirm. Check nothing in your existing container was overwritten.
2. Open variable `GA4 Measurement ID` and replace the placeholder with your real `G-XXXXXXXXXX` (GA4 → Admin → Data streams). **Do not publish before this.**
3. If your container already has a GA4 Google tag, delete the imported `GA4 - Google tag` so there is only one.
4. Click *Preview* on `https://josephcleaning.co.uk`; verify each event below; then *Submit/Publish*.
5. GA4 → Admin → Events (after each event has been received at least once): mark `contact_form_success` and `care_application_success` as **key events** (lead generation); mark `phone_click` and `whatsapp_click` as key events too if you want them counted as contact intent. Leave `email_click` as a normal event.
6. Optional: in GA4 → Admin → Custom definitions, register `link_location`, `site_section`, `form_id` as event-scoped dimensions to report on them.

### 12.4 Consent
Unchanged: defaults stay **denied** and nothing grants consent automatically (verified: the dataLayer contains only the `consent default` entry). With GA4 Google tags this means no analytics cookies until a banner sends `gtag('consent','update',{analytics_storage:'granted'})` (and the ads signals only if you ever use advertising). Remaining work: build/choose a cookie banner (a CMP certified for Consent Mode is easiest), wire its accept/reject to `consent update`, and update the privacy policy's "Cookies and Analytics" section. Until then GA4 will receive at most cookieless pings and reports will be incomplete. Legal compliance has not been assessed.

### 12.5 What was tested (local production build, headless Chrome, no real customer data)

| Test | Result |
|---|---|
| `phone_click`, `whatsapp_click` | Pass: one event per click, params `link_location`/`site_section` only |
| `email_click` (real `mailto:` link on `/contact`) | Pass: one event |
| `contact_form_success`, success path | Pass, **with a mocked server response** (server action intercepted, no email sent): exactly one event, `form_id: contact_page` |
| Contact failed submission (validation rejects before anything is sent) | Pass: no event |
| `care_application_success`, success | Pass, with a **mocked** `/api/care/apply` 200: exactly one event, `form_id: care_apply` |
| Care failed submission (mocked 500) | Pass: no event |
| Duplicate prevention | Pass: no duplicates in any case above (single delegated listener) |
| SPA navigation / back / forward | Pass (earlier test): no extra dataLayer entries or `gtm.js` loads |
| Consent defaults | Pass: only `consent default` (denied) present |

**Not tested, requires your account:** GTM Preview / Tag Assistant, GA4 DebugView and Realtime (so **no claim is made that GA4 receives these events**), the import file, key-event configuration, a real (unmocked) form submission, and the instant-estimate modal's success event (same code path as the contact form, not separately exercised).

## 13. Final status: import file check and setup guide

### 13.1 What was checked (this round)
- No website code, design, SEO, `.env`, consent or GTM-install files were modified. Only `gtm/GTM-T59Q4PQL-import.json` was regenerated and this document updated. Nothing committed or pushed.
- Import file `gtm/GTM-T59Q4PQL-import.json`: parses as JSON; container `GTM-T59Q4PQL`; 6 tags, 5 triggers, 4 variables; IDs unique; every trigger/variable reference resolves; the five events match the code exactly.
- **Change made:** all six tags are now **paused** on import, so nothing can fire with the placeholder ID. You unpause them in step 4 below.
- **Honest limit:** I cannot import into your account, so "valid JSON with consistent references" is verified, but "GTM accepts it" is not. If GTM rejects the file, create the items by hand using the table in 12.3 (it takes about 10 minutes).
- `.env`: not tracked, still present and untouched.

### 13.2 Import into Google Tag Manager (needs your Google login)
1. Go to https://tagmanager.google.com and open container **GTM-T59Q4PQL**.
2. Click **Admin** → **Import Container**.
3. **Choose container file**: select `gtm/GTM-T59Q4PQL-import.json` from the project.
4. **Choose workspace**: *New* → name it `Conversion tracking`.
5. **Choose an import option**: *Merge* → *Rename conflicting tags, triggers, and variables*. (Do not choose Overwrite.)
6. Click **Confirm**. Review the summary: you should see 6 new tags, 5 triggers, 4 variables and no overwritten items.
7. If you already have a GA4 Google tag in this container, delete the imported **GA4 - Google tag** (you only want one).

### 13.3 Connect GA4
1. In GA4 (https://analytics.google.com): **Admin → Data streams → Web stream** for josephcleaning.co.uk (create one if needed). Copy the **Measurement ID** (`G-XXXXXXXXXX`). Never share it publicly in code; it is safe in GTM.
2. In GTM → **Variables** → open `GA4 Measurement ID` → replace `REPLACE_WITH_YOUR_GA4_MEASUREMENT_ID` with your ID → Save.
3. In the GA4 stream, open **Enhanced measurement** → gear icon → make sure **Page changes based on browser history events** is on. (This is what counts page views when visitors move between pages; do not add a History Change page_view tag as well.)
4. In GTM → **Tags**, select all six imported tags → **Unpause** (open each tag, or use the tag's menu) → Save.

### 13.4 Test before publishing
1. In GTM click **Preview**, enter `https://josephcleaning.co.uk`, Connect.
2. In the opened site tab: click a phone number, the WhatsApp button, an email link. In the Tag Assistant window each should show a custom event (`phone_click`, `whatsapp_click`, `email_click`) with its **GA4 Event** tag listed as *fired* under that event.
3. Click a few menu links without reloading: page changes should not create extra event tags (page views come from GA4 itself).
4. Forms: only test with obviously fake data, and only if you accept that a real enquiry email/WhatsApp redirect will happen (the contact form sends a real email to your inbox; the care form sends a real application email). Success should show `contact_form_success` (or `care_application_success`) once. A form that shows an error must show no event.
5. **Consent:** because consent defaults are *denied*, Tag Assistant will show consent state "denied" and GA4 tags may report limited or cookieless data. This is expected, not a bug.
6. In GA4 → **Admin → DebugView** (Preview mode sends debug data) and **Reports → Realtime**: confirm the events arrive.
7. Click **Submit → Publish** in GTM.
8. After each event has appeared in GA4 once (can take up to a day to appear in the Events list): **Admin → Events** → toggle **Mark as key event** for `contact_form_success` and `care_application_success` (main leads), and for `phone_click` and `whatsapp_click` if you want contact intent counted. Leave `email_click` unmarked.

### 13.5 Consent: what stays outstanding
Consent defaults remain **denied** and nothing in the site or in the import file grants consent. To collect normal analytics you must still: add a cookie banner/CMP that calls `gtag('consent','update',{analytics_storage:'granted'})` on acceptance; update the privacy policy's cookies section; and get legal advice that your setup satisfies UK PECR/GDPR (not assessed here).

### 13.6 Final status table

| Item | Status |
|---|---|
| GTM container installed (GTM-T59Q4PQL), once | Done and browser-verified |
| Five events in code, one fire per action, no personal data | Done and browser-verified (form success paths with mocked responses) |
| Denied consent defaults | Kept |
| GTM import file | Generated, structure checked, tags paused; **import untested** |
| GA4 Measurement ID | **Not provided; placeholder only** |
| Import into GTM, ID replacement, unpause, publish | **You (Google account)** |
| GA4 key events, Enhanced Measurement check | **You (Google account)** |
| GTM Preview / DebugView verification | **You; not claimed as done** |
| Cookie banner and legal review | **Outstanding** |
| Rotate secrets found in Git history | **Outstanding (section 9.1)** |
