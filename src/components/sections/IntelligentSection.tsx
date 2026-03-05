export default function IntelligentSection() {
  return (
    <div className="relative w-full h-full">
      {/* Purple-golden gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(120, 60, 120, 0.35), rgba(180, 120, 60, 0.25))",
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-20 w-full h-full">
        {/* SVG line connecting text elements */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            data-line
            d="M 120 210 C 200 220, 300 280, 400 320 S 500 380, 580 400"
            stroke="rgba(251, 240, 224, 0.4)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <div
          data-reveal
          className="absolute font-playfair italic text-cream text-lg md:text-xl lg:text-2xl max-w-xs md:max-w-sm"
          style={{ left: "10%", top: "35%", textAlign: "left" }}
        >
          For those that feel the need for a more intelligent way to live
        </div>
        <div
          data-reveal
          className="absolute font-playfair italic text-cream text-lg md:text-xl lg:text-2xl max-w-xs md:max-w-sm"
          style={{
            left: "60%",
            top: "70%",
            textAlign: "right",
            transform: "translateX(-100%)",
          }}
        >
          in connection with nature, ourselves and each other.
        </div>
      </div>
    </div>
  );
}
