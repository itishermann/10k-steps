import { EventNames } from "@/lib/event-emitter";
import { useEventEmitter } from "@/lib/hooks/use-event-emitter";
import L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function InstructionHighlighter() {
	const map = useMap();
	const { eventData } = useEventEmitter(EventNames.RenderHotPolylineHighlight);

	// biome-ignore lint/correctness/useExhaustiveDependencies: When the eventData changes, the map should be updated
	useEffect(() => {
		if (!eventData) return;
		const polyline = L.polyline(eventData.coordinates, eventData.options);
		polyline.addTo(map);
		if (eventData.fitBounds) {
			map.fitBounds(polyline.getBounds());
		}
		return () => {
			polyline.remove();
		};
	}, [eventData]);

	return null;
}
