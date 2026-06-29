import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumière — Premium Essentials",
  description: "Discover curated premium products crafted for modern living. Quality you can feel, style you can trust.",
  keywords: ["premium", "e-commerce", "essentials", "lifestyle", "quality"],
  openGraph: {
    title: "Lumière — Premium Essentials",
    description: "Discover curated premium products crafted for modern living.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="bg-[#fafaf9] text-[#111111] antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}