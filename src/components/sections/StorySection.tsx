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

export default function StorySection({ variant }: StorySectionProps) {
  const texts = variant === "beach" ? BEACH_TEXTS : OCEAN_TEXTS;

  return (
    <div className="relative w-full h-full">
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
