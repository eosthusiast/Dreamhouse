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
        {/* SVG line connecting text elements — gentle arc */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            data-line
            d="M 150 180 Q 350 330 550 330 Q 690 330 820 450"
            stroke="rgba(251, 240, 224, 0.4)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <div
          data-reveal
          className="absolute font-playfair italic text-cream text-lg md:text-xl lg:text-2xl"
          style={{ left: "15%", top: "30%", maxWidth: "28rem" }}
        >
          For those that feel the need for a more intelligent way to live
        </div>
        <div
          data-reveal
          className="absolute font-playfair italic text-cream text-lg md:text-xl lg:text-2xl"
          style={{
            left: "55%",
            top: "55%",
            maxWidth: "24rem",
            textAlign: "right",
            transform: "translateX(-100%)",
          }}
        >
          in connection with nature, ourselves and each other.
        </div>
        <div
          data-reveal
          className="absolute font-playfair italic text-cream text-lg md:text-xl lg:text-2xl"
          style={{
            left: "82%",
            top: "75%",
            maxWidth: "22rem",
            textAlign: "right",
            transform: "translateX(-100%)",
          }}
        >
          Fertile soil for the truest version of yourself to play.
        </div>
      </div>
    </div>
  );
}
