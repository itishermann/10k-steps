import { Spinner } from "@/components/atoms/spinner";
import * as React from "react";

export function LoadingScreen() {
	return (
		<div className="h-screen w-screen flex items-center justify-center flex-col gap-4">
			<img
				src="/assets/logo.png"
				width={150}
				height={150}
				alt="10K Step Path Generator Logo"
			/>
			<Spinner show size="large" />
			<h3 className="text-center">Loading...</h3>
		</div>
	);
}
