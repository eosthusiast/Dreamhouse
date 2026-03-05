import Image from "next/image";

export default function PortalSection() {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-6">
      <Image
        src="/images/typography/every-so-often.png"
        alt="Every so often, life offers you a portal. Will you accept the invitation?"
        width={950}
        height={500}
        className="w-[85vw] max-w-[800px] h-auto mx-auto"
      />
    </div>
  );
}
