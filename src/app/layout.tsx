import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
    description: "A carefully curated, consciously held, co-created experience. Dream your way in.",
    type: "website",
    siteName: "The Dream House",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dream House",
    description: "A carefully curated, consciously held, co-created experience. Dream your way in.",
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
        <LenisProvider><main>{children}</main></LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
