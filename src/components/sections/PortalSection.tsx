import Image from "next/image";

export default function PortalSection() {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-6">
      {/* Dark radial glow behind text for readability */}
      <div
        className="absolute"
        style={{
          width: "90vw",
          height: "80%",
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Image
        src="/images/typography/every-so-often.png"
        alt="Every so often, life offers you a portal. Will you accept the invitation?"
        width={950}
        height={500}
        className="relative w-[85vw] max-w-[800px] h-auto mx-auto"
      />
    </div>
  );
}
