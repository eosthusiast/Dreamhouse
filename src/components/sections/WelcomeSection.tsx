import Image from "next/image";

export default function WelcomeSection() {
  return (
    <div className="relative w-full h-full">
      {/* Heading - large, left side, vertically centered */}
      <div
        data-reveal
        className="absolute"
        style={{ left: "6%", top: "35%", transform: "translateY(-50%)" }}
      >
        <Image
          src="/Dreamhouse/images/typography/welcome-to-the-dream-house.png"
          alt="Welcome to The Dream House"
          width={900}
          height={500}
          className="h-auto"
          style={{ width: "48vw", maxWidth: "780px" }}
        />
      </div>

      {/* Details - right side, vertically centered */}
      <div
        className="absolute"
        style={{ right: "10%", top: "65%", transform: "translateY(-30%)" }}
      >
        <div className="font-playfair italic text-cream/90 text-lg md:text-xl lg:text-2xl" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
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
