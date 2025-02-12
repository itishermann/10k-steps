"use client";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/atoms/resizable";
import { UserGeolocationControl } from "@/components/molecules/map/user-geolocation-control";
import type { Route } from "@/lib/entities/route";
import { LatLngBounds } from "leaflet";
import type * as React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Hotline } from "react-leaflet-hotline";

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
				<ResizablePanel minSize={25} defaultSize={75}>
					<MapContainer
						center={[startingPoint.lat, startingPoint.lng]}
						// zoom={13}
						bounds={bounds}
						scrollWheelZoom
						className="h-full w-full"
					>
						<UserGeolocationControl />
						<Hotline
							data={route.coordinates}
							getLat={({ point }) => point.lat}
							getLng={({ point }) => point.lng}
							getVal={({ point }) => point.value}
							options={{
								min: route.minElevation,
								max: route.maxElevation,
							}}
						/>
						<TileLayer
							attribution='&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Built by <a target="_blank" href="https://itishermann.me">Hermann Kao</a>'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
					</MapContainer>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel minSize={20} defaultSize={25}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="font-semibold">Instructions</span>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</main>
	);
}
