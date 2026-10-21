import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { EditorialImage } from "@/components/site/EditorialImage";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryBand, RelatedPages, SectionLabel, SourceLink } from "@/components/site/Editorial";
import { images, type SiteImage } from "@/lib/images";
import { pageTitle } from "@/lib/site";
import { cn } from "@/lib/utils";

const title = pageTitle("Home Security");
const description =
  "Calm, practical information on residential security: doors, windows, smart locks, external lighting, video doorbells and security-conscious design.";

export const Route = createFileRoute("/home-security")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SecurityPage,
});

const areas = [
  { label: "Doors", body: "Construction, frames, hinges and locking hardware all work together." },
  { label: "Windows", body: "Ground-floor and accessible windows, their locks and glazing." },
  { label: "Access points", body: "Side gates, garages, outbuildings and less obvious entrances." },
  { label: "Lighting", body: "How well approaches, paths and entrances are lit after dark." },
  { label: "Everyday habits", body: "Locking routines, keys, deliveries and time away from home." },
];

const categories: { title: string; body: string; image: SiteImage; aspect: string; span: string }[] = [
  {
    title: "Door and window security",
    body: "Locks, cylinders, frames and glazing — the physical fabric that does most of the work.",
    image: images.securityDoor,
    aspect: "aspect-[4/5]",
    span: "md:col-span-5",
  },
  {
    title: "Smart locks and access controls",
    body: "Keyless entry and app-based access, with questions of compatibility, power and backup.",
    image: images.smartLock,
    aspect: "aspect-[4/3]",
    span: "md:col-span-6 md:col-start-7 md:mt-32",
  },
  {
    title: "External lighting",
    body: "Considered lighting for entrances and paths, balancing visibility with neighbours and wildlife.",
    image: images.entranceLight,
    aspect: "aspect-[16/10]",
    span: "md:col-span-6",
  },
  {
    title: "Video doorbells and home monitoring",
    body: "Cameras and alerts, with care for privacy, data and what is recorded beyond your boundary.",
    image: images.bluehour,
    aspect: "aspect-[4/5]",
    span: "md:col-span-4 md:col-start-8 md:-mt-24",
  },
  {
    title: "Security-conscious design choices",
    body: "Sightlines, boundaries, planting and layout that make a home feel naturally secure.",
    image: images.darkHouseDusk,
    aspect: "aspect-[3/4]",
    span: "md:col-span-4 md:col-start-2",
  },
];

function SecurityPage() {
  return (
    <>
      <PageHero
        image={images.bluehour}
        index="II"
        label="Home security"
        title="Thoughtful security starts at home."
        intro="Practical, proportionate thinking about how homes are protected — without fear, and without exaggerated claims."
      />

      {/* A. Considerations */}
      <section className="section-y bg-limestone">
        <div className="container-editorial grid gap-14 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5">
            <SectionLabel index="01">Security considerations</SectionLabel>
            <h2 className="display-2 mt-10 max-w-[12ch]">Start with how the home is used.</h2>
            <p className="body-copy mt-8 max-w-md text-on-light-muted">
              Good residential security is rarely about a single product. It comes from looking calmly at doors,
              windows, access points, lighting and the everyday habits of the people who live there.
            </p>
          </Reveal>
          <Reveal delay={150} className="md:col-span-6 md:col-start-7">
            <dl className="border-t border-rule-light">
              {areas.map((a, i) => (
                <div key={a.label} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-rule-light py-6 md:grid-cols-[3rem_12rem_1fr]">
                  <span className="numeral text-copper-deep">0{i + 1}</span>
                  <dt className="font-display text-2xl">{a.label}</dt>
                  <dd className="body-copy col-start-2 text-on-light-muted md:col-start-3">{a.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* B. Products and features */}
      <section className="section-y bg-mineral">
        <div className="container-editorial">
          <Reveal className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <SectionLabel index="02">Products & features</SectionLabel>
              <h2 className="display-2 mt-10 max-w-[13ch]">Topics worth exploring.</h2>
            </div>
            <p className="body-copy self-end text-on-light-muted md:col-span-4 md:col-start-9">
              General categories to understand before choosing anything specific. No particular brand or product is
              recommended here.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-x-8 md:gap-y-24">
            {categories.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 120} className={c.span}>
                <article className="group">
                  <EditorialImage image={c.image} className={c.aspect} sizes="(min-width: 768px) 45vw, 100vw" zoom />
                  <div className="mt-6 flex items-baseline gap-4">
                    <span className="numeral text-copper-deep">0{i + 1}</span>
                    <h3 className="display-3">{c.title}</h3>
                  </div>
                  <p className="body-copy mt-3 max-w-md pl-9 text-on-light-muted">{c.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* C. Choosing thoughtfully */}
      <section className="bg-forest text-on-dark">
        <div className="container-editorial grid gap-12 py-24 md:grid-cols-12 md:py-32">
          <Reveal className="md:col-span-6">
            <SectionLabel index="03" tone="dark">
              Choosing thoughtfully
            </SectionLabel>
            <h2 className="display-1 mt-10 max-w-[11ch]">There is no one-size answer.</h2>
          </Reveal>
          <Reveal delay={150} className="space-y-6 md:col-span-5 md:col-start-8 md:pt-24">
            <p className="lede text-on-dark">
              Suitable products depend on the home itself, its existing fittings, the needs of the people who live there
              and the requirements of each manufacturer.
            </p>
            <ul className="space-y-4 border-t border-rule-dark pt-6">
              {[
                "Check compatibility with existing doors, frames and locks before buying.",
                "Consider power, connectivity and what happens if either fails.",
                "Use qualified installers where work affects doors, glazing or electrics.",
                "Review privacy and data settings on any connected device.",
              ].map((t) => (
                <li key={t} className={cn("body-copy flex gap-4 text-on-dark-muted")}>
                  <span className="mt-3 h-px w-4 shrink-0 bg-copper" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="text-sm text-on-dark-muted">
              No product can guarantee that a crime will be prevented. Security is about reducing risk sensibly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y-sm bg-limestone">
        <div className="container-editorial grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <SectionLabel>Further reading</SectionLabel>
          </Reveal>
          <Reveal delay={120} className="md:col-span-7 md:col-start-6">
            <SourceLink
              publisher="Secured by Design"
              title="Official UK police security initiative"
              href="https://www.securedbydesign.com/"
            />
          </Reveal>
        </div>
      </section>

      <EnquiryBand
        title="A question about securing a home?"
        copy="Whether it’s doors, lighting or connected devices, get in touch to talk it through."
      />

      <RelatedPages
        items={[
          {
            to: "/energy-saving",
            label: "Energy Saving",
            description: "Smart controls and efficient lighting often sit alongside security choices.",
            image: images.energyInterior,
          },
          {
            to: "/sustainable-housing",
            label: "Sustainable Housing",
            description: "Durable, well-designed homes that feel secure by nature.",
            image: images.woodlandHouse,
          },
        ]}
      />
    </>
  );
}
