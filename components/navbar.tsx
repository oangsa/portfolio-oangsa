"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { MoonIcon } from "./Icons/moon";
import { SunIcon } from "./Icons/sun";

export default function Navbar(): JSX.Element {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const routeDestination = pathname === "/profile"
    ? { href: "/", label: "Work" }
    : { href: "/profile", label: "Profile" };

  return (
    <header className="site-header">
      <nav className="nav-edge shell" aria-label="Primary navigation">
        <NextLink
          href="/"
          className="wordmark"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          Suthang<span aria-hidden="true">.</span>
        </NextLink>

        <div className="nav-edge-actions">
          <button
            type="button"
            onClick={() => setTheme(nextTheme)}
            className="icon-button"
            aria-label="Toggle color theme"
          >
            <MoonIcon className="theme-icon-light" />
            <SunIcon className="theme-icon-dark" />
          </button>
          <NextLink
            href={routeDestination.href}
            className="nav-route-link"
          >
            {routeDestination.label}<span aria-hidden="true">→</span>
          </NextLink>
        </div>
      </nav>
    </header>
  );
}
