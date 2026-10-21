import { Link } from "@tanstack/react-router";
import { allPages, site } from "@/lib/site";
import { Wordmark } from "./SiteHeader";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-2 border-copper bg-pine text-on-dark">
      <div className="container-editorial pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 border-b border-rule-dark pb-16 md:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-5">
            <Wordmark className="w-[10rem] md:w-[11.5rem]" />
            <p className="eyebrow mt-6 text-gold">{site.descriptor}</p>
            <p className="mt-8 max-w-md font-display text-[clamp(1.5rem,2.3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              {site.mission}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-6 lg:col-span-4 lg:col-start-6">
            <p className="eyebrow mb-6 text-gold">Pages</p>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {allPages.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[0.95rem] text-on-dark/85 transition-colors hover:text-gold data-[status=active]:text-gold"
                  >
                    {item.longLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-12 lg:col-span-3 lg:col-start-10">
            <p className="eyebrow mb-6 text-gold">Get in touch</p>
            <p className="body-copy text-on-dark">
              {site.contact.person}
              <span className="block text-on-dark-muted">{site.contact.role}</span>
            </p>
            <ul className="body-copy mt-5 space-y-2">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-on-dark transition-colors hover:text-gold"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.websiteUrl}
                  className="text-gold transition-colors hover:text-on-dark"
                >
                  {site.contact.website}
                </a>
              </li>
            </ul>
            <Link to="/contact" className="link-quiet mt-5 text-on-dark">
              Send an enquiry{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[0.75rem] text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p className="eyebrow text-on-dark-muted">{site.editorialLine}</p>
          <p>
            © {year} {site.name}. Information on this site is general and not financial or
            professional advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
