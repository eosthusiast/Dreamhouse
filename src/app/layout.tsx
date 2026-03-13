import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { LenisProvider } from "@/providers/LenisProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "The Dream House — Dream Your Way In",
  description:
    "A carefully curated, consciously held, co-created experience. Fertile soil for the truest version of yourself to play.",
  openGraph: {
    title: "The Dream House",
    description: "Dream your way in.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} antialiased`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
