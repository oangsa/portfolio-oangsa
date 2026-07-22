"use client";

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

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <header className="site-header">
      <nav className="nav-pill" aria-label="Primary navigation">
        <NextLink href="/" className="wordmark" onClick={() => setIsMenuOpen(false)}>
          Suthang<span aria-hidden="true">.</span>
        </NextLink>

        <div className="nav-links">
          {navigation.map(({ href, label }) => {
            const isCurrent = pathname === href;

            return (
              <NextLink
                key={href}
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                className="nav-link"
              >
                {isCurrent ? (
                  <span
                    className="nav-active-indicator"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="nav-link-label">{label}</span>
              </NextLink>
            );
          })}
        </div>

        <div className="nav-actions">
          <button
            type="button"
            onClick={() => setTheme(nextTheme)}
            className="icon-button"
            aria-label="Toggle color theme"
          >
            <MoonIcon className="theme-icon-light" />
            <SunIcon className="theme-icon-dark" />
          </button>
          <button
            type="button"
            className="menu-button"
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span aria-hidden="true">{isMenuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-navigation">
          <div>
            {navigation.map(({ href, label }) => {
              const isCurrent = pathname === href;

              return (
                <NextLink
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isCurrent ? "page" : undefined}
                  className="mobile-nav-link"
                >
                  {label}
                </NextLink>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
