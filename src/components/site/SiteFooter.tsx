import { Link } from "@tanstack/react-router";
import { allPages, site } from "@/lib/site";
import { Wordmark } from "./SiteHeader";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-forest text-on-dark">
      <div className="container-editorial pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 border-b border-rule-dark pb-16 md:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-5">
            <Wordmark />
            <p className="mt-8 max-w-md font-display text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.15]">
              Property, considered differently.
            </p>
            <p className="body-copy mt-5 max-w-sm text-on-dark-muted">{site.shortStatement}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-6 lg:col-span-4 lg:col-start-7">
            <p className="eyebrow mb-6 text-copper">Pages</p>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {allPages.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[0.95rem] text-on-dark/85 transition-colors hover:text-copper data-[status=active]:text-copper"
                  >
                    {item.longLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-12 lg:col-span-3">
            <p className="eyebrow mb-6 text-copper">Get in touch</p>
            <p className="body-copy text-on-dark-muted">
              Questions about property, security, energy or sustainable housing are welcome.
            </p>
            <Link to="/contact" className="link-quiet mt-5 text-on-dark">
              Start a conversation <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[0.75rem] text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p className="eyebrow text-sage">{site.editorialLine}</p>
          <p>
            © {year} {site.name}. Concept website. Information is general and not professional advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
