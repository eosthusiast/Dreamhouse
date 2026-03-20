import Image from "next/image";

export default function WelcomeSection() {
  return (
    <div className="relative w-full h-full">
      <style>{`
        @media (min-width: 768px) {
          .welcome-details { color: rgba(10,26,58,0.8) !important; text-shadow: none !important; gap: 1.25rem !important; }
        }
        @media (max-width: 400px) {
          .welcome-heading-wrap { left: 1rem !important; }
          .welcome-heading-wrap img { width: 55vw !important; }
        }
      `}</style>

      {/* Heading - large, left side, vertically centered */}
      <div
        data-reveal
        className="absolute welcome-heading-wrap"
        style={{ left: "6%", top: "28%", transform: "translateY(-50%)" }}
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
          src="/images/typography/welcome-to-the-dream-house.png"
          alt="Welcome to The Dream House"
          width={900}
          height={500}
          className="relative h-auto"
          style={{ width: "48vw", maxWidth: "780px" }}
          sizes="(max-width: 400px) 55vw, 48vw"
        />
      </div>

      {/* Details - right side, vertically centered */}
      <div
        className="absolute"
        style={{ right: "clamp(1rem, 10%, 10%)", top: "58%", transform: "translateY(-30%)" }}
      >
        <div className="welcome-details font-playfair italic text-lg md:text-xl lg:text-2xl" style={{ display: "flex", flexDirection: "column", gap: "0.6rem", color: "rgba(255,255,255,0.95)", textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)" }}>
          <p data-reveal>1 month</p>
          <p data-reveal>10-16 people</p>
          <p data-reveal>Thoughtfully gathered</p>
          <p data-reveal>Consciously held</p>
          <p data-reveal>Co-created</p>
          <p data-reveal className="mt-2 md:mt-6 max-w-xs">
            Where inspiring people
            <br />
            go to get inspired
          </p>
        </div>
      </div>
    </div>
  );
}
