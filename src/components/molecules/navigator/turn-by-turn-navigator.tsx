"use client";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/atoms/resizable";
import { UserGeolocationControl } from "@/components/molecules/map/user-geolocation-control";
import { InstructionCarousel } from "@/components/molecules/navigator/instruction-carousel";
import { InstructionHighlighter } from "@/components/molecules/navigator/instruction-highlighter";
import { UserLocationDispatcher } from "@/components/molecules/navigator/user-location-dispatcher";
import { RouteHotline } from "@/components/molecules/route-manager/route-hotline";
import type { Route } from "@/lib/entities/route";
import { LatLngBounds } from "leaflet";
import type * as React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

interface TurnByTurnNavigatorProps {
	route: Route;
}

export function TurnByTurnNavigator({ route }: TurnByTurnNavigatorProps) {
	const startingPoint = route.coordinates[0];
	const bounds = route.geojson.bbox
		? new LatLngBounds([
				[route.geojson.bbox[1], route.geojson.bbox[0]],
				[route.geojson.bbox[4] as number, route.geojson.bbox[3]],
			])
		: undefined;
	return (
		<main className="h-screen w-screen">
			<ResizablePanelGroup direction="vertical" className="h-full w-full">
				<ResizablePanel maxSize={70} minSize={50} defaultSize={70}>
					<MapContainer
						center={[startingPoint.lat, startingPoint.lng]}
						bounds={bounds}
						scrollWheelZoom
						className="h-full w-full"
						id="turn-by-turn-navigator-map"
					>
						<InstructionHighlighter />
						<UserLocationDispatcher />
						<UserGeolocationControl enableHighAccuracy watch />
						<RouteHotline
							coordinates={route.coordinates}
							minElevation={route.minElevation}
							maxElevation={route.maxElevation}
							originLatitude={route.originLatitude}
							originLongitude={route.originLongitude}
						/>
						<TileLayer
							attribution='&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Built by <a target="_blank" href="https://itishermann.me">Hermann Kao</a>'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
					</MapContainer>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel minSize={30} maxSize={50} defaultSize={30}>
					<div className="flex h-full items-center justify-center p-6 flex-col">
						<span className="font-semibold">Instructions</span>
						<InstructionCarousel geojson={route.geojson} />
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</main>
	);
}
