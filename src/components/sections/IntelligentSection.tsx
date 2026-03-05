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
