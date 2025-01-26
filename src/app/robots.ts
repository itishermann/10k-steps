import { baseUrl } from "@/lib/env";
import type { MetadataRoute } from "next";

const url = baseUrl;
const sitemapUrl = new URL("/sitemap.xml", url);
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/", // Allow all robots to access all pages
		},
		sitemap: sitemapUrl.toString(),
	};
}
