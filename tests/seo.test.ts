import { describe, expect, it } from "vitest";
import nextConfig from "../next.config.mjs";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import {
  homeJsonLd,
  profileJsonLd,
  profileMetadata,
  rootMetadata,
  siteConfig,
} from "@/utils/seo";

describe("SEO metadata", () => {
  it("uses the branded domain consistently", () => {
    expect(rootMetadata.metadataBase?.toString()).toBe(`${siteConfig.url}/`);
    expect(rootMetadata.alternates).toEqual({ canonical: "/" });
    expect(profileMetadata.alternates).toEqual({ canonical: "/profile" });
    expect(rootMetadata.openGraph).toMatchObject({
      url: "/",
      siteName: siteConfig.name,
    });
    expect(profileMetadata.openGraph).toMatchObject({ url: "/profile" });
  });

  it("identifies Suthang and Oangsa as the same public person", () => {
    expect(homeJsonLd["@graph"]).toEqual(expect.arrayContaining([
      expect.objectContaining({
        "@type": "WebSite",
        name: "Suthang Sukrueangkun",
        alternateName: expect.arrayContaining(["Oangsa", "me.oangsa.com"]),
      }),
      expect.objectContaining({
        "@type": "Person",
        name: "Suthang Sukrueangkun",
        alternateName: "Oangsa",
      }),
    ]));
    expect(profileJsonLd).toMatchObject({
      "@type": "ProfilePage",
      url: "https://me.oangsa.com/profile",
      mainEntity: {
        "@type": "Person",
        name: "Suthang Sukrueangkun",
        alternateName: "Oangsa",
      },
    });
  });
});

describe("crawler discovery", () => {
  it("allows public pages, blocks API routes, and advertises the sitemap", () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
      sitemap: "https://me.oangsa.com/sitemap.xml",
      host: "https://me.oangsa.com",
    });
  });

  it("publishes only canonical public pages in the sitemap", () => {
    expect(sitemap().map(({ url }) => url)).toEqual([
      "https://me.oangsa.com/",
      "https://me.oangsa.com/profile",
    ]);
  });

  it("permanently redirects legacy and Vercel URLs", async () => {
    if (!nextConfig.redirects) {
      throw new Error("Next.js redirects must be configured");
    }

    const redirects = await nextConfig.redirects();

    expect(redirects).toEqual(expect.arrayContaining([
      expect.objectContaining({
        source: "/aboutme",
        destination: "/profile",
        permanent: true,
      }),
      expect.objectContaining({
        source: "/:path*",
        has: [{ type: "host", value: "portfolio-oangsa.vercel.app" }],
        destination: "https://me.oangsa.com/:path*",
        permanent: true,
      }),
    ]));
  });
});
