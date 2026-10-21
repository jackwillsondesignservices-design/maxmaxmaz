import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { EditorialImage } from "@/components/site/EditorialImage";
import { Reveal } from "@/components/site/Reveal";
import { ArrowLink, SectionLabel } from "@/components/site/Editorial";
import { images, type SiteImage } from "@/lib/images";
import { pageTitle, site, type NavItem } from "@/lib/site";

const title = pageTitle("About");
const description =
  "MDR Rent-Path Ltd is a property development and asset management company creating modern rental spaces for sustainable living, thriving communities and long-term wealth creation.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

/** Brand positioning statement — lives in src/lib/site.ts. */
const intro = site.positioning;

const themes: { to: NavItem["to"]; longLabel: string; note: string; image: SiteImage }[] = [
  {
    to: "/property-investment-development",
    longLabel: "Property Investment & Development",
    note: "Buildings as assets and opportunities, seen in context.",
    image: images.docklands,
  },
  {
    to: "/home-security",
    longLabel: "Home Security",
    note: "Calm, practical approaches to protecting a home.",
    image: images.securityDoor,
  },
  {
    to: "/energy-saving",
    longLabel: "Energy Saving",
    note: "Understanding how homes use energy, and where to improve.",
    image: images.energyExterior,
  },
  {
    to: "/sustainable-housing",
    longLabel: "Sustainable Housing",
    note: "Durable, efficient homes designed around people.",
    image: images.woodlandHouse,
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        image={images.timber}
        label="About"
        title="Building value. Sustaining communities."
        height="medium"
      />

      <section className="section-y bg-limestone">
        <div className="container-editorial grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <SectionLabel index="01">Positioning</SectionLabel>
          </Reveal>
          <Reveal delay={100} className="md:col-span-8 md:col-start-5">
            <p className="font-display text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.25] tracking-[-0.02em]">
              {intro}
            </p>
            <div className="mt-12 flex items-center gap-5 border-t border-rule-light pt-8">
              <span
                className="h-0.5 w-10 bg-copper shadow-[0_2px_0_var(--gold)]"
                aria-hidden="true"
              />
              <p className="body-copy">
                <span className="font-semibold text-charcoal">{site.contact.person}</span>
                <span className="text-on-light-muted"> — {site.contact.role}</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y-sm bg-mineral">
        <div className="container-editorial">
          <Reveal>
            <SectionLabel index="02">What we focus on</SectionLabel>
          </Reveal>
          <ul className="mt-12 border-t border-rule-light">
            {themes.map((t, i) => (
              <Reveal as="li" key={t.to} delay={i * 80} className="border-b border-rule-light">
                <Link to={t.to} className="group grid items-center gap-6 py-8 md:grid-cols-12">
                  <span className="numeral text-lg text-copper-deep md:col-span-1">0{i + 1}</span>
                  <h3 className="display-3 transition-colors group-hover:text-copper-deep md:col-span-5">
                    {t.longLabel}
                  </h3>
                  <p className="body-copy text-on-light-muted md:col-span-4">{t.note}</p>
                  <div className="hidden md:col-span-2 md:block">
                    <EditorialImage image={t.image} className="aspect-[4/3]" sizes="15vw" zoom />
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-limestone">
        <div className="container-editorial grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <Reveal className="md:col-span-6">
            <EditorialImage
              image={images.materials}
              className="aspect-[4/5] md:max-w-md"
              sizes="(min-width: 768px) 40vw, 100vw"
              parallax={4}
            />
          </Reveal>
          <Reveal delay={150} className="flex flex-col justify-center md:col-span-5 md:col-start-8">
            <SectionLabel index="03">What we stand for</SectionLabel>
            <ul className="mt-10 space-y-8">
              {[
                [
                  "Growth & urban renewal",
                  "Entrepreneurial development that brings tired buildings back into good use.",
                ],
                [
                  "Sustainability & community wellbeing",
                  "Long-term thinking about energy, materials and the people who live nearby.",
                ],
                [
                  "Wealth creation for all",
                  "Homes that hold their value, with returns shared across residents and investors.",
                ],
                [
                  "Strength, stability, trust",
                  "Professional, straightforward management from acquisition to letting.",
                ],
              ].map(([h, b]) => (
                <li key={h}>
                  <h3 className="font-display text-2xl">{h}</h3>
                  <p className="body-copy mt-2 text-on-light-muted">{b}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-forest text-on-dark">
        <div className="container-editorial flex flex-col items-start gap-8 py-20 md:flex-row md:items-end md:justify-between md:py-24">
          <Reveal>
            <h2 className="display-2 max-w-[16ch]">
              Have a property that fits? <em>Let’s talk.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <ArrowLink to="/contact" className="text-on-dark">
              Get in touch
            </ArrowLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
