import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Providers} from "./providers/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { rootMetadata } from "@/utils/seo";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  display: "optional",
  variable: "--font-geist",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  display: "optional",
  preload: false,
  variable: "--font-geist-mono",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <Providers>
          <Navbar />
        </Providers>
        {children}
        <Footer />
      </body>
    </html>
  );
}
