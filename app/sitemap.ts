import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/aydin-psikolog",
    "/hakkinda",
    "/hizmetler",
    "/icerikler",
    "/randevu",
    "/iletisim",
    "/kvkk",
    "/gizlilik"
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date()
  }));
}
