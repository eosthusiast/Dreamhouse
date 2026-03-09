export const SECTION_SCROLL_HEIGHT = "150vh";

export const SECTIONS = [
  { id: "hero-1", label: "Hero 1", image: null }, // Video background
  { id: "hero-2", label: "Hero 2", image: null }, // Same video
  {
    id: "story-1",
    label: "Story Beach",
    image: "/images/sections/beach-sunset.jpg",
  },
  {
    id: "story-2",
    label: "Story Ocean",
    image: "/images/sections/ocean-sparkle.jpg",
  },
  {
    id: "welcome",
    label: "Welcome",
    image: "/images/sections/welcome-silhouettes.jpg",
  },
  {
    id: "inspired",
    label: "Inspired By",
    image: "/images/sections/inspired-dancing.jpg",
  },
  {
    id: "intelligent",
    label: "Intelligent Living",
    image: "/images/sections/intelligent-ocean.jpg",
  },
  {
    id: "portal",
    label: "Portal",
    image: "/images/sections/portal-waterfall.jpg",
  },
] as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/Dreamhouse/" },
  { label: "Houses", href: "/Dreamhouse/houses" },
  { label: "Values", href: "/Dreamhouse/values" },
  { label: "Who", href: "/Dreamhouse/who" },
  { label: "FAQ", href: "/Dreamhouse/faq" },
] as const;

export const COLORS = {
  galaxy: "#0a0a2e",
  galaxyDeep: "#050518",
  turquoise: "#5CE0D2",
  turquoiseGlow: "#7AF0E4",
  cream: "#FBF0E0",
  creamDark: "#F0E0C8",
  warmGold: "#d4a574",
  coralStart: "#e8a87c",
  coralEnd: "#c89ec4",
} as const;
