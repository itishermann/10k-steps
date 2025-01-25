"use client";

import { Toaster } from "@/components/atoms/sonner";
import { LoadingScreen } from "@/components/molecules/loading-screen";
// @ts-expect-error - This fixes the hydratation warning issue @see https://github.com/shadcn-ui/ui/issues/5552
import type { ThemeProviderProps } from "next-themes/dist/types";
import dynamic from "next/dynamic";

const NextThemesProvider = dynamic(
	() => import("next-themes").then((e) => e.ThemeProvider),
	{
		ssr: false,
		loading: () => <LoadingScreen />,
	},
);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider {...props}>
			{children}
			<Toaster richColors position="top-center" />
		</NextThemesProvider>
	);
}
