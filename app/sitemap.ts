import type { MetadataRoute } from "next";
import { promises as fs } from "fs";
import path from "path";
const BASE_URL = "https://ukraine-frontline-tracker.vercel.app";
const LOCALES = ["en", "ar", "zh", "ru", "fr", "de", "es", "uk"];
type Region = { slug: string };
type Snapshot = { date: string };
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [regionsRaw, frontlineRaw] = await Promise.all([
    fs.readFile(path.join(process.cwd(), "public/data/regions.json"), "utf-8"),
    fs.readFile(path.join(process.cwd(), "public/data/frontline.json"), "utf-8"),
  ]);
  const regions: Region[] = JSON.parse(regionsRaw);
  const snapshots: Snapshot[] = JSON.parse(frontlineRaw).snapshots;
  const routes = [
    "", "/about",
    "/ukraine-frontline", "/ukraine-war-map-today",
    "/ukraine-frontline-change", "/ukraine-frontline-tracker",
    ...regions.map((r) => `/region/${r.slug}`),
    ...snapshots.map((s) => `/archive/${s.date}`),
  ];
  return LOCALES.flatMap((locale) =>
    routes.map((r) => ({ url: `${BASE_URL}/${locale}${r}`, lastModified: new Date("2026-04-14"), changeFrequency: "daily" as const, priority: r === "" ? 1 : 0.8 }))
  );
}
