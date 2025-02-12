"use client";
import { LocateControl } from "leaflet.locatecontrol";
import { useEffect, useRef } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import { toast } from "sonner";

interface UserGeolocationMarkerProps {
	withMarker?: boolean;
	retrieveOnLoad?: boolean;
	enableHighAccuracy?: boolean;
	watch?: boolean;
}

export function UserGeolocationControl({
	withMarker = true,
	retrieveOnLoad = true,
	enableHighAccuracy,
	watch,
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
			locateOptions: {
				enableHighAccuracy,
				watch,
			},
		});
		controlRef.current.addTo(map);
		if (retrieveOnLoad) {
			controlRef.current.start();
		}
	}, []);

	useMapEvent("locationerror", (e) => {
		toast.error("Failed to retrieve your location", {
			description: e.message,
		});
	});

	return null;
}
