interface StorySectionProps {
  variant: "beach" | "ocean";
}

const BEACH_TEXTS = [
  { text: "You\u2019ve felt it.", x: 6, y: 12, align: "left" as const, topAlign: true },
  {
    text: "That version of yourself that\u2019s lit up, inspired, in love with being alive.",
    x: 25,
    y: 12,
    align: "left" as const,
    topAlign: true,
  },
  { text: "When everything feels possible.", x: 78, y: 78, align: "right" as const },
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

// Beach: horizontal line from "it." to "That", then wide curve from under text2 to left of "When"
const BEACH_LINE_1 = "M 141 82 L 239 82";
const BEACH_LINE_2 = "M 380 132 Q 380 466 590 466";
// Ocean: curve to middle, curve to bottom
const OCEAN_PATH = "M 100 90 Q 300 300 550 300 Q 575 380 600 468";

const LINE_STYLE = {
  stroke: "rgba(251, 240, 224, 0.9)",
  strokeWidth: 1.8,
  fill: "none",
  strokeLinecap: "round" as const,
};

export default function StorySection({ variant }: StorySectionProps) {
  const texts = variant === "beach" ? BEACH_TEXTS : OCEAN_TEXTS;

  return (
    <div className="relative w-full h-full">
      {/* SVG lines connecting text elements */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        fill="none"
      >
        {variant === "beach" ? (
          <>
            <path data-line d={BEACH_LINE_1} {...LINE_STYLE} />
            <path data-line d={BEACH_LINE_2} {...LINE_STYLE} />
          </>
        ) : (
          <path data-line d={OCEAN_PATH} {...LINE_STYLE} />
        )}
      </svg>

      {/* Text anchors */}
      {texts.map((item, i) => (
        <div
          key={i}
          data-reveal
          className={`absolute font-playfair italic text-cream text-lg md:text-xl lg:text-2xl ${
            variant === "beach" && i === 1
              ? "max-w-md md:max-w-lg"
              : "max-w-xs md:max-w-sm"
          }`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            textAlign: item.align,
            transform: `translate(${item.align === "right" ? "-100%" : "0"}, ${"topAlign" in item && item.topAlign ? "0" : "-50%"})`,
            ...(variant === "ocean" ? { textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)" } : {}),
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}
