import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HELIOS | Intelligent Travel Luggage",
  description: "The world's first smart suitcase with integrated packing system. Premium aluminum construction, lifetime warranty, and intelligent organization.",
  keywords: "luggage, suitcase, carry-on, check-in, smart packing, travel gear",
  authors: [{ name: "STFO Inc." }],
  openGraph: {
    title: "HELIOS | Intelligent Travel Luggage",
    description: "Revolutionary smart suitcase with integrated SPS system",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
