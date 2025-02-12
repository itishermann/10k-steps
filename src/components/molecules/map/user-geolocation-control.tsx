"use client";
import { LocateControl } from "leaflet.locatecontrol";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

interface UserGeolocationMarkerProps {
	withMarker?: boolean;
	retrieveOnLoad?: boolean;
}

export function UserGeolocationControl({
	withMarker = true,
	retrieveOnLoad = true,
}: UserGeolocationMarkerProps) {
	const map = useMap();
	const controlRef = useRef<LocateControl | null>(null);
	// biome-ignore lint/correctness/useExhaustiveDependencies: this is used as a componentDidMount and should only run once
	useEffect(() => {
		if (controlRef.current) return;
		controlRef.current = new LocateControl({
			position: "topleft",
			flyTo: true,
			strings: {
				title: "My location",
			},
			drawMarker: withMarker,
			drawCircle: withMarker,
		});
		controlRef.current.addTo(map);
		if (retrieveOnLoad) {
			controlRef.current.start();
		}
	}, []);

	return null;
}
