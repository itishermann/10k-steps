import type { Route } from "@/lib/entities/route";
import L from "leaflet";
import { useMemo, useState } from "react";
import { useMap } from "react-leaflet";

interface RouteItemProps {
	data: Route;
}

export function RouteItem({ data: { path: gpxPath, color } }: RouteItemProps) {
	const [isShown, setIsShown] = useState(false);
	const map = useMap();
	const gpx = useMemo(
		() =>
			new L.GPX(gpxPath, {
				async: false,
				polyline_options: { color },
			}),
		[gpxPath, color],
	);

	const onView = () => {
		gpx.addTo(map);
		map.fitBounds(gpx.getBounds());
		setIsShown(true);
	};

	const onHide = () => {
		gpx.removeFrom(map);
		setIsShown(false);
	};

	const onClick = () => {
		if (isShown) {
			onHide();
		} else {
			onView();
		}
	};

	return (
		<button onClick={onClick} type="button">
			{(gpx.get_distance() / 1000).toFixed(2)} km
		</button>
	);
}
