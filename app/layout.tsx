import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import "../app/globals.css";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Joseph.co | Premium Cleaning Services",
  description: "Immaculate Standards for Discerning Spaces. Professional cleaning services for luxury residential and commercial environments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
