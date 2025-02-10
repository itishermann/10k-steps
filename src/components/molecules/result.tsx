import { Button } from "@/components/atoms/button";
import { CircleCheckBig, CircleX, Info, TriangleAlert } from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import type { ReactNode } from "react";

type Status = "success" | "error" | "info" | "warning";

interface ResultProps {
	status: Status;
	label: string;
	description?: string;
	actionPath?: string;
	actionLabel?: string;
}

const iconMap: Record<Status, ReactNode> = {
	success: (
		<CircleCheckBig className="h-11 w-11 rotate-0 scale-100 transition-all text-green-500" />
	),
	error: (
		<CircleX className="h-11 w-11 rotate-0 scale-100 transition-all text-red-500" />
	),
	info: (
		<Info className="h-11 w-11 rotate-0 scale-100 transition-all text-blue-500" />
	),
	warning: (
		<TriangleAlert className="h-11 w-11 rotate-0 scale-100 transition-all text-yellow-500" />
	),
};

export function Result({
	status,
	label,
	description,
	actionLabel = "Go back to home",
	actionPath = "/",
}: ResultProps) {
	const Icon = iconMap[status];
	return (
		<div className="h-screen w-screen flex items-center justify-center flex-col gap-4">
			{Icon}
			<h3 className="text-center">{label}</h3>
			{description && <p className="text-center">{description}</p>}
			<Button asChild variant="link">
				<Link
					href={{
						pathname: actionPath,
					}}
				>
					{actionLabel}
				</Link>
			</Button>
		</div>
	);
}
