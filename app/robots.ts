import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://ukraine-frontline-tracker.vercel.app/sitemap.xml" };
}
