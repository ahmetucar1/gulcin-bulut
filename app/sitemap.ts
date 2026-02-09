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
    "/gizlilik",
    "/en",
    "/en/hakkinda",
    "/en/hizmetler",
    "/en/icerikler",
    "/en/randevu",
    "/en/iletisim",
    "/en/kvkk",
    "/en/gizlilik"
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date()
  }));
}
