import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { EditorialImage } from "@/components/site/EditorialImage";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryBand, RelatedPages, SectionLabel, SourceLink } from "@/components/site/Editorial";
import { images } from "@/lib/images";
import { pageTitle } from "@/lib/site";
import { cn } from "@/lib/utils";

const title = pageTitle("Property Investment & Development");
const description =
  "A considered approach to property investment and development: location, condition, use, constraints and long-term potential.";

export const Route = createFileRoute("/property-investment-development")({
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
  component: PropertyPage,
});

const considerations = [
  {
    title: "Location and surrounding context",
    body: "Transport, local services, the character of the street and how an area may change over time all shape how a property is used and valued. Context is often as important as the building itself.",
  },
  {
    title: "Building condition and maintenance",
    body: "Structure, roof, damp, services and the age of key elements influence both near-term costs and long-term durability. Independent surveys from suitably qualified professionals help clarify the picture.",
  },
  {
    title: "Potential improvements and associated costs",
    body: "Extensions, reconfiguration or refurbishment can change how a building works — but every improvement carries cost, disruption and, often, consent requirements that need to be understood early.",
  },
  {
    title: "Energy performance",
    body: "A building’s Energy Performance Certificate, insulation, glazing and heating system affect running costs and comfort, and may shape the improvements worth considering.",
  },
  {
    title: "Security considerations",
    body: "Entrances, boundaries, lighting and existing fittings contribute to how secure a property feels for the people who use it, and may influence what upgrades make sense.",
  },
  {
    title: "Suitability for intended use",
    body: "Whether a home for the long term, a rental or a development project, a property needs to fit its purpose — including any planning, licensing or regulatory requirements that apply.",
  },
];

function PropertyPage() {
  return (
    <>
      <PageHero
        image={images.development}
        index="I"
        label="Property investment & development"
        title="See the potential in property."
        intro="Explore property investment and development through a considered approach to buildings, opportunities and the built environment."
      />

      {/* A. Understanding property */}
      <section className="section-y bg-limestone">
        <div className="container-editorial grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5">
            <SectionLabel index="01">Understanding property</SectionLabel>
            <h2 className="display-2 mt-10 max-w-[12ch]">Every building tells you something.</h2>
          </Reveal>
          <Reveal delay={150} className="space-y-6 md:col-span-6 md:col-start-7 md:pt-24">
            <p className="lede">
              Looking carefully at a property means considering its condition, its location, how it is intended to be
              used and the constraints that may affect it.
            </p>
            <p className="body-copy text-on-light-muted">
              These are general considerations to help frame a more informed conversation. They are not a valuation,
              survey or investment advice — every property decision depends on individual circumstances and benefits
              from independent, qualified professional input.
            </p>
          </Reveal>
        </div>
      </section>

      {/* B. Development perspective */}
      <section className="bg-mineral">
        <div className="grid md:grid-cols-12">
          <EditorialImage
            image={images.retrofit}
            className="aspect-[4/3] md:col-span-7 md:aspect-auto md:min-h-[42rem]"
            sizes="(min-width: 768px) 60vw, 100vw"
            parallax={5}
          />
          <Reveal className="container-editorial flex flex-col justify-center py-20 md:col-span-5 md:px-14 lg:px-20">
            <SectionLabel index="02">A development perspective</SectionLabel>
            <h2 className="display-2 mt-10 max-w-[12ch]">Design that lasts beyond the handover.</h2>
            <p className="body-copy mt-8 text-on-light-muted">
              Good design, everyday functionality, energy performance and long-term suitability all influence how people
              experience a building — and how they think about it as an asset.
            </p>
            <p className="body-copy mt-5 text-on-light-muted">
              A development perspective asks not only what a space is today, but how well it could serve its occupants,
              neighbours and wider community for decades to come.
            </p>
          </Reveal>
        </div>
      </section>

      {/* C. What to consider */}
      <section className="section-y bg-limestone">
        <div className="container-editorial">
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-4">
              <SectionLabel index="03">What to consider</SectionLabel>
              <h2 className="display-2 mt-10 max-w-[10ch]">Six questions worth asking.</h2>
              <div className="mt-10 hidden md:block">
                <EditorialImage image={images.propertyModel} className="aspect-[4/3]" sizes="30vw" />
              </div>
            </Reveal>
            <div className="md:col-span-7 md:col-start-6">
              <ConsiderationList />
              <p className="mt-10 border-l-2 border-copper pl-5 text-sm text-on-light-muted">
                General information only. Property decisions require individual assessment and, where relevant, advice
                from qualified and appropriately regulated professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Further reading */}
      <section className="section-y-sm border-t border-rule-light bg-limestone">
        <div className="container-editorial grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <SectionLabel>Further reading</SectionLabel>
            <p className="body-copy mt-6 max-w-xs text-on-light-muted">Independent, official sources for UK property.</p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-7 md:col-start-6">
            <SourceLink
              publisher="GOV.UK"
              title="Planning permission in England and Wales"
              href="https://www.gov.uk/planning-permission-england-wales"
            />
            <SourceLink publisher="GOV.UK" title="Buying or selling your home" href="https://www.gov.uk/buy-sell-your-home" />
            <SourceLink
              publisher="GOV.UK"
              title="Find an energy certificate"
              href="https://www.gov.uk/find-energy-certificate"
            />
            <SourceLink publisher="RICS" title="Royal Institution of Chartered Surveyors" href="https://www.rics.org/" />
          </Reveal>
        </div>
      </section>

      <EnquiryBand
        title="Interested in property or development?"
        copy="Share what you’re thinking about — a building, an area or a broader question — and start a conversation."
      />

      <RelatedPages
        items={[
          {
            to: "/sustainable-housing",
            label: "Sustainable Housing",
            description: "Durability, materials and performance across the whole life of a building.",
            image: images.landscape,
          },
          {
            to: "/energy-saving",
            label: "Energy Saving",
            description: "How a building’s energy performance shapes comfort and running costs.",
            image: images.energyExterior,
          },
        ]}
      />
    </>
  );
}

function ConsiderationList() {
  const [open, setOpen] = useState<number>(0);
  return (
    <ol className="border-t border-rule-light">
      {considerations.map((c, i) => {
        const isOpen = open === i;
        const id = `consideration-${i}`;
        return (
          <li key={c.title} className="border-b border-rule-light">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-baseline gap-6 py-6 text-left md:gap-10"
              >
                <span className="numeral w-8 shrink-0 text-lg text-copper-deep">0{i + 1}</span>
                <span className="flex-1 font-display text-[clamp(1.35rem,2.1vw,1.9rem)] leading-tight transition-colors group-hover:text-copper-deep">
                  {c.title}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-xl text-copper-deep transition-transform duration-500 ease-[var(--ease-architectural)]",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={id}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-[var(--ease-architectural)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="body-copy max-w-xl pb-8 pl-14 text-on-light-muted md:pl-[4.5rem]">{c.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
