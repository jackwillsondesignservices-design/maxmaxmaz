/**
 * Single configuration point for the brand.
 * Name, strapline, positioning and contact details live here only — components read from this object.
 */
export const site = {
  name: "MDR Rent-Path Ltd",
  wordmark: "MDR RENT-PATH",
  descriptor: "Property Development & Asset Management",
  shortStatement:
    "Modern rental spaces for a sustainable future — developing communities, creating opportunity, building wealth.",
  positioning:
    "MDR Rent-Path Ltd develops contemporary rental spaces designed for sustainable living, thriving communities, and long-term wealth creation. Through responsible development, innovative design, and strategic investment, we create environments where residents flourish and value grows for all stakeholders.",
  mission:
    "Creating modern rental spaces that inspire sustainable living and generate wealth for all.",
  editorialLine: "Develop / Sustain / Invest / Grow",
  contact: {
    person: "Max Clarke",
    role: "Founder and Director",
    email: "info@mdrrentpath.co.uk",
    website: "www.mdrrentpath.co.uk",
    websiteUrl: "https://www.mdrrentpath.co.uk",
  },
} as const;

export type NavItem = {
  to:
    | "/"
    | "/property-investment-development"
    | "/home-security"
    | "/energy-saving"
    | "/sustainable-housing"
    | "/about"
    | "/contact";
  label: string;
  longLabel: string;
};

export const primaryNav: NavItem[] = [
  {
    to: "/property-investment-development",
    label: "Property",
    longLabel: "Property Investment & Development",
  },
  { to: "/home-security", label: "Home Security", longLabel: "Home Security" },
  { to: "/energy-saving", label: "Energy Saving", longLabel: "Energy Saving" },
  { to: "/sustainable-housing", label: "Sustainable Housing", longLabel: "Sustainable Housing" },
  { to: "/about", label: "About", longLabel: "About" },
];

export const allPages: NavItem[] = [
  { to: "/", label: "Home", longLabel: "Home" },
  ...primaryNav,
  { to: "/contact", label: "Contact", longLabel: "Contact" },
];

export const pageTitle = (title: string) => `${title} | ${site.name}`;
