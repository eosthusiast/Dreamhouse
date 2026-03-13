import Image from "next/image";

export default function WelcomeSection() {
  return (
    <div className="relative w-full h-full">
      <style>{`
        @media (min-width: 768px) {
          .welcome-details { color: rgba(10,26,58,0.8) !important; text-shadow: none !important; }
        }
      `}</style>

      {/* Heading - large, left side, vertically centered */}
      <div
        data-reveal
        className="absolute"
        style={{ left: "6%", top: "35%", transform: "translateY(-50%)" }}
      >
        {/* Dark vignette behind PNG */}
        <div
          className="absolute"
          style={{
            inset: "-30%",
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <Image
          src="/Dreamhouse/images/typography/welcome-to-the-dream-house.png"
          alt="Welcome to The Dream House"
          width={900}
          height={500}
          className="relative h-auto"
          style={{ width: "48vw", maxWidth: "780px" }}
        />
      </div>

      {/* Details - right side, vertically centered */}
      <div
        className="absolute"
        style={{ right: "10%", top: "65%", transform: "translateY(-30%)" }}
      >
        <div className="welcome-details font-playfair italic text-lg md:text-xl lg:text-2xl" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", color: "rgba(255,255,255,0.95)", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
          <p data-reveal>1 month</p>
          <p data-reveal>10 &ndash; 16 people</p>
          <p data-reveal>Carefully curated.</p>
          <p data-reveal>Consciously held.</p>
          <p data-reveal>Co-created.</p>
          <p data-reveal className="mt-6 max-w-xs">
            Where inspiring people
            <br />
            go to get inspired.
          </p>
        </div>
      </div>
    </div>
  );
}
