"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import { LoadingScreen } from "@/components/molecules/loading-screen";
import { TurnByTurnNavigator } from "@/components/molecules/navigator/turn-by-turn-navigator";
import { Result } from "@/components/molecules/result";
import { db } from "@/lib/db";
import type { Route } from "@/lib/entities/route";
import { useEffect, useState } from "react";
import type * as React from "react";
import { toast } from "sonner";

export default function Navigation() {
	const searchParams = new URLSearchParams(window.location.search);
	const routeId = searchParams.get("routeId");
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

	if (!routeId) {
		return (
			<Result
				label="Route identifier not provided or is invalid"
				status="warning"
			/>
		);
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

	return <TurnByTurnNavigator route={route} />;
}
