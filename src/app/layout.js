import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import ClickEffect from "@/components/ClickEffect";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Robiul Hasan Resad | Hafiz, Islamic Speaker & Youth Counselor",
  description: "Official portfolio of Robiul Hasan Resad. Promoting spiritual growth, Quranic recitation with Tajweed, classical Islamic jurisprudence, and modern youth counseling.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning={true} className="min-h-full flex flex-col relative">
        {/* Grain overlay for cinematic aesthetic */}
        <div className="grain-overlay" />
        
        {/* Global luxurious mouse click ripple and particle effect */}
        <ClickEffect />
        
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
