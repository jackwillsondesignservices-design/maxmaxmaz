import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { EditorialImage } from "@/components/site/EditorialImage";
import { Reveal } from "@/components/site/Reveal";
import { RelatedPages, SectionLabel, SourceLink } from "@/components/site/Editorial";
import { images } from "@/lib/images";
import { pageTitle } from "@/lib/site";

const title = pageTitle("Sustainable Housing");
const description =
  "Rethinking how we build and live: energy performance, durability, material choices, improving existing homes and the whole life of a building.";

export const Route = createFileRoute("/sustainable-housing")({
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
  component: SustainablePage,
});

const themes = [
  {
    title: "Energy performance",
    body: "How much energy a home needs to stay comfortable, and how efficiently it is supplied.",
  },
  {
    title: "Durability",
    body: "Buildings and components that last, age well and can be repaired rather than replaced.",
  },
  {
    title: "Material choices",
    body: "Thinking about where materials come from, how they perform and how they can be maintained.",
  },
  {
    title: "Efficient use of resources",
    body: "Water, land and construction resources used carefully throughout a building’s life.",
  },
  {
    title: "Suitability for occupants",
    body: "Homes that are healthy, comfortable and genuinely suited to the people who live in them.",
  },
];

function SustainablePage() {
  return (
    <>
      <PageHero
        image={images.landscape}
        index="IV"
        label="Sustainable housing"
        title="Rethinking how we build and live."
        intro="Sustainability in housing is about how homes perform, last and serve people — not simply how they look."
      />

      {/* A. What it means — long-form editorial */}
      <section className="section-y bg-limestone">
        <div className="container-editorial">
          <div className="grid gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <SectionLabel index="01">What it means</SectionLabel>
            </Reveal>
            <Reveal delay={100} className="md:col-span-8 md:col-start-5">
              <p className="font-display text-[clamp(1.8rem,3.4vw,3.25rem)] leading-[1.12]">
                A sustainable home uses resources thoughtfully, performs well over time and remains
                a good place to live for the people inside it.
              </p>
              <p className="body-copy mt-10 max-w-2xl text-on-light-muted">
                It is a broad idea rather than a single feature or label. Solar panels or timber
                cladding may be part of the picture, but sustainability is not defined by appearance
                alone. It is shaped by many decisions about design, construction, use and upkeep.
              </p>
            </Reveal>
          </div>
          <div className="mt-20 grid gap-x-8 md:mt-28 md:grid-cols-5">
            {themes.map((t, i) => (
              <Reveal
                key={t.title}
                delay={i * 80}
                className="border-t border-rule-light py-8 md:pr-6"
              >
                <span className="numeral text-copper-deep">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl leading-tight">{t.title}</h3>
                <p className="body-copy mt-3 text-on-light-muted">{t.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* B. Design and materials — large photography */}
      <section className="bg-mineral pb-24 md:pb-36">
        <Reveal>
          <EditorialImage
            image={images.timber}
            className="aspect-[4/3] md:aspect-[21/9]"
            sizes="100vw"
            parallax={6}
          />
        </Reveal>
        <div className="container-editorial -mt-16 grid gap-12 md:-mt-32 md:grid-cols-12">
          <Reveal className="relative bg-limestone p-8 md:col-span-6 md:p-14">
            <SectionLabel index="02">Design & materials</SectionLabel>
            <h2 className="display-2 mt-10 max-w-[13ch]">Form, fabric and performance.</h2>
            <p className="body-copy mt-8 text-on-light-muted">
              Design and material choices influence how a building performs, how it weathers and how
              much maintenance it will need. Orientation, glazing, insulation and detailing all play
              a part alongside the materials themselves.
            </p>
            <p className="body-copy mt-5 text-on-light-muted">
              The right choice depends on context: climate, site, budget and how the building will
              be used and cared for.
            </p>
          </Reveal>
          <Reveal
            delay={150}
            className="grid grid-cols-2 gap-4 md:col-span-5 md:col-start-8 md:mt-48 md:gap-6"
          >
            <EditorialImage
              image={images.materials}
              className="aspect-[3/4]"
              sizes="(min-width: 768px) 20vw, 50vw"
            />
            <EditorialImage
              image={images.timberBlackHouse}
              className="mt-12 aspect-[3/4]"
              sizes="(min-width: 768px) 20vw, 50vw"
            />
          </Reveal>
        </div>
      </section>

      {/* C. Existing homes */}
      <section className="section-y bg-limestone">
        <div className="container-editorial">
          <Reveal className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <SectionLabel index="03">Existing homes & improvement</SectionLabel>
              <h2 className="display-2 mt-10 max-w-[14ch]">The greenest home may already exist.</h2>
            </div>
            <p className="body-copy self-end text-on-light-muted md:col-span-5 md:col-start-8">
              Most of the homes we will live in over the coming decades are already built.
              Sustainability can mean carefully improving existing buildings as much as designing
              new ones.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-8 md:mt-20 md:grid-cols-2">
            <Reveal>
              <figure>
                <EditorialImage
                  image={images.londonBrick}
                  className="aspect-[4/3]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <figcaption className="mt-5 flex items-baseline gap-4">
                  <span className="eyebrow text-copper-deep">Existing</span>
                  <span className="body-copy text-on-light-muted">
                    The character, embodied effort and familiarity of established streets.
                  </span>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={150} className="md:mt-24">
              <figure>
                <EditorialImage
                  image={images.retrofit}
                  className="aspect-[4/3]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <figcaption className="mt-5 flex items-baseline gap-4">
                  <span className="eyebrow text-copper-deep">Improved</span>
                  <span className="body-copy text-on-light-muted">
                    A considered retrofit or extension, adapting a home for how people live now.
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
          <p className="mt-10 text-sm text-on-light-muted">
            Representative imagery — not a specific completed project.
          </p>
        </div>
      </section>

      {/* D. A longer-term perspective */}
      <section className="relative overflow-hidden bg-forest text-on-dark">
        <div className="container-editorial grid gap-12 py-24 md:grid-cols-12 md:py-36">
          <Reveal className="md:col-span-5">
            <SectionLabel index="04" tone="dark">
              A longer-term perspective
            </SectionLabel>
            <h2 className="display-1 mt-10 max-w-[10ch]">The whole life of a building.</h2>
          </Reveal>
          <Reveal delay={150} className="md:col-span-6 md:col-start-7 md:pt-24">
            <ol className="border-t border-rule-dark">
              {[
                [
                  "Use",
                  "How the building is lived in day to day, and how comfortable and efficient it is to run.",
                ],
                [
                  "Maintenance",
                  "The care it needs over decades, and how easily parts can be repaired or replaced.",
                ],
                [
                  "Adaptation",
                  "How well it can change as households, needs and technologies change.",
                ],
                [
                  "Future",
                  "What happens at the end of a component’s life — and of the building’s.",
                ],
              ].map(([h, b], i) => (
                <li
                  key={h}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-rule-dark py-7"
                >
                  <span className="numeral text-copper">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl">{h}</h3>
                    <p className="body-copy mt-2 text-on-dark-muted">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
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
              publisher="UKGBC"
              title="UK Green Building Council"
              href="https://ukgbc.org/"
            />
            <SourceLink
              publisher="GOV.UK"
              title="Approved Documents (Building Regulations)"
              href="https://www.gov.uk/government/collections/approved-documents"
            />
          </Reveal>
        </div>
      </section>

      <RelatedPages
        items={[
          {
            to: "/energy-saving",
            label: "Energy Saving",
            description: "Practical steps to understand and reduce energy use at home.",
            image: images.insulation,
          },
          {
            to: "/property-investment-development",
            label: "Property Investment & Development",
            description: "How performance and longevity shape the way we think about property.",
            image: images.propertyModel,
          },
        ]}
      />
    </>
  );
}
