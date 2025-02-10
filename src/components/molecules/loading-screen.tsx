import { Spinner } from "@/components/atoms/spinner";
import * as React from "react";

interface LoadingScreenProps {
	withLogo?: boolean;
	withText?: boolean;
	text?: string;
}

export function LoadingScreen({
	withLogo = true,
	withText = true,
	text = "Loading...",
}: LoadingScreenProps) {
	return (
		<div className="h-screen w-screen flex items-center justify-center flex-col gap-4">
			{withLogo && (
				<img
					src="/logo.png"
					width={150}
					height={150}
					alt="10K Step Path Generator Logo"
				/>
			)}
			<Spinner show size="large" />
			{withText && <h3 className="text-center">{text}</h3>}
		</div>
	);
}
