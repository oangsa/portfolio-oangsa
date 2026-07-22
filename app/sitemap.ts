import type { MetadataRoute } from "next";
import { caseStudyProjects } from "@/utils/data";
import { absoluteUrl, pageLastModified } from "@/utils/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = caseStudyProjects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: project.caseStudy.lastModified,
  }));

  return [
    {
      url: absoluteUrl(),
      lastModified: pageLastModified.home,
    },
    {
      url: absoluteUrl("/profile"),
      lastModified: pageLastModified.profile,
    },
    ...projectEntries,
  ];
}
