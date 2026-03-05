const INSPIRED_ITEMS = [
  { text: "Inspired by: the depth of retreats.", column: 0 },
  { text: "The magic of Burning Man.", column: 0 },
  { text: "The intimacy of Mystery Schools.", column: 0 },
  { text: "The aliveness of festivals.", column: 1 },
  { text: "The ambition of accelerators.", column: 1 },
  { text: "The surrender of Vision Quests.", column: 1 },
  { text: "The inspiration of a TED Talk.", column: 2 },
  { text: "The grounding of pure, unfiltered nature.", column: 2 },
  { text: "The belonging of sitting in circle.", column: 2 },
  { text: "The playfulness of childhood.", column: 2 },
];

export default function InspiredBySection() {
  const col0 = INSPIRED_ITEMS.filter((i) => i.column === 0);
  const col1 = INSPIRED_ITEMS.filter((i) => i.column === 1);
  const col2 = INSPIRED_ITEMS.filter((i) => i.column === 2);

  return (
    <div className="relative w-full h-full flex items-center justify-center px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl w-full">
        {/* Column 1 - top left */}
        <div className="space-y-3 md:pt-0">
          {col0.map((item, i) => (
            <p
              key={i}
              data-reveal
              className="font-playfair italic text-cream text-base md:text-lg lg:text-xl"
            >
              {item.text}
            </p>
          ))}
        </div>

        {/* Column 2 - center */}
        <div className="space-y-3 md:pt-16">
          {col1.map((item, i) => (
            <p
              key={i}
              data-reveal
              className="font-playfair italic text-cream text-base md:text-lg lg:text-xl text-center"
            >
              {item.text}
            </p>
          ))}
        </div>

        {/* Column 3 - bottom right */}
        <div className="space-y-3 md:pt-32 text-right">
          {col2.map((item, i) => (
            <p
              key={i}
              data-reveal
              className="font-playfair italic text-cream text-base md:text-lg lg:text-xl"
            >
              {item.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
