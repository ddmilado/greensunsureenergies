import type { MetadataRoute } from "next";
import { listAllPostSlugs, listAllProjectSlugs } from "./lib/dal";

const BASE = "https://mainstreamgreenenergy.com.ng";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/residential-solar", priority: 0.9, changeFrequency: "monthly" },
    { path: "/commercial-solar", priority: 0.9, changeFrequency: "monthly" },
    { path: "/battery-backup", priority: 0.9, changeFrequency: "monthly" },
    { path: "/solar-maintenance", priority: 0.85, changeFrequency: "monthly" },
    { path: "/solar-installation-ogun-state", priority: 0.9, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.8, changeFrequency: "weekly" },
    { path: "/our-blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact-us", priority: 0.8, changeFrequency: "monthly" },
    { path: "/store", priority: 0.8, changeFrequency: "daily" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const [projectSlugs, postSlugs] = await Promise.all([listAllProjectSlugs(), listAllPostSlugs()]);
  for (const slug of projectSlugs) {
    entries.push({ url: `${BASE}/projects/${slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }
  for (const slug of postSlugs) {
    entries.push({ url: `${BASE}/our-blog/${slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  }

  return entries;
}
