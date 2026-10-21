/**
 * Single configuration point for the temporary concept brand.
 * "THE BUILT FUTURE" is a working concept name only — replace `name`
 * here when the client confirms his business name and it updates everywhere.
 */
export const site = {
  name: "The Built Future",
  wordmark: "THE BUILT FUTURE",
  shortStatement:
    "A considered view of property, home security, energy and the future of housing.",
  editorialLine: "Property / Security / Energy / Housing",
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
  { to: "/property-investment-development", label: "Property", longLabel: "Property Investment & Development" },
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
