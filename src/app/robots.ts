import { MetadataRoute } from "next";
import { VERIFIED_SITE_URL } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(VERIFIED_SITE_URL ? { sitemap: `${VERIFIED_SITE_URL}/sitemap.xml` } : {}),
  };
}
