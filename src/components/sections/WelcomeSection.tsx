import Image from "next/image";

export default function WelcomeSection() {
  return (
    <div className="relative w-full h-full flex items-center px-6 md:px-16 lg:px-24">
      {/* Left side - heading */}
      <div className="flex-1" data-reveal>
        <Image
          src="/Dreamhouse/images/typography/welcome-to-the-dream-house.png"
          alt="Welcome to The Dream House"
          width={800}
          height={400}
          className="w-[70vw] max-w-[600px] h-auto"
        />
      </div>

      {/* Center-right - details */}
      <div className="flex-1 flex justify-center">
        <div className="text-right font-playfair italic text-cream/90 text-base md:text-lg lg:text-xl space-y-1">
          <p data-reveal>1 month</p>
          <p data-reveal>10 &ndash; 16 people</p>
          <p data-reveal className="mt-4">
            Carefully curated.
          </p>
          <p data-reveal>Consciously held.</p>
          <p data-reveal>Co-created.</p>
          <p data-reveal className="mt-4 max-w-xs ml-auto">
            Fertile soil for the truest
            <br />
            version of yourself to play.
          </p>
        </div>
      </div>
    </div>
  );
}
