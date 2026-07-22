import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { renderToString } from "react-dom/server";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

const themeState = vi.hoisted((): { resolvedTheme: string | undefined } => ({
  resolvedTheme: undefined,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: themeState.resolvedTheme,
    setTheme: vi.fn(),
  }),
}));

vi.mock("next/link", async () => {
  const { createElement } = await import("react");

  return {
    default: ({ children, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; href: string }) =>
      createElement("a", { href, ...props }, children),
  };
});

import Navbar from "@/components/navbar";

describe("runtime rendering contracts", () => {
  it("renders identical initial Navbar markup before and after the browser resolves the theme", () => {
    themeState.resolvedTheme = undefined;
    const serverMarkup = renderToString(<Navbar />);

    themeState.resolvedTheme = "dark";
    const clientMarkup = renderToString(<Navbar />);

    expect(clientMarkup).toBe(serverMarkup);
  });

  it("allows the portrait image quality used by next/image", async () => {
    const { default: nextConfig } = await import(pathToFileURL(resolve("next.config.mjs")).href);

    expect(nextConfig.images?.qualities).toContain(90);
  });

  it("declares smooth scrolling to the Next.js router", () => {
    const rootLayout = readFileSync("app/layout.tsx", "utf8");

    expect(rootLayout).toContain('data-scroll-behavior="smooth"');
  });

  it("uses wide desktop viewports without burying the next section below the fold", () => {
    const tokens = readFileSync("tokens.css", "utf8");
    const globalStyles = readFileSync("app/globals.css", "utf8");
    const pageWidth = Number(tokens.match(/--page-width:\s*([\d.]+)rem/)?.[1]);
    const heroHeightCap = Number(globalStyles.match(/\.home-hero\s*\{[\s\S]*?min-height:\s*min\(([\d.]+)rem/)?.[1]);
    const screenshotViewportWidth = 1780;

    expect((pageWidth * 16) / screenshotViewportWidth).toBeGreaterThanOrEqual(0.8);
    expect(heroHeightCap).toBeLessThanOrEqual(40);
  });
});
