import heroDevelopment from "@/assets/hero-development.webp";
import heroDevelopmentSm from "@/assets/hero-development-sm.webp";
import heroTimber from "@/assets/hero-timber.webp";
import heroTimberSm from "@/assets/hero-timber-sm.webp";
import heroBluehour from "@/assets/hero-bluehour.webp";
import heroBluehourSm from "@/assets/hero-bluehour-sm.webp";
import heroSolar from "@/assets/hero-solar.webp";
import heroSolarSm from "@/assets/hero-solar-sm.webp";
import heroRetrofit from "@/assets/hero-retrofit.webp";
import heroRetrofitSm from "@/assets/hero-retrofit-sm.webp";
import heroLandscape from "@/assets/hero-landscape.webp";
import heroLandscapeSm from "@/assets/hero-landscape-sm.webp";
import securityDoor from "@/assets/security-door.webp";
import energyInterior from "@/assets/energy-interior.webp";
import energyExterior from "@/assets/energy-exterior.webp";
import energyInsulation from "@/assets/energy-insulation.webp";
import materialsDetail from "@/assets/materials-detail.webp";
import propertyModel from "@/assets/property-model.webp";
import { placeholders } from "./placeholders";

export type SiteImage = {
  src: string;
  srcSet?: string | undefined;
  alt: string;
  width: number;
  height: number;
  /** object-position for desktop / mobile crops */
  position?: string | undefined;
  mobilePosition?: string | undefined;
  /** Tiny blurred preview shown while the full image loads */
  lqip?: string | undefined;
  /** Average colour of the photograph, used as the loading ground */
  tone?: string | undefined;
};

const ph = (key: string) => {
  const p = placeholders[key];
  return p ? { lqip: p.lqip, tone: p.tone } : {};
};

/** Representative imagery only — not the client's own properties or projects. */
const unsplash = (id: string, alt: string, width: number, height: number, position?: string): SiteImage => {
  const base = `https://images.unsplash.com/${id}?auto=format&fit=crop&q=70`;
  return {
    src: `${base}&w=1200`,
    srcSet: `${base}&w=640 640w, ${base}&w=1000 1000w, ${base}&w=1400 1400w`,
    alt,
    width,
    height,
    position,
    ...ph(id),
  };
};

const hero = (key: string, lg: string, sm: string, alt: string, position: string, mobilePosition: string): SiteImage => ({
  ...ph(key),
  src: lg,
  srcSet: `${sm} 1000w, ${lg} 1920w`,
  alt,
  width: 1920,
  height: 1088,
  position,
  mobilePosition,
});

const heroDev = hero(
    "hero-development",
    heroDevelopment,
    heroDevelopmentSm,
    "Contemporary brick townhouses along a planted residential street in warm evening light",
    "60% 50%",
    "68% 50%",
);
const heroTim = hero(
    "hero-timber",
    heroTimber,
    heroTimberSm,
    "Modern home in oak cladding and pale limestone with large windows above a landscaped garden",
    "70% 50%",
    "78% 50%",
);
const heroBlue = hero(
    "hero-bluehour",
    heroBluehour,
    heroBluehourSm,
    "Brick house at blue hour with warm interior light and softly lit entrance",
    "72% 50%",
    "70% 50%",
);
const heroSol = hero(
    "hero-solar",
    heroSolar,
    heroSolarSm,
    "Timber and brick family home with roof-integrated solar panels set in an English garden",
    "65% 45%",
    "66% 45%",
);
const heroRet = hero(
    "hero-retrofit",
    heroRetrofit,
    heroRetrofitSm,
    "Victorian brick terrace with a contemporary bronze-clad extension and courtyard garden at dusk",
    "55% 50%",
    "60% 50%",
);
const heroLand = hero(
    "hero-landscape",
    heroLandscape,
    heroLandscapeSm,
    "Timber-clad homes arranged around a shared green with mature oak trees and meadow planting",
    "50% 55%",
    "55% 55%",
);

