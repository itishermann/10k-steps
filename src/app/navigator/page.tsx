"use client";
import { db } from "@/lib/db";
import type { Route } from "@/lib/entities/route";
import { use, useEffect, useState } from "react";
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
		return <div>RouteId not provided</div>;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!route) {
		return <div>Failed to load route</div>;
	}

	return <div>Comming soon</div>;
}
