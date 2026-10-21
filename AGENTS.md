<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules

- Brand name, descriptor, positioning, contact details and nav live only in `src/lib/site.ts` (brand: MDR Rent-Path Ltd); never hardcode them in components.
- The logo is the traced SVG in `src/components/site/Logo.tsx` (letterforms use `currentColor`, road dashes stay grey); downloadable colourways live in `public/brand/`.
- Brand colours: Burnt Orange #C65A1E (`copper`), Olive #6B7A3D (`olive`, deep band `pine`), Heritage Gold #C9A227 (`gold`), Carbon Black #111111 (`forest`/`charcoal`), Soft Ivory #F8F6F0 (`limestone`). On dark grounds use gold for small accent text; orange text on ivory uses `copper-deep`.
- Investment criteria (low-rise only, start values up to £120,000, new build only with regeneration funding) live in `src/components/site/InvestmentCriteria.tsx`.
- Fonts: the brand face "MDR Biome" is listed first in the font stacks; Sora (headings) and Manrope (body) are stand-ins until licensed web font files are supplied.
- All imagery is registered in `src/lib/images.ts` (alt text, dimensions, focal positions); components receive `SiteImage` objects so crops and sources stay consistent and replaceable.
- Remote photos are verified Unsplash `images.unsplash.com/photo-…` IDs only; never guess IDs — download and visually check any new one first.
- Colours, type scale, link styles and motion are design-system utilities in `src/styles.css`; components use those tokens, never raw colour values.
- Contact enquiries insert into the `enquiries` table (anon INSERT only, no read policy) with validation shared in `src/lib/enquiry.ts`, so the client and tests use the same rules.
- The home hero slider must keep: 2s per slide, no visible controls, only the first frame loaded eagerly, next frame preloaded before it is shown, and no auto-advance under reduced motion.
- Every photograph renders through `EditorialImage`, `PageHero` or `HeroSlider`, which show the image's `tone` and blurred `lqip` (from `src/lib/placeholders.ts`) until the full file is decoded; when adding an image, generate its placeholder entry too so nothing ever pops in.
- Motion lives in three shared places: `SmoothScroll` (Lenis, paused during navigation, off under reduced motion), router-level View Transitions + intent preloading in `src/router.tsx`, and `SplitWords` for display headlines — reuse them rather than adding per-page animation code.
- Hero/page-hero headlines use `text-luminous` + `SplitWords` so the lettering takes its light from the photograph; keep headline titles as plain strings for that reason.
- Hosting: the build auto-detects its target (Vercel when built on Vercel, Worker runtime on Lovable); keep server code free of Node-only APIs so both stay error-free, and run a production build before claiming deploy readiness.
- The database client is imported lazily (contact form submit) and the auth-token function middleware is intentionally not registered in `src/start.ts`, keeping the first-load bundle small; re-add it only if sign-in or authenticated server functions are introduced.