export const heroFrames: SiteImage[] = [heroDev, heroTim, heroBlue, heroSol, heroRet, heroLand];

export const images = {
  development: heroDev,
  timber: heroTim,
  bluehour: heroBlue,
  solar: heroSol,
  retrofit: heroRet,
  landscape: heroLand,
  securityDoor: {
    src: securityDoor,
    ...ph("security-door"),
    alt: "Dark green timber front door with a brushed bronze pull handle, lock cylinder and a video doorbell on the brick reveal",
    width: 1120,
    height: 1400,
  } satisfies SiteImage,
  energyInterior: {
    src: energyInterior,
    ...ph("energy-interior"),
    alt: "Calm living room in a period home with a sash window, column radiator and wall-mounted heating control",
    width: 1400,
    height: 933,
  } satisfies SiteImage,
  energyExterior: {
    src: energyExterior,
    ...ph("energy-exterior"),
    alt: "Side of a brick and timber home with an air source heat pump on a stone plinth beside lavender planting",
    width: 1120,
    height: 1400,
  } satisfies SiteImage,
  insulation: {
    src: energyInsulation,
    ...ph("energy-insulation"),
    alt: "Wood-fibre insulation boards fitted neatly between exposed timber roof rafters beside a roof window",
    width: 1400,
    height: 933,
  } satisfies SiteImage,
  materials: {
    src: materialsDetail,
    ...ph("materials-detail"),
    alt: "Buff brick, weathered timber cladding, a bronze window frame and a limestone sill meeting in low sunlight",
    width: 1120,
    height: 1400,
  } satisfies SiteImage,
  propertyModel: {
    src: propertyModel,
    ...ph("property-model"),
    alt: "White card architectural model of a terrace of houses on a studio table with site plans and elevations",
    width: 1400,
    height: 933,
  } satisfies SiteImage,

  /* Verified Unsplash photography (Unsplash License) */
  timberDusk: unsplash(
    "photo-1600585154340-be6161a56a0c",
    "Contemporary timber and dark-clad house at dusk with glowing interiors beneath a mature tree",
    1400,
    933,
    "50% 50%",
  ),
  docklands: unsplash(
    "photo-1778042768125-d4f6b84e40e7",
    "Modern residential buildings and a construction site at dusk with cranes on the skyline",
    1400,
    933,
    "40% 50%",
  ),
  woodlandHouse: unsplash(
    "photo-1758239652052-a49b3ed9d7ce",
    "Wooden-clad house nestled among green trees in dappled sunlight",
    933,
    1400,
    "50% 50%",
  ),
  darkHouseDusk: unsplash(
    "photo-1600585154526-990dced4db0d",
    "Dark-clad contemporary house at dusk with warm light at the entrance",
    933,
    1400,
    "50% 60%",
  ),
  smartLock: unsplash(
    "photo-1558002038-1055907df827",
    "A smart lock fitted to the inside of a front door alongside its smartphone app",
    1400,
    933,
    "50% 50%",
  ),
  londonBrick: unsplash(
    "photo-1544561221-d360f0a79df5",
    "Period brick residential buildings in London in soft evening light",
    1400,
    933,
    "50% 50%",
  ),
  interiorTimber: unsplash(
    "photo-1600607687939-ce8a6c25118c",
    "Light-filled open-plan interior with timber wall panelling and large glazing",
    1400,
    950,
    "50% 50%",
  ),
  timberBlackHouse: unsplash(
    "photo-1600566753190-17f0baa2a6c3",
    "Modern home combining natural timber and dark cladding with a planted front garden",
    1400,
    933,
    "50% 50%",
  ),
  entranceLight: unsplash(
    "photo-1494526585095-c41746248156",
    "Residential entrance lit by wall lights at dusk with steps and planting",
    1400,
    933,
    "30% 50%",
  ),
  kitchen: unsplash(
    "photo-1484154218962-a197022b5858",
    "Bright modern kitchen with integrated appliances and pendant lighting",
    1400,
    933,
    "50% 50%",
  ),
} as const;
