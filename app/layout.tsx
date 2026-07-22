import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Providers} from "./providers/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  display: "swap",
  variable: "--font-geist",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Suthang Sukrueangkun — Full-Stack Developer & Computer Engineering Student",
  description: "Portfolio of Suthang Sukrueangkun, a full-stack developer and computer engineering student experienced with .NET, React, Next.js, and data-backed applications.",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
