import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSlider } from "@/components/site/HeroSlider";
import { EditorialImage } from "@/components/site/EditorialImage";
import { Reveal } from "@/components/site/Reveal";
import { SplitWords } from "@/components/site/SplitWords";
import { ArrowLink, ClosingCta, SectionLabel } from "@/components/site/Editorial";
import { heroFrames, images } from "@/lib/images";
import { riseDelay } from "@/lib/motion";
import { site, type NavItem } from "@/lib/site";
import type { SiteImage } from "@/lib/images";

const title = `${site.name} — Property, development and better living`;
const description =
  "Exploring property investment, thoughtful development, smarter home security and practical ways to make housing more efficient.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: heroFrames[0]
      ? [
          {
            rel: "preload",
            as: "image",
            href: heroFrames[0].src,
            imageSrcSet: heroFrames[0].srcSet,
            imageSizes: "100vw",
            fetchPriority: "high",
          },
        ]
      : [],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <FocusAreas />
      <PropertySection />
      <SecuritySection />
      <EnergySection />
      <SustainableSection />
      <Journal />
      <ClosingCta
        image={images.bluehour}
        title={<>Let’s look at property <em>differently.</em></>}
        copy="Interested in property, home security, energy efficiency or the future of housing? Start a conversation."
      />
    </>
  );
}

/* ---------------- A. Hero ---------------- */
function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest text-on-dark md:min-h-[96svh]">
      <HeroSlider className="-z-10" />

      {/* Editorial metadata — top right on desktop */}
      <div className="pointer-events-none absolute inset-x-0 top-28 hidden md:block">
        <div className="container-editorial flex justify-end">
          <div className="max-w-[22rem] text-right rise-in" style={riseDelay(1100)}>
            <p className="eyebrow text-on-dark">Property / Development / Better living</p>
            <p className="eyebrow mt-3 border-t border-rule-dark pt-3 text-on-dark-muted">
              A more considered view of the built environment
            </p>
          </div>
        </div>
      </div>

      <div className="container-editorial relative pb-14 pt-40 md:pb-20">
        <h1 className="display-hero text-luminous">
          <span className="block md:whitespace-nowrap">
            <SplitWords text="A better future," delay={200} step={90} />
          </span>
          <em className="block md:whitespace-nowrap">
            <SplitWords text="built around property." delay={470} step={90} />
          </em>
        </h1>
        <div className="mt-9 flex flex-col gap-10 md:mt-11 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="lede max-w-[33rem] text-on-dark-muted rise-in" style={riseDelay(900)}>
              Exploring property investment, thoughtful development, smarter home security and practical ways to make
              housing more efficient.
            </p>
            <a href="#approach" className="link-quiet mt-9 text-on-dark rise-in" style={riseDelay(1050)}>
              Explore the approach <span className="arrow rotate-90" aria-hidden="true">→</span>
            </a>
          </div>
          <div className="hidden items-end gap-5 rise-in md:flex" style={riseDelay(1300)} aria-hidden="true">
            <span className="eyebrow text-on-dark-muted [writing-mode:vertical-rl]">Scroll</span>
            <span className="scroll-cue" />
          </div>
        </div>
        <p className="eyebrow mt-12 text-on-dark-muted md:hidden">Property / Development / Better living</p>
      </div>
    </section>
  );
}

