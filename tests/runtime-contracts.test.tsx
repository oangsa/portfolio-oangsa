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
import ProjectsCarousel from "@/components/projectsCarousel";
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

  it("keeps primary navigation edge-aligned with one alternate route", () => {
    const markup = renderToString(<Navbar />);
    const navbarSource = readFileSync("components/navbar.tsx", "utf8");
    const globalStyles = readFileSync("app/globals.css", "utf8");
    const tokens = readFileSync("tokens.css", "utf8");

    expect(markup).toContain('class="nav-edge shell"');
    expect(markup).toContain('class="nav-route-link"');
    expect(markup).toContain('href="/profile"');
    expect(markup).not.toContain("mobile-navigation");
    expect(navbarSource).not.toContain("framer-motion");
    expect(navbarSource).not.toContain("useState");
    expect(globalStyles).toContain(".nav-edge");
    expect(globalStyles).toContain("justify-content: space-between");
    expect(tokens).toContain("--z-sticky-nav");
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
    expect(statsComponent).toContain("requestAnimationFrame");
    expect(statsComponent).toContain("prefers-reduced-motion: reduce");
    expect(statsComponent).not.toContain("framer-motion");
  });

  it("keeps critical paint independent of animation code and slow font swaps", () => {
    const rootLayout = readFileSync("app/layout.tsx", "utf8");
    const photoSource = readFileSync("components/photo.tsx", "utf8");
    const globalStyles = readFileSync("app/globals.css", "utf8");

    expect(rootLayout).toContain('display: "optional"');
    expect(rootLayout).toContain("preload: false");
    expect(photoSource).not.toContain('"use client"');
    expect(photoSource).not.toContain("framer-motion");
    expect(globalStyles).toContain("animation: photo-settle");
    expect(globalStyles).toContain("animation: none !important");
  });

  it("gives project carousel slides enough time to read as a deliberate transition", () => {
    const tokens = readFileSync("tokens.css", "utf8");
    const globalStyles = readFileSync("app/globals.css", "utf8");
    const animationToken = globalStyles.match(
      /\.projects-carousel-page\.is-current\.is-forward\s*\{[\s\S]*?animation:\s*projects-carousel-enter-forward\s+var\((--[\w-]+)\)/,
    )?.[1];
    const duration = animationToken
      ? Number(tokens.match(new RegExp(`${animationToken}:\\s*(\\d+)ms`))?.[1])
      : Number.NaN;

    expect(duration).toBeGreaterThanOrEqual(650);
    expect(duration).toBeLessThanOrEqual(900);
  });

  it("keeps carousel pages opaque while sliding so page changes cannot flash", () => {
    const globalStyles = readFileSync("app/globals.css", "utf8");
    const keyframesStart = globalStyles.indexOf(
      "@keyframes projects-carousel-enter-forward",
    );
    const keyframesEnd = globalStyles.indexOf(
      "@media (min-width: 60rem)",
      keyframesStart,
    );
    const swipeKeyframes = globalStyles.slice(keyframesStart, keyframesEnd);

    expect(keyframesStart).toBeGreaterThanOrEqual(0);
    expect(swipeKeyframes).not.toContain("opacity:");
  });

  it("moves outgoing and incoming carousel pages across the full viewport", () => {
    const carouselSource = readFileSync(
      "components/projectsCarousel.tsx",
      "utf8",
    );
    const globalStyles = readFileSync("app/globals.css", "utf8");

    expect(carouselSource).toContain("outgoingPageIndex");
    expect(carouselSource).toContain("is-outgoing");
    expect(globalStyles).toMatch(
      /\.projects-carousel-page\.is-current\.is-forward\s*\{[^}]*animation:\s*projects-carousel-enter-forward/,
    );
    expect(globalStyles).toMatch(
      /\.projects-carousel-page\.is-outgoing\.is-forward\s*\{[^}]*animation:\s*projects-carousel-exit-forward/,
    );
    expect(globalStyles).toMatch(
      /@keyframes projects-carousel-enter-forward\s*\{[\s\S]*?translateX\(100%\)/,
    );
    expect(globalStyles).toMatch(
      /@keyframes projects-carousel-exit-forward\s*\{[\s\S]*?translateX\(-100%\)/,
    );
  });

  it("keeps carousel arrows fixed in place while they are pressed", () => {
    const globalStyles = readFileSync("app/globals.css", "utf8");

    expect(globalStyles).toMatch(
      /\.projects-carousel-arrow:active,\s*\.projects-carousel-arrow\.is-active\s*\{[^}]*transform:\s*none;/,
    );
  });

  it("keeps carousel height stable so absolute arrows do not recenter between pages", () => {
    const globalStyles = readFileSync("app/globals.css", "utf8");
    const markup = renderToString(
      <ProjectsCarousel pageSize={2}>
        {Array.from({ length: 5 }, (_, index) => (
          <article key={index}>Project {index + 1}</article>
        ))}
      </ProjectsCarousel>,
    );

    expect(markup.match(/aria-roledescription="slide"/g)).toHaveLength(3);
    expect(markup).toContain('aria-label="Project page 2 of 3"');
    expect(globalStyles).toMatch(
      /\.projects-carousel-viewport\s*\{[^}]*display:\s*grid;/,
    );
    expect(globalStyles).toMatch(
      /\.projects-carousel-page\s*\{[^}]*grid-area:\s*1\s*\/\s*1;[^}]*visibility:\s*hidden;/,
    );
  });

  it("keeps focus on carousel controls so navigation cannot change the scroll position", () => {
    const carouselSource = readFileSync("components/projectsCarousel.tsx", "utf8");

    expect(carouselSource).not.toContain("shouldFocusAfterNavigation");
    expect(carouselSource).not.toMatch(/\.focus\(/);
  });

  it("uses one native swipeable project without carousel buttons on mobile", () => {
    const carouselSource = readFileSync("components/projectsCarousel.tsx", "utf8");
    const globalStyles = readFileSync("app/globals.css", "utf8");
    const mobileCarouselStyles = globalStyles.slice(
      globalStyles.lastIndexOf("/* Hallmark · mobile carousel:"),
    );

    expect(carouselSource).toContain(
      'export const PROJECTS_DESKTOP_MEDIA_QUERY = "(min-width: 40rem)"',
    );
    expect(carouselSource).toContain("!desktopViewportQuery.matches");
    expect(carouselSource).not.toContain("aria-hidden={isCurrentPage");
    expect(mobileCarouselStyles).toMatch(
      /\.projects-carousel-viewport\s*\{[^}]*overflow-x:\s*auto;[^}]*scroll-snap-type:\s*x mandatory;/,
    );
    expect(mobileCarouselStyles).toMatch(
      /\.projects-carousel \.project-card\s*\{[^}]*flex:\s*0 0 100%;[^}]*scroll-snap-align:\s*start;/,
    );
    expect(mobileCarouselStyles).toMatch(
      /\.projects-carousel-arrows\s*\{[^}]*display:\s*none;/,
    );
    expect(mobileCarouselStyles).toMatch(
      /@media \(min-width:\s*40rem\)[\s\S]*\.projects-carousel-arrows\s*\{[^}]*display:\s*flex;/,
    );
  });

  it("loops native mobile swipes through matching end sentinels", () => {
    const carouselSource = readFileSync("components/projectsCarousel.tsx", "utf8");
    const globalStyles = readFileSync("app/globals.css", "utf8");
    const mobileCarouselStyles = globalStyles.slice(
      globalStyles.lastIndexOf("/* Hallmark · mobile carousel:"),
    );

    expect(carouselSource).toContain('data-loop-clone="leading"');
    expect(carouselSource).toContain('data-loop-clone="trailing"');
    expect(carouselSource).toContain("viewport.scrollLeft =");
    expect(carouselSource).not.toContain("scrollIntoView");
    expect(mobileCarouselStyles).toMatch(
      /\.projects-carousel-mobile-clone\s*\{[^}]*flex:\s*0 0 100%;[^}]*scroll-snap-align:\s*start;/,
    );
    expect(mobileCarouselStyles).toMatch(
      /@media \(min-width:\s*40rem\)[\s\S]*\.projects-carousel-mobile-clone\s*\{[^}]*display:\s*none;/,
    );
  });

  it("shows two projects per controlled page above the mobile breakpoint", () => {
    const markup = renderToString(
      <ProjectsCarousel>
        {Array.from({ length: 5 }, (_, index) => (
          <article key={index}>Project {index + 1}</article>
        ))}
      </ProjectsCarousel>,
    );

    expect(markup).toContain("Showing projects <!-- -->1<!-- -->–<!-- -->2");
    expect(markup).toContain('aria-label="Show previous 2 projects"');
    expect(markup).toContain('aria-label="Show next 2 projects"');
    expect(markup.match(/aria-roledescription="slide"/g)).toHaveLength(3);
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
