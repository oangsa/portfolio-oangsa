'use client'

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import ThemeToggles from "@/app/providers/ThemeToggles";
import { usePathname } from "next/navigation";

export default function App() {
  const pathname = usePathname()

  console.log(pathname == '/aboutme')
  
  return (
    <Navbar
      maxWidth={'full'}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand>
        <p className="font-bold text-inherit">SUTHANG</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link className={pathname == '/projects' ? "text-blue-500 text-bold" : "text-dark"} href="#">
            Projects
          </Link>
        </NavbarItem>
        <NavbarItem className={pathname == '/aboutme' ? "text-blue-500 text-bold" : "text-dark hover: text-sm "}>
          <Link className="text-dark" href="/aboutme" aria-current="page">
            About Me
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeToggles/>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}