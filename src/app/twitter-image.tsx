import { SocialMediaImageBase } from "@/components/molecules/social-media-image-base";
import { loadGoogleFont } from "@/lib/load-google-font";
import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const alt = "10k Steps Path Generator";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";
export const dynamic = "force-static";

export default async function Image() {
	return new ImageResponse(<SocialMediaImageBase title={alt} />, {
		fonts: [
			{
				name: "Poppins",
				data: await loadGoogleFont("Poppins", alt),
				style: "normal",
			},
		],
		emoji: "fluent",
	});
}
