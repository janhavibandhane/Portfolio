import type { Metadata } from "next";
import { Jacquard_12, VT323 } from "next/font/google";
import Cursor from "@/components/Cursor";
import "./globals.css";

const vt = VT323({ subsets: ["latin"], weight: "400", variable: "--font-vt" });
const jacquard = Jacquard_12({ subsets: ["latin"], weight: "400", variable: "--font-jacquard" });

export const metadata: Metadata = {
  title: "Janhavi Bandhane — Full Stack Developer",
  description:
    "Portfolio of Janhavi Bandhane, a full stack developer in Mumbai building fast, responsive web apps with React, Next.js and the MERN stack.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${vt.variable} ${jacquard.variable}`}>
      {/* extensions (Grammarly etc.) add attributes to <body> before hydration */}
      <body className="font-sans" suppressHydrationWarning>
        {children}
        <div className="crt" aria-hidden />
        <Cursor />
      </body>
    </html>
  );
}
