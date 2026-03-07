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
            d="M 180 200 C 250 210, 320 260, 380 310 C 440 360, 480 400, 540 380 C 600 360, 660 380, 720 420 C 780 460, 800 470, 820 475"
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
        {/* Invisible spacers to delay "Fertile soil" reveal to end of section */}
        <div data-reveal className="absolute" style={{ opacity: 0, pointerEvents: "none", width: 0, height: 0 }} />
        <div data-reveal className="absolute" style={{ opacity: 0, pointerEvents: "none", width: 0, height: 0 }} />
        <div data-reveal className="absolute" style={{ opacity: 0, pointerEvents: "none", width: 0, height: 0 }} />
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
