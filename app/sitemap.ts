import type { MetadataRoute } from "next";

const base = "https://peicare.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/services",
    "/eyewear",
    "/reviews",
    "/payments-insurance",
    "/patient-resources",
    "/contact",
    "/book",
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/book" ? 0.9 : 0.7,
  }));
}
