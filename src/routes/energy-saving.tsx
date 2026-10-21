import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { EditorialImage } from "@/components/site/EditorialImage";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryBand, RelatedPages, SectionLabel, SourceLink } from "@/components/site/Editorial";
import { images } from "@/lib/images";
import { pageTitle } from "@/lib/site";

const title = pageTitle("Energy Saving");
const description =
  "Practical, cautious guidance on home energy: insulation, draughts, heating controls, lighting, hot water, appliances and understanding consumption.";

export const Route = createFileRoute("/energy-saving")({
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
  component: EnergyPage,
});

const areas = [
  {
    title: "Insulation and draught reduction",
    body: "Lofts, walls, floors and gaps around doors and windows are common places where heat escapes. Draught-proofing is often a sensible early step; wall and floor insulation needs specialist assessment.",
  },
  {
    title: "Heating controls and sensible temperatures",
    body: "Programmers, room thermostats and radiator valves help heat only the spaces you use, when you use them. Understanding your existing controls is a useful place to begin.",
  },
  {
    title: "Lighting efficiency",
    body: "LED lamps use considerably less electricity than older bulbs for the same light. Thoughtful lighting design and switching off unused lights also make a difference.",
  },
  {
    title: "Hot water use",
    body: "Shorter showers, efficient shower heads, an insulated cylinder and appropriate timer settings can all reduce the energy used to heat water.",
  },
  {
    title: "Energy-efficient appliances",
    body: "When replacing appliances, energy labels help compare running costs. Using full loads and lower wash temperatures can help with existing ones.",
  },
  {
    title: "Understanding household consumption",
    body: "Reading meters or smart-meter data shows where and when energy is used — the basis for deciding which changes are worth making.",
  },
];

function EnergyPage() {
  return (
    <>
      <PageHero
        image={images.solar}
        index="III"
        label="Energy saving"
        title="Use less energy. Think more clearly."
        intro="Practical ways to understand how a home uses energy — and where it may be worth making changes."
      />

      {/* A. Start with the home */}
      <section className="section-y bg-limestone">
        <div className="container-editorial grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-6">
            <SectionLabel index="01">Start with the home</SectionLabel>
            <h2 className="display-1 mt-10 max-w-[11ch]">Every building behaves differently.</h2>
          </Reveal>
          <Reveal delay={150} className="space-y-6 md:col-span-5 md:col-start-8 md:pt-28">
            <p className="lede">
              Energy efficiency depends on the building, its existing systems and the way it is used. A Victorian terrace
              and a new-build flat call for very different approaches.
            </p>
            <p className="body-copy text-on-light-muted">
              Before thinking about products, it helps to understand the fabric of the home, how it is heated and where
              comfort is lacking.
            </p>
          </Reveal>
        </div>
        <div className="container-editorial mt-16 grid gap-6 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <EditorialImage image={images.energyInterior} className="aspect-[3/2]" sizes="(min-width: 768px) 58vw, 100vw" parallax={4} />
          </Reveal>
          <Reveal delay={150} className="md:col-span-4 md:col-start-9 md:pt-32">
            <EditorialImage image={images.energyExterior} className="aspect-[4/5]" sizes="(min-width: 768px) 33vw, 80vw" />
          </Reveal>
        </div>
      </section>

      {/* B. Practical areas */}
      <section className="section-y bg-pine text-on-dark">
        <div className="container-editorial">
          <Reveal className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <SectionLabel index="02" tone="dark">
                Practical areas to consider
              </SectionLabel>
              <h2 className="display-2 mt-10 max-w-[13ch]">Six places to look first.</h2>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-x-12 md:mt-20 md:grid-cols-2 lg:gap-x-20">
            {areas.map((a, i) => (
              <Reveal key={a.title} delay={(i % 2) * 100}>
                <article className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-rule-dark py-10">
                  <span className="numeral text-3xl text-copper">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="display-3">{a.title}</h3>
                    <p className="body-copy mt-4 text-on-dark-muted">{a.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* C. Improvements and priorities */}
      <section className="bg-limestone">
        <div className="grid md:grid-cols-12">
          <Reveal className="container-editorial flex flex-col justify-center py-20 md:col-span-6 md:px-14 md:py-28 lg:px-20">
            <SectionLabel index="03">Improvements & priorities</SectionLabel>
            <h2 className="display-2 mt-10 max-w-[13ch]">Weigh it up before you start.</h2>
            <p className="body-copy mt-8 text-on-light-muted">
              Before making changes, consider the condition of the property, installation requirements, upfront costs
              and the potential benefits for your particular home. Savings vary widely, so treat any general figures
              with caution.
            </p>
            <div className="mt-8 border-l-2 border-copper pl-5">
              <p className="body-copy text-charcoal">
                Electrical, gas, heating and structural work should be carried out by suitably qualified and registered
                professionals — not as DIY projects.
              </p>
            </div>
          </Reveal>
          <EditorialImage
            image={images.insulation}
            className="aspect-[4/3] md:col-span-6 md:aspect-auto md:min-h-[40rem]"
            sizes="(min-width: 768px) 50vw, 100vw"
            parallax={5}
          />
        </div>
      </section>

      {/* D. Further information */}
      <section className="section-y bg-mineral">
        <div className="container-editorial grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <SectionLabel index="04">Further information</SectionLabel>
            <h2 className="display-3 mt-8 max-w-[14ch]">Official and independent UK guidance.</h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-7 md:col-start-6">
            <SourceLink publisher="GOV.UK" title="Find ways to save energy in your home" href="https://www.gov.uk/improve-energy-efficiency" />
            <SourceLink publisher="GOV.UK" title="Find an energy certificate (EPC)" href="https://www.gov.uk/find-energy-certificate" />
            <SourceLink publisher="GOV.UK" title="Boiler Upgrade Scheme" href="https://www.gov.uk/apply-boiler-upgrade-scheme" />
            <SourceLink publisher="Energy Saving Trust" title="Independent energy advice" href="https://energysavingtrust.org.uk/" />
            <SourceLink publisher="Gas Safe Register" title="Find a registered gas engineer" href="https://www.gassaferegister.co.uk/" />
          </Reveal>
        </div>
      </section>

      <EnquiryBand
        title="Thinking about energy at home?"
        copy="Get in touch with a question about insulation, heating, lighting or anything in between."
      />

      <RelatedPages
        items={[
          {
            to: "/sustainable-housing",
            label: "Sustainable Housing",
            description: "Energy is one part of a wider picture of durable, well-designed homes.",
            image: images.materials,
          },
          {
            to: "/home-security",
            label: "Home Security",
            description: "Smart controls and lighting that support comfort and security together.",
            image: images.securityDoor,
          },
        ]}
      />
    </>
  );
}