/* ---------------- B. Brand statement ---------------- */
function BrandStatement() {
  return (
    <section id="approach" className="section-y scroll-mt-16 bg-limestone">
      <div className="container-editorial">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <SectionLabel index="01">The approach</SectionLabel>
            <h2 className="display-1 mt-10 max-w-[12ch]">Property is more than <em>an address.</em></h2>
          </Reveal>
          <Reveal delay={150} className="flex items-end md:col-span-4 md:col-start-9">
            <div>
              <p className="lede text-charcoal">
                It is an asset to understand, a place to protect and a home that can work better for the people who
                live in it.
              </p>
              <p className="body-copy mt-6 text-on-light-muted">
                Four connected subjects — property, security, energy and sustainable housing — explored with the same
                careful, practical eye.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-8">
            <EditorialImage
              image={images.timberDusk}
              className="aspect-[4/3] md:aspect-[16/10]"
              sizes="(min-width: 768px) 66vw, 100vw"
              parallax={5}
            />
          </Reveal>
          <Reveal delay={150} className="flex flex-col justify-end md:col-span-3 md:col-start-10">
            <EditorialImage image={images.materials} className="aspect-[4/5]" sizes="(min-width: 768px) 25vw, 60vw" />
            <p className="eyebrow mt-4 text-on-light-muted">Material, light, performance</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- C. Four areas of focus ---------------- */
type Focus = { to: NavItem["to"]; index: string; title: string; copy: string; image: SiteImage };

const property: Focus = {
    to: "/property-investment-development",
    index: "I",
    title: "Property Investment & Development",
    copy: "Understanding buildings as assets and opportunities — their condition, context and long-term potential.",
    image: images.docklands,
};
const security: Focus = {
    to: "/home-security",
    index: "II",
    title: "Home Security",
    copy: "Calm, practical thinking about doors, windows, lighting and the products that help protect a home.",
    image: images.securityDoor,
};
const energy: Focus = {
    to: "/energy-saving",
    index: "III",
    title: "Energy Saving",
    copy: "Sensible ways to understand how a home uses energy, and where improvements may be worth exploring.",
    image: images.energyInterior,
};
const sustainable: Focus = {
    to: "/sustainable-housing",
    index: "IV",
    title: "Sustainable Housing",
    copy: "Durable, efficient and well-considered homes — new and existing — designed around the people who use them.",
    image: images.woodlandHouse,
};

function FocusTitle({ item, size = "display-3" }: { item: Focus; size?: string }) {
  return (
    <>
      <div className="flex items-baseline gap-4">
        <span className="numeral text-lg text-copper-deep">{item.index}</span>
        <h3 className={`${size} transition-colors duration-300 group-hover:text-copper-deep`}>{item.title}</h3>
      </div>
      <p className="body-copy mt-4 max-w-md text-on-light-muted">{item.copy}</p>
      <span className="link-quiet mt-5">
        Explore <span className="arrow" aria-hidden="true">→</span>
      </span>
    </>
  );
}

function FocusAreas() {
  return (
    <section className="section-y bg-mineral">
      <div className="container-editorial">
        <Reveal className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <SectionLabel index="02">Four areas of focus</SectionLabel>
          </div>
          <p className="lede md:col-span-5 md:col-start-8">
            One coherent subject seen from four angles: how we invest in, protect, run and build the places we live.
          </p>
        </Reveal>

        {/* Property — large landscape, text beside */}
        <Reveal className="mt-16 md:mt-24">
          <Link to={property.to} className="group grid items-end gap-8 md:grid-cols-12">
            <EditorialImage
              image={property.image}
              className="aspect-[4/3] md:col-span-8 md:aspect-[16/10]"
              sizes="(min-width: 768px) 66vw, 100vw"
              zoom
            />
            <div className="md:col-span-4">
              <FocusTitle item={property} size="display-2" />
            </div>
          </Link>
        </Reveal>

        {/* Security (tall portrait) + Energy (offset landscape) */}
        <div className="mt-20 grid gap-16 md:mt-32 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5">
            <Link to={security.to} className="group block">
              <EditorialImage
                image={security.image}
                className="aspect-[4/5]"
                sizes="(min-width: 768px) 40vw, 100vw"
                zoom
              />
              <div className="mt-8">
                <FocusTitle item={security} />
              </div>
            </Link>
          </Reveal>
          <Reveal delay={150} className="md:col-span-6 md:col-start-7 md:pt-40">
            <Link to={energy.to} className="group block">
              <div className="mb-8 md:mb-10">
                <FocusTitle item={energy} />
              </div>
              <EditorialImage
                image={energy.image}
                className="aspect-[3/2]"
                sizes="(min-width: 768px) 50vw, 100vw"
                zoom
              />
            </Link>
          </Reveal>
        </div>

        {/* Sustainable — dark panel with portrait image */}
        <Reveal className="mt-20 md:mt-32">
          <Link
            to={sustainable.to}
            className="group grid overflow-hidden bg-forest text-on-dark md:grid-cols-12"
          >
            <div className="flex flex-col justify-between gap-10 p-8 md:col-span-6 md:p-14 lg:p-20">
              <span className="numeral text-lg text-copper">{sustainable.index}</span>
              <div>
                <h3 className="display-2 transition-colors duration-300 group-hover:text-copper">{sustainable.title}</h3>
                <p className="body-copy mt-5 max-w-md text-on-dark-muted">{sustainable.copy}</p>
                <span className="link-quiet mt-6 text-on-dark">
                  Explore <span className="arrow" aria-hidden="true">→</span>
                </span>
              </div>
            </div>
            <EditorialImage
              image={sustainable.image}
              className="aspect-[4/3] md:col-span-6 md:aspect-auto md:min-h-[34rem]"
              sizes="(min-width: 768px) 50vw, 100vw"
              zoom
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- D. Property & development ---------------- */
function PropertySection() {
  return (
    <section className="relative overflow-hidden bg-forest text-on-dark">
      <div className="grid md:grid-cols-12">
        <div className="relative md:col-span-7">
          <EditorialImage
            image={images.development}
            className="aspect-[4/3] h-full md:aspect-auto md:min-h-[46rem]"
            sizes="(min-width: 768px) 60vw, 100vw"
            parallax={6}
          />
        </div>
        <div className="container-editorial flex flex-col justify-center py-20 md:col-span-5 md:px-14 lg:px-20">
          <Reveal>
            <SectionLabel index="03" tone="dark">
              Property & development
            </SectionLabel>
            <h2 className="display-1 mt-10 max-w-[10ch]">Look beyond <em>the building.</em></h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="lede mt-8 max-w-md text-on-dark-muted">
              Explore the thinking behind property investment and development, from understanding the potential of a
              building to considering how spaces can serve people and communities over time.
            </p>
            <ArrowLink to="/property-investment-development" className="mt-10 text-on-dark">
              Property investment & development
            </ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- E. Home security ---------------- */
function SecuritySection() {
  return (
    <section className="section-y bg-limestone">
      <div className="container-editorial grid gap-12 md:grid-cols-12 md:gap-8">
        <Reveal className="order-2 flex flex-col justify-between md:order-1 md:col-span-5">
          <SectionLabel index="04">Home security</SectionLabel>
          <div className="mt-10 md:mt-0">
            <h2 className="display-1 max-w-[11ch]">Feel at home <em>in your home.</em></h2>
            <p className="lede mt-8 max-w-md text-on-light-muted">
              Discover practical considerations for residential security, including the products, features and everyday
              measures that can help people make more informed choices about protecting their homes.
            </p>
            <ArrowLink to="/home-security" className="mt-10">
              Home security
            </ArrowLink>
          </div>
        </Reveal>
        <Reveal delay={120} className="order-1 md:order-2 md:col-span-6 md:col-start-7">
          <div className="grid grid-cols-5 gap-4 md:gap-6">
            <EditorialImage
              image={images.darkHouseDusk}
              className="col-span-3 aspect-[3/4]"
              sizes="(min-width: 768px) 30vw, 60vw"
              parallax={5}
            />
            <div className="col-span-2 flex flex-col justify-end gap-4 md:gap-6">
              <EditorialImage image={images.smartLock} className="aspect-square" sizes="(min-width: 768px) 20vw, 40vw" />
              <p className="eyebrow text-on-light-muted">Entrances, access & light</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- F. Energy saving ---------------- */
function EnergySection() {
  return (
    <section className="bg-pine text-on-dark">
      <div className="grid md:grid-cols-2">
        <Reveal className="container-editorial flex flex-col justify-center py-20 md:order-2 md:px-14 md:py-28 lg:px-20">
          <SectionLabel index="05" tone="dark">
            Energy saving
          </SectionLabel>
          <h2 className="display-1 mt-10 max-w-[11ch]">Make every home <em>work smarter.</em></h2>
          <p className="lede mt-8 max-w-md text-on-dark-muted">
            Explore practical ways to think about energy use at home, from heating and lighting to insulation and
            everyday efficiency.
          </p>
          <ArrowLink to="/energy-saving" className="mt-10 text-on-dark">
            Energy saving
          </ArrowLink>
        </Reveal>
        <EditorialImage
          image={images.solar}
          className="aspect-[4/3] md:order-1 md:aspect-auto md:min-h-[44rem]"
          sizes="(min-width: 768px) 50vw, 100vw"
          parallax={5}
        />
      </div>
    </section>
  );
}

/* ---------------- G. Sustainable housing ---------------- */
function SustainableSection() {
  return (
    <section className="section-y bg-limestone">
      <div className="container-editorial">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <SectionLabel index="06">Sustainable housing</SectionLabel>
            <h2 className="display-1 mt-10 max-w-[10ch]">Better homes. <em>Better choices.</em></h2>
          </Reveal>
          <Reveal delay={150} className="flex flex-col justify-end md:col-span-4 md:col-start-9">
            <p className="lede text-on-light-muted">
              Discover the ideas and practical considerations shaping more efficient, durable and thoughtfully designed
              housing.
            </p>
            <ArrowLink to="/sustainable-housing" className="mt-8 self-start">
              Sustainable housing
            </ArrowLink>
          </Reveal>
        </div>
      </div>
      <Reveal className="mt-16 md:mt-24">
        <EditorialImage
          image={images.landscape}
          className="aspect-[4/3] w-full md:aspect-[21/9]"
          sizes="100vw"
          parallax={6}
        />
      </Reveal>
    </section>
  );
}

/* ---------------- H. Journal ---------------- */
type JournalItem = { title: string; topic: string; to: NavItem["to"]; image: SiteImage; excerpt: string };

const lead: JournalItem = {
    title: "Small Changes That Can Improve Home Energy Efficiency",
    topic: "Energy",
    to: "/energy-saving",
    image: images.insulation,
    excerpt: "Draughts, controls, lighting and habits — modest places to start before larger projects.",
};

const rest: JournalItem[] = [
  {
    title: "What to Consider When Evaluating a Property",
    topic: "Property",
    to: "/property-investment-development",
    image: images.londonBrick,
    excerpt: "Location, condition, constraints and use — the questions that shape a considered view.",
  },
  {
    title: "A Practical Introduction to Sustainable Housing",
    topic: "Housing",
    to: "/sustainable-housing",
    image: images.timberBlackHouse,
    excerpt: "What sustainability means for a home beyond appearance: performance, durability and fit.",
  },
];

function Journal() {
  return (
    <section className="section-y border-t border-rule-light bg-mineral">
      <div className="container-editorial">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="07">Journal — forthcoming</SectionLabel>
            <h2 className="display-1 mt-10 max-w-[13ch]">Ideas for a <em>better-built future.</em></h2>
          </div>
          <p className="body-copy max-w-sm text-on-light-muted">
            Planned article concepts. Full articles are in preparation — in the meantime, each links to the related
            guide on this site.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <Link to={lead.to} className="group block">
              <EditorialImage image={lead.image} className="aspect-[3/2]" sizes="(min-width: 768px) 58vw, 100vw" zoom />
              <JournalMeta topic={lead.topic} />
              <h3 className="display-2 mt-4 max-w-[18ch] transition-colors group-hover:text-copper-deep">{lead.title}</h3>
              <p className="body-copy mt-4 max-w-lg text-on-light-muted">{lead.excerpt}</p>
            </Link>
          </Reveal>
          <div className="grid gap-14 md:col-span-4 md:col-start-9">
            {rest.map((a, i) => (
              <Reveal key={a.title} delay={120 * (i + 1)}>
                <Link to={a.to} className="group block">
                  <EditorialImage
                    image={a.image}
                    className={i === 0 ? "aspect-[4/3]" : "aspect-[16/10]"}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    zoom
                  />
                  <JournalMeta topic={a.topic} />
                  <h3 className="display-3 mt-3 transition-colors group-hover:text-copper-deep">{a.title}</h3>
                  <p className="body-copy mt-3 text-on-light-muted">{a.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JournalMeta({ topic }: { topic: string }) {
  return (
    <div className="mt-6 flex items-center gap-4">
      <span className="eyebrow text-copper-deep">{topic}</span>
      <span className="h-px w-6 bg-rule-light" aria-hidden="true" />
      <span className="eyebrow text-on-light-muted">Article in preparation</span>
    </div>
  );
}
