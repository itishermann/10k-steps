import type { MetadataRoute } from "next";

const url = new URL(
	process.env.CF_PAGES_URL ?? "https://10ksteps-itishermann.me",
);
const sitemapUrl = new URL("/sitemap.xml", url);

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/", // Allow all robots to access all pages
		},
		sitemap: sitemapUrl.toString(),
	};
}
