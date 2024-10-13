'use client'

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import ThemeToggles from "@/app/providers/ThemeToggles";
import { usePathname, redirect } from "next/navigation";
import NextLink from "next/link";

export default function App() {
  const pathname = usePathname()

  const pathMap: Record<string, string> = {
    "/aboutme": "About Me",
    "/projects": "Projects",
    "/": "Home",
  }
  
  return (
    <Navbar
      maxWidth={'full'}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
        ],
      }}
    >
      <NavbarBrand>
        <p className="font-bold text-2xl text-accent">{pathMap[pathname]}</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <NextLink href={"/"} className={pathname == '/' ? "text-accent text-bold" : "text-dark hover:text-accent_hover hover:text-xl hover:transition-all duration-200"}  aria-current="page">
            Home
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <NextLink href={"/aboutme"} className={pathname == '/aboutme' ? "text-accent text-bold" : "text-dark hover:text-accent_hover hover:text-xl hover:transition-all duration-200"}  aria-current="page">
            About Me
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <NextLink href={"/projects"} className={pathname == '/projects' ? "text-accent text-bold" : "text-dark hover:text-accent_hover hover:text-xl hover:transition-all duration-200"}>
            Projects
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <ThemeToggles/>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}