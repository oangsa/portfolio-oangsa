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
  notFound: () => {
    throw new Error("Unexpected notFound call");
  },
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
import ProjectPage from "@/app/projects/[slug]/page";
import { getProjectBySlug } from "@/utils/data";

describe("runtime rendering contracts", () => {
  it("renders identical initial Navbar markup before and after the browser resolves the theme", () => {
    themeState.resolvedTheme = undefined;
    const serverMarkup = renderToString(<Navbar />);

    themeState.resolvedTheme = "dark";
    const clientMarkup = renderToString(<Navbar />);

    expect(clientMarkup).toBe(serverMarkup);
  });

  it("renders one shared blurred route indicator for the current navigation item", () => {
    const markup = renderToString(<Navbar />);
    const indicators = markup.match(/class="nav-active-indicator"/g) ?? [];
    const navbarSource = readFileSync("components/navbar.tsx", "utf8");
    const globalStyles = readFileSync("app/globals.css", "utf8");

    expect(indicators).toHaveLength(1);
    expect(navbarSource).toContain("duration: reduceMotion ? 0 : 0.25");
    expect(navbarSource).toContain("ease: [0.25, 1, 0.5, 1]");
    expect(globalStyles).toContain(".nav-active-indicator");
    expect(globalStyles).toContain("backdrop-filter: blur(var(--space-sm))");
    expect(globalStyles).not.toContain(".nav-link::before");
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

  it("keeps GitHub repository and commit stats on the home page", () => {
    const homePage = readFileSync("app/page.tsx", "utf8");
    const statsComponent = readFileSync("components/stats.tsx", "utf8");

    expect(homePage).toContain('import Stats from "@/components/stats"');
    expect(homePage).toContain("<Stats />");
    expect(statsComponent).toContain("Public repositories");
    expect(statsComponent).toContain("Authored commits");
    expect(statsComponent).toContain("function CountUp");
    expect(statsComponent).toContain("useReducedMotion");
  });

  it("publishes concise repository-backed architecture without the removed sections", async () => {
    const project = getProjectBySlug("codetice");

    if (!project) {
      throw new Error("Codetice test data is required");
    }
    const architecture = project.caseStudy.architecture?.[0];

    if (!architecture) {
      throw new Error("Codetice architecture is required");
    }

    const page = await ProjectPage({ params: Promise.resolve({ slug: project.slug }) });
    const markup = renderToString(page);

    expect(markup).toContain("Architecture");
    expect(markup).toContain(architecture.detail);
    expect(markup).not.toContain("Key decisions");
    expect(markup).not.toContain("Challenges");
  });
});
