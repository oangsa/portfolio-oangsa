import { describe, expect, it } from "vitest";
import nextConfig from "../next.config.mjs";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { caseStudyProjects } from "@/utils/data";
import {
  homeJsonLd,
  pageLastModified,
  profileJsonLd,
  profileMetadata,
  projectJsonLd,
  projectMetadata,
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

  it("gives every project a canonical page and an appropriate project entity", () => {
    for (const project of caseStudyProjects) {
      const path = `/projects/${project.slug}`;
      const pageUrl = `https://me.oangsa.com${path}`;
      const schemaType = project.caseStudy.schemaType ?? "SoftwareSourceCode";
      const projectEntityId = `${pageUrl}#${schemaType === "CreativeWork" ? "creative-work" : "software-source-code"}`;

      expect(projectMetadata(project).alternates).toEqual({ canonical: path });
      expect(projectMetadata(project)).not.toHaveProperty("keywords");
      expect(projectMetadata(project).openGraph).toMatchObject({
        type: "article",
        url: path,
      });
      const jsonLd = projectJsonLd(project);

      expect(jsonLd).toMatchObject({
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            dateModified: project.caseStudy.lastModified,
            mainEntity: { "@id": projectEntityId },
          },
          {
            "@type": schemaType,
            "@id": projectEntityId,
            name: project.name,
            author: { "@id": "https://me.oangsa.com/#person" },
            mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
          },
        ],
      });

      const projectEntity = jsonLd["@graph"][1];
      expect(projectEntity).not.toHaveProperty("dateModified");
      expect(projectEntity).not.toHaveProperty("programmingLanguage");

      if (project.links?.length) {
        expect(projectEntity).toMatchObject({
          codeRepository: project.links.map((link) => link.href),
        });
      } else {
        expect(projectEntity).not.toHaveProperty("codeRepository");
      }
    }
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

  it("publishes canonical pages with stable content dates", () => {
    const entries = sitemap();

    expect(entries.map(({ url }) => url)).toEqual([
      "https://me.oangsa.com/",
      "https://me.oangsa.com/profile",
      "https://me.oangsa.com/projects/codetice",
      "https://me.oangsa.com/projects/maintenance-tracking-system",
      "https://me.oangsa.com/projects/inventory-management-system",
      "https://me.oangsa.com/projects/hospital-system",
      "https://me.oangsa.com/projects/treasure-hunt-robot",
      "https://me.oangsa.com/projects/brainrot-interpreter",
      "https://me.oangsa.com/projects/sandwich-bot",
      "https://me.oangsa.com/projects/to-be-number-one-website",
    ]);
    expect(entries[0]?.lastModified).toBe(pageLastModified.home);
    expect(entries[1]?.lastModified).toBe(pageLastModified.profile);
    expect(entries.slice(2).map(({ lastModified }) => lastModified)).toEqual(
      caseStudyProjects.map((project) => project.caseStudy.lastModified),
    );
    for (const entry of entries) {
      expect(entry).not.toHaveProperty("changeFrequency");
      expect(entry).not.toHaveProperty("priority");
    }
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
