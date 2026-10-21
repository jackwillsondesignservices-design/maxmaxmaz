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

- Brand name, wordmark and nav live only in `src/lib/site.ts`; never hardcode the brand name in components — the name is a temporary concept and must be swappable from one place.
- All imagery is registered in `src/lib/images.ts` (alt text, dimensions, focal positions); components receive `SiteImage` objects so crops and sources stay consistent and replaceable.
- Remote photos are verified Unsplash `images.unsplash.com/photo-…` IDs only; never guess IDs — download and visually check any new one first.
- Colours, type scale, link styles and motion are design-system utilities in `src/styles.css`; components use those tokens, never raw colour values.
- Contact enquiries insert into the `enquiries` table (anon INSERT only, no read policy) with validation shared in `src/lib/enquiry.ts`, so the client and tests use the same rules.
- The home hero slider must keep: 2s per slide, no visible controls, only the first frame loaded eagerly, next frame preloaded before it is shown, and no auto-advance under reduced motion.
