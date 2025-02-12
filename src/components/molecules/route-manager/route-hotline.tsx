import { routeStartingPointIcon } from "@/components/molecules/route-manager/route-starting-point-icon";
import type * as React from "react";
import { Marker, Popup } from "react-leaflet";
import { Hotline } from "react-leaflet-hotline";

interface RouteHotlineProps {
	coordinates: { lat: number; lng: number; value: number }[];
	minElevation: number;
	maxElevation: number;
	originLatitude: number;
	originLongitude: number;
}

export function RouteHotline({
	coordinates,
	minElevation,
	maxElevation,
	originLatitude,
	originLongitude,
}: RouteHotlineProps) {
	return (
		<>
			<Hotline
				data={coordinates}
				getLat={({ point }) => point.lat}
				getLng={({ point }) => point.lng}
				getVal={({ point }) => point.value}
				options={{
					min: minElevation,
					max: maxElevation,
				}}
			/>
			<Marker
				position={{
					lat: originLatitude,
					lng: originLongitude,
				}}
				icon={routeStartingPointIcon}
			>
				<Popup>This is the starting point.</Popup>
			</Marker>
		</>
	);
}
