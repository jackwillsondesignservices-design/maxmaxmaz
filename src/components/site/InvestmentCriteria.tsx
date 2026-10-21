import { EditorialImage } from "./EditorialImage";
import { Reveal } from "./Reveal";
import { SectionLabel, SourceLink } from "./Editorial";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

/** MDR Rent-Path's acquisition criteria — edit here and it updates on every page that shows them. */
const investmentCriteria = [
  {
    title: "Low-rise only",
    body: "Houses, terraces and small low-rise blocks. Simple to manage, easy to maintain and the kind of homes renters want to stay in.",
  },
  {
    title: "Start values up to £120,000",
    body: "We focus on projects with a starting value of £120,000 or less. That is where the rental numbers work — above it, returns quickly fall away.",
  },
  {
    title: "New build only with regeneration funding",
    body: "We refurbish and improve existing buildings first. New build is considered only where a regeneration fund is in place to tap into.",
  },
  {
    title: "Held for the long term",
    body: "Homes are developed to rent and managed as assets, so residents get a well-kept place to live and value grows for every stakeholder.",
  },
] as const;

export function InvestmentCriteria({ index, className }: { index?: string; className?: string }) {
  return (
    <section className={cn("section-y bg-forest text-on-dark", className)}>
      <div className="container-editorial">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-6">
            <SectionLabel index={index} tone="dark">
              Investment criteria
            </SectionLabel>
            <h2 className="display-1 mt-10 max-w-[12ch]">
              Low-rise. <em>Up to £120k.</em>
            </h2>
          </Reveal>
          <Reveal delay={150} className="flex items-end md:col-span-5 md:col-start-8">
            <p className="lede text-on-dark-muted">
              We keep our criteria deliberately tight, because that is where modern rental homes
              deliver lasting returns for residents, communities and investors.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-px bg-rule-dark sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {investmentCriteria.map((c, i) => (
            <Reveal
              as="li"
              key={c.title}
              delay={i * 90}
              className="flex flex-col bg-forest pt-8 pb-10 sm:pr-8 max-lg:sm:even:pl-8 lg:not-first:pl-8"
            >
              <span
                className="h-0.5 w-10 bg-copper shadow-[0_2px_0_var(--gold)]"
                aria-hidden="true"
              />
              <span className="numeral mt-8 text-sm text-gold">0{i + 1}</span>
              <h3 className="display-3 mt-3">{c.title}</h3>
              <p className="body-copy mt-4 text-on-dark-muted">{c.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Regeneration example the client pointed to: the Cleator Moor Town Deal, West Cumbria. */
export function RegenerationCase({ index }: { index?: string }) {
  return (
    <section className="bg-limestone">
      <div className="grid md:grid-cols-12">
        <EditorialImage
          image={images.retrofit}
          className="aspect-[4/3] md:col-span-6 md:aspect-auto md:min-h-[44rem]"
          sizes="(min-width: 768px) 50vw, 100vw"
          parallax={5}
        />
        <div className="container-editorial flex flex-col justify-center py-20 md:col-span-6 md:px-14 lg:px-20">
          <Reveal>
            <SectionLabel index={index}>Regeneration in focus</SectionLabel>
            <h2 className="display-2 mt-10 max-w-[14ch]">
              Cleator Moor, <em>West Cumbria.</em>
            </h2>
            <p className="lede mt-8 max-w-lg">
              When public money is already transforming a town, well-run rental homes nearby become
              more valuable to the people who live in them — and to those who invest in them.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-10 space-y-5 border-t border-rule-light pt-8">
              {[
                "The Cleator Moor Town Deal secured £22.5 million from the Government’s Towns Fund, with a further £18.4 million of partner match funding.",
                "Its first project, Healthy Town, repurposed and extended the activity centre into a fully electric sports facility with rooftop solar.",
                "The finished building was handed to operator Everyone Active in August 2026.",
              ].map((fact) => (
                <li key={fact} className="flex gap-4">
                  <span className="mt-3 h-px w-4 shrink-0 bg-copper" aria-hidden="true" />
                  <p className="body-copy text-on-light-muted">{fact}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <SourceLink
                publisher="Everyone Active"
                title="Cleator Moor Activity Centre"
                href="https://www.everyoneactive.com/centre/cleator-moor-activity-centre/"
              />
              <SourceLink
                publisher="Cumberland Council"
                title="Cleator Moor Activity Centre completed"
                href="https://www.cumberland.gov.uk/news/2026/cleator-moor-activity-centre-completed-healthy-town-project-reaches-major-milestone"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
