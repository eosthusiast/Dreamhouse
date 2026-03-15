const INSPIRED_ITEMS = [
  { text: "Inspired by:", column: 0 },
  { text: "The depth of retreats.", column: 0 },
  { text: "The magic of Burning Man.", column: 0 },
  { text: "The intimacy of Mystery Schools.", column: 0 },
  { text: "The aliveness of festivals.", column: 1 },
  { text: "The ambition of accelerators.", column: 1 },
  { text: "The surrender of Vision Quests.", column: 1 },
  { text: "The spark of a TED Talk.", column: 2 },
  { text: "The pure grounding of nature.", column: 2 },
  { text: "The belonging of sitting in circle.", column: 2 },
  { text: "The playfulness of childhood.", column: 2 },
];

export default function InspiredBySection() {
  const col0 = INSPIRED_ITEMS.filter((i) => i.column === 0);
  const col1 = INSPIRED_ITEMS.filter((i) => i.column === 1);
  const col2 = INSPIRED_ITEMS.filter((i) => i.column === 2);

  return (
    <div className="relative w-full h-full flex items-start md:items-center justify-center px-6 md:px-16 pt-24 pb-16 md:pt-0 md:pb-0">
      <style>{`
        @media (min-width: 768px) {
          .inspired-col2 { padding-top: 8rem; }
          .inspired-col3 { padding-top: 16rem; }
        }
      `}</style>
      <div className="flex flex-col justify-between h-full md:h-auto md:grid md:grid-cols-3 md:gap-12 max-w-5xl w-full">
        {/* Column 1 - top left */}
        <div className="space-y-3">
          {col0.map((item, i) => (
            <p
              key={i}
              data-reveal
              className="font-playfair italic text-cream text-base md:text-lg lg:text-xl"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)" }}
            >
              {item.text}
            </p>
          ))}
        </div>

        {/* Column 2 - center */}
        <div className="inspired-col2 space-y-3">
          {col1.map((item, i) => (
            <p
              key={i}
              data-reveal
              className="font-playfair italic text-cream text-base md:text-lg lg:text-xl md:text-center"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)" }}
            >
              {item.text}
            </p>
          ))}
        </div>

        {/* Column 3 - bottom right */}
        <div className="inspired-col3 space-y-3 text-right">
          {col2.map((item, i) => (
            <p
              key={i}
              data-reveal
              className="font-playfair italic text-cream text-base md:text-lg lg:text-xl"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)" }}
            >
              {item.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
