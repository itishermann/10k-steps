import { EventNames } from "@/lib/event-emitter";
import { useEventEmitter } from "@/lib/hooks/use-event-emitter";
import L from "leaflet";
import { useMapEvent } from "react-leaflet";

export function UserLocationDispatcher() {
	const { publishEvent } = useEventEmitter(EventNames.UserLocationUpdated);

	useMapEvent("locationfound", (e) => {
		publishEvent({
			coordinates: new L.LatLng(e.latlng.lat, e.latlng.lng),
		});
	});

	return null;
}
