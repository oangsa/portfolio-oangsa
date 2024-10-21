'use client'

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, useSwitch, VisuallyHidden} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon } from "./Icons/moon";
import { SunIcon } from "./Icons/sun";

export default function App(props: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const pathname = usePathname()

  const pathMap: Record<string, string> = {
    "/aboutme": "About Me",
    "/projects": "Projects",
    "/": "Home",
    "/educations": "Educations",
  }

  const {
    Component, 
    slots, 
    isSelected, 
    getBaseProps, 
    getInputProps, 
    getWrapperProps
  } = useSwitch(props);

  const { theme, setTheme } = useTheme()

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
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-2xl dark:text-accent text-bold text-dark_accent">{pathMap[pathname]}</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <NextLink href={"/"} className={pathname == '/' ? "dark:text-accent font-bold  text-dark_accent" : "text-dark hover:text-accent_hover hover:text-xl hover:transition-all duration-200"}  aria-current="page">
            Home
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <NextLink href={"/educations"} className={pathname == '/educations' ? "dark:text-accent font-bold text-dark_accent" : "text-dark hover:text-accent_hover hover:text-xl hover:transition-all duration-200"}  aria-current="page">
            Educations
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <div className="flex flex-col gap-2">
            <Component {...getBaseProps()}>
                <VisuallyHidden>
                  <input {...getInputProps()} />
                </VisuallyHidden>
                <div
                  {...getWrapperProps()}
                  className={slots.wrapper({
                    class: [
                      "w-8 h-8",
                      "flex items-center justify-center",
                      "rounded-lg bg-default-100 hover:bg-default-200",
                    ],
                  })}
                >
                  {isSelected ? <SunIcon/> : <MoonIcon/>}
                </div>
                {setTheme(isSelected ? 'light' : 'dark')}
            </Component>
          </div>
        </NavbarItem>
        {/* Menu For Smaller Phone */}
        <NavbarMenu>
          <NavbarMenuItem>
            <NextLink href={"/"} className={pathname == '/' ? "dark:text-accent font-bold  text-dark_accent" : "text-dark hover:text-accent_hover hover:text-xl hover:transition-all duration-200"}  aria-current="page">
              Home
            </NextLink>
          </NavbarMenuItem>
          <NavbarMenuItem >
            <NextLink href={"/educations"} className={pathname == '/educations' ? "dark:text-accent font-bold text-dark_accent" : "text-dark hover:text-accent_hover hover:text-xl hover:transition-all duration-200"}  aria-current="page">
              Educations
            </NextLink>
          </NavbarMenuItem>
          <NavbarMenuItem >
            <div className="flex flex-col gap-2">
              <Component {...getBaseProps()}>
                <VisuallyHidden>
                  <input {...getInputProps()} />
                </VisuallyHidden>
                <div
                  {...getWrapperProps()}
                  className={slots.wrapper({
                    class: [
                      "w-8 h-8",
                      "flex items-center justify-center",
                      "rounded-lg bg-default-100 hover:bg-default-200",
                    ],
                  })}
                >
                  {isSelected ? <SunIcon/> : <MoonIcon/>}
                </div>
                {setTheme(isSelected ? 'light' : 'dark')}
              </Component>
            </div>
          </NavbarMenuItem>
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
}