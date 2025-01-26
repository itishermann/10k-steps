import type { MetadataRoute } from "next";

const url = new URL(
	process.env.CF_PAGES_URL ?? "https://10ksteps-itishermann.me",
);
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: url.toString(),
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
	];
}
