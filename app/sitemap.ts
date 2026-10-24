import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bellezza.agency";
  const routes = [
    "",
    "/login",
    "/dashboard",
    "/clients",
    "/pipeline",
    "/requirements",
    "/invoices",
    "/payments",
    "/receivables",
    "/automation",
    "/tasks",
    "/calendar",
    "/communications",
    "/reports",
    "/catalog",
    "/expenses",
    "/team",
    "/settings",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" || route === "/dashboard" ? 1.0 : 0.8,
  }));
}
