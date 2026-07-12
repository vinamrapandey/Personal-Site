import type { Metadata } from "next";
import { Space_Grotesk, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
});

const siteUrl = "https://vinamra.dev";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "Vinamra Pandey — Seven products. One person. Every layer.";
const description =
  "Product manager, brand strategist, AI consultant, and full-stack builder. I take AI products from blueprint to shipped — alone.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: [
      { url: `${basePath}/favicon-32.png`, sizes: "32x32", type: "image/png" },
      { url: `${basePath}/favicon.png`, sizes: "48x48", type: "image/png" },
    ],
    apple: `${basePath}/apple-touch-icon.png`,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Vinamra Pandey",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable} font-body bg-canvas text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
