interface StorySectionProps {
  variant: "beach" | "ocean";
}

const BEACH_TEXTS = [
  { text: "You\u2019ve felt it.", x: 8, y: 15, align: "left" as const },
  {
    text: "That version of yourself that\u2019s lit up, inspired, in love with being alive.",
    x: 25,
    y: 38,
    align: "left" as const,
  },
  { text: "When everything feels possible.", x: 65, y: 72, align: "right" as const },
];

const OCEAN_TEXTS = [
  {
    text: "Where dancing with your dreams is just a Tuesday\u2026",
    x: 10,
    y: 15,
    align: "left" as const,
  },
  {
    text: "Where your dreams become reality on the same day you dream them",
    x: 55,
    y: 50,
    align: "right" as const,
  },
  { text: "What if that wasn\u2019t luck?", x: 60, y: 78, align: "right" as const },
];

// Gentle S-curves connecting text positions
const BEACH_PATH = "M 90 95 C 130 110, 160 150, 200 200 C 240 250, 280 270, 340 290 C 400 310, 480 350, 540 380 C 600 410, 620 420, 640 430";
const OCEAN_PATH = "M 110 95 C 150 110, 200 160, 250 220 C 300 280, 380 310, 440 320 C 500 330, 520 350, 540 380 C 560 410, 580 440, 600 460";

export default function StorySection({ variant }: StorySectionProps) {
  const texts = variant === "beach" ? BEACH_TEXTS : OCEAN_TEXTS;
  const pathData = variant === "beach" ? BEACH_PATH : OCEAN_PATH;

  return (
    <div className="relative w-full h-full">
      {/* SVG line connecting text elements */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          data-line
          d={pathData}
          stroke="rgba(251, 240, 224, 0.4)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Text anchors */}
      {texts.map((item, i) => (
        <div
          key={i}
          data-reveal
          className="absolute font-playfair italic text-cream text-lg md:text-xl lg:text-2xl max-w-xs md:max-w-sm"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            textAlign: item.align,
            transform: `translate(${item.align === "right" ? "-100%" : "0"}, -50%)`,
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}
