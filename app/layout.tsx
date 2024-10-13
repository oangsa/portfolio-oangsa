import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google" 
import "./globals.css";
import {Providers} from "./providers/providers";
import Navbar from "@/components/navbar";

const kanit = Roboto_Mono({ 
  subsets:["latin"], 
  weight: ["100", "200", "300", "400", "500", "600", "700"] 
})

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
