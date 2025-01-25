import type { Metadata, Viewport } from "next";
import { Lato, Poppins } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/typography.css";
import { ThemeProvider } from "@/components/molecules/theme-provider";
import type { PropsWithChildren } from "react";

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-poppins",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const lato = Lato({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-lato",
	weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
	title: "10K Step Path Generator - Achieve Your Daily Step Goal with Ease",
	description:
		"Generate a customized looped path to effortlessly reach your daily 10,000 steps goal. Our app helps you stay active and healthy by providing optimized walking routes tailored to your preferences.",
	manifest: "/assets/site.webmanifest",
	applicationName: "10K Step Path Generator",
	icons: [
		{
			rel: "apple-touch-icon",
			sizes: "180x180",
			url: "/assets/apple-touch-icon.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "32x32",
			url: "/assets/favicon-32x32.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "16x16",
			url: "/assets/favicon-16x16.png",
		},
	],
};
export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1.0,
	maximumScale: 1.0,
	userScalable: false,
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<html lang="en">
			<body className={`${lato.variable} ${poppins.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
