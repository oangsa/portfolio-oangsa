'use client'

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";
import { MoonIcon } from "./Icons/moon";
import { SunIcon } from "./Icons/sun";
import { navigation } from "@/utils/site";

export default function Navbar(): JSX.Element {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentPage = navigation.find(({ href }) => href === pathname)?.label ?? "Portfolio";
  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  const themeToggle = (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 transition-colors hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15"
      aria-label={resolvedTheme ? `Switch to ${nextTheme} theme` : "Toggle color theme"}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f0f0f5]/90 backdrop-blur dark:border-white/10 dark:bg-[#1c1c22]/90">
      <div className="container mx-auto flex min-h-16 items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg sm:hidden"
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              {isMenuOpen ? "×" : "☰"}
            </span>
          </button>
          <p className="text-2xl font-bold text-dark_accent dark:text-accent">{currentPage}</p>
        </div>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 sm:flex">
          {navigation.map(({ href, label }) => {
            const isCurrent = pathname === href;

            return (
              <NextLink
                key={href}
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                className={isCurrent
                  ? "font-bold text-dark_accent dark:text-accent"
                  : "transition-colors hover:text-dark_accent dark:hover:text-accent"}
              >
                {label}
              </NextLink>
            );
          })}
          {themeToggle}
        </nav>
      </div>

      {isMenuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="container mx-auto pb-4 sm:hidden">
          <div className="flex flex-col gap-2 rounded-xl border border-black/10 bg-white/60 p-3 dark:border-white/10 dark:bg-white/5">
            {navigation.map(({ href, label }) => {
              const isCurrent = pathname === href;

              return (
                <NextLink
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isCurrent ? "page" : undefined}
                  className={isCurrent
                    ? "rounded-lg bg-black/5 px-3 py-2 font-bold text-dark_accent dark:bg-white/10 dark:text-accent"
                    : "rounded-lg px-3 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"}
                >
                  {label}
                </NextLink>
              );
            })}
            <div className="px-1 pt-1">{themeToggle}</div>
          </div>
        </nav>
      )}
    </header>
  );
}
