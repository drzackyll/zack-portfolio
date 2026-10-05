import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { hankenGrotesk, jetbrainsMono, sourceSerif } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zack Adams — Product-minded engineer",
  description: "Product lead and senior engineer building data and AI tools for people making fast, high-stakes decisions.",
  icons: { icon: "/images/monogram.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-canvas font-sans text-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
