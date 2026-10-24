import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/portal/*", "/settings"],
    },
    sitemap: "https://bellezza.agency/sitemap.xml",
  };
}
