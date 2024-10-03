import type { Metadata } from "next";
import { Kanit } from "next/font/google" 
import "./globals.css";
import Navbar from "@/components/navbar";
import {Providers} from "./providers/providers";

const kanit = Kanit({ weight:['400'], subsets:["latin", "thai"] })

export const metadata: Metadata = {
  title: "Portfolio App",
  description: "This website is for CPE101 assignment.",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${kanit.className}`}>
        <Providers>
          <Navbar  />
          {children}
        </Providers>
      </body>
    </html>
  );
}
