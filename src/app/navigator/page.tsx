"use client";
import { LoadingScreen } from "@/components/molecules/loading-screen";
import { Result } from "@/components/molecules/result";
import { db } from "@/lib/db";
import type { Route } from "@/lib/entities/route";
import { use, useEffect, useState } from "react";
import type * as React from "react";
import { toast } from "sonner";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function Navigation(props: {
	searchParams: SearchParams;
}) {
	const searchParams = use(props.searchParams);
	const routeId = searchParams.routeId;
	const [loading, setLoading] = useState(true);
	const [route, setRoute] = useState<Route | null>(null);

	const getRoute = async (routeId: string) => {
		setLoading(true);
		try {
			const d = await db.route.get(routeId);
			if (!d) {
				toast.error(`Route with id: ${routeId} not found`);
				return;
			}
			setRoute(d);
		} catch (error) {
			toast.error(`Failed to load route with id: ${routeId}`);
		} finally {
			setLoading(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: this is used as a componentDidMount and should only run once and also when routeId changes
	useEffect(() => {
		if (routeId && typeof routeId === "string") {
			getRoute(routeId);
		}
	}, [routeId]);

	if (!routeId || typeof routeId !== "string") {
		return <Result label="Route identifier not provided" status="warning" />;
	}

	if (loading) {
		return <LoadingScreen withLogo={false} text="Loading your route" />;
	}

	if (!route) {
		return (
			<Result
				label="Failed to load route"
				description="The route you are looking for could not be found, you may have used a link from another device/browser or the route may have been deleted"
				status="error"
			/>
		);
	}

	return (
		<Result
			label="Coming soon"
			status="info"
			description="Soon you will be able to navigate a generate path using this page"
		/>
	);
}
