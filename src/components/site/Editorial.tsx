import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { NavItem } from "@/lib/site";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/utils";
import { EditorialImage } from "./EditorialImage";
import { Reveal } from "./Reveal";

/** Small numbered metadata label with a copper rule. */
export function SectionLabel({
  index,
  children,
  tone = "light",
  className,
}: {
  index?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {index && (
        <span className={cn("numeral text-sm", tone === "light" ? "text-copper-deep" : "text-copper")}>{index}</span>
      )}
      <span className="h-px w-10 bg-copper" aria-hidden="true" />
      <span className={cn("eyebrow", tone === "light" ? "text-on-light-muted" : "text-on-dark-muted")}>
        {children}
      </span>
    </div>
  );
}

export function ArrowLink({
  to,
  children,
  className,
}: {
  to: NavItem["to"];
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link to={to} className={cn("link-quiet", className)}>
      {children}
      <span className="arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

/** Related-page links presented as an image-led editorial row. */
export function RelatedPages({
  heading = "Continue exploring",
  items,
}: {
  heading?: string;
  items: { to: NavItem["to"]; label: string; description: string; image: SiteImage }[];
}) {
  return (
    <section className="section-y-sm border-t border-rule-light bg-mineral">
      <div className="container-editorial">
        <Reveal>
          <SectionLabel>{heading}</SectionLabel>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8 lg:gap-14">
          {items.map((item, i) => (
            <Reveal key={item.to} delay={i * 120}>
              <Link to={item.to} className="group grid grid-cols-[38%_1fr] items-end gap-6 md:gap-8">
                <EditorialImage image={item.image} className="aspect-[4/5]" sizes="(min-width: 768px) 20vw, 40vw" zoom />
                <div className="pb-1">
                  <h3 className="display-3 transition-colors duration-300 group-hover:text-copper-deep">{item.label}</h3>
                  <p className="body-copy mt-3 text-on-light-muted">{item.description}</p>
                  <span className="link-quiet mt-4">
                    Explore <span className="arrow" aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Full-width architectural CTA with a dark overlay. */
export function ClosingCta({
  image,
  title,
  copy,
  linkLabel = "Start a conversation",
}: {
  image: SiteImage;
  title: ReactNode;
  copy: ReactNode;
  linkLabel?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest text-on-dark">
      <EditorialImage image={image} className="absolute inset-0 -z-20" sizes="100vw" parallax={6} />
      <div className="absolute inset-0 -z-10 scrim-cta" />
      <div className="container-editorial flex min-h-[78svh] flex-col justify-center py-28 md:min-h-[86svh]">
        <Reveal>
          <SectionLabel tone="dark">Contact</SectionLabel>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display-1 mt-8 max-w-[13ch]">{title}</h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="lede mt-8 max-w-lg text-on-dark-muted">{copy}</p>
        </Reveal>
        <Reveal delay={300}>
          <ArrowLink to="/contact" className="mt-10 text-on-dark">
            {linkLabel}
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}

/** A quiet enquiry band for the end of topic pages. */
export function EnquiryBand({ title, copy }: { title: ReactNode; copy: ReactNode }) {
  return (
    <section className="bg-forest text-on-dark">
      <div className="container-editorial grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-7">
          <SectionLabel tone="dark">Enquiries</SectionLabel>
          <h2 className="display-2 mt-8 max-w-[16ch]">{title}</h2>
        </Reveal>
        <Reveal delay={150} className="flex flex-col justify-end md:col-span-4 md:col-start-9">
          <p className="body-copy text-on-dark-muted">{copy}</p>
          <ArrowLink to="/contact" className="mt-6 self-start text-on-dark">
            Get in touch
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}

/** Outbound reference link to verified external guidance. */
export function SourceLink({ href, title, publisher }: { href: string; title: string; publisher: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-baseline justify-between gap-6 border-b border-rule-light py-5 transition-colors hover:text-copper-deep"
    >
      <span>
        <span className="eyebrow block text-on-light-muted">{publisher}</span>
        <span className="mt-1 block font-display text-xl md:text-2xl">{title}</span>
      </span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        ↗
      </span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
