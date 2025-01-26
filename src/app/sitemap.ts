import { baseUrl } from "@/lib/env";
import type { MetadataRoute } from "next";

const url = baseUrl;
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
