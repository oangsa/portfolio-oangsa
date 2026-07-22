import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Providers} from "./providers/providers";
import Navbar from "@/components/navbar";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Suthang Sukrueangkun — Computer Engineering Student",
  description: "Portfolio of Suthang Sukrueangkun, a computer engineering student building software, embedded systems, and web projects.",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistMono.className}>
        <Providers>
          <Navbar  />
          {children}
        </Providers>
      </body>
    </html>
  );
}
