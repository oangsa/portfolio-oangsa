import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/utils/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/profile"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
