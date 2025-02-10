import L from "leaflet";
import { useEffect, useRef } from "react";
import { useMapEvent } from "react-leaflet";

const userDotIcon = L.divIcon({
	html: `<div style="
    background: #007bff;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 0 2px rgba(0,0,0,0.5);
  "/>`,
	className: "", // Remove default styles
	iconSize: [15, 15],
	iconAnchor: [7.5, 7.5], // Centers the dot on the position
});

export function UserGeolocationMarker() {
	// useRef to hold the marker so that we reuse it on multiple locationfound events.
	const markerRef = useRef<L.Marker | null>(null);

	// Listen for the "locationfound" event and update or add the marker accordingly.
	useMapEvent("locationfound", (e) => {
		const { lat, lng } = e.latlng;
		const popupContent = `Your position<br/>(${lat.toFixed(5)}, ${lng.toFixed(5)})<br/>± ${e.accuracy}m`;

		if (!markerRef.current) {
			// Create and add marker if it doesn't exist yet.
			markerRef.current = L.marker([lat, lng], { icon: userDotIcon }).bindPopup(
				popupContent,
			);
			markerRef.current.addTo(e.target);
		} else {
			// Update the existing marker's position.
			markerRef.current.setLatLng(e.latlng);
			// Update the popup content.
			markerRef.current.getPopup()?.setContent(popupContent);
		}
	});

	// Cleanup the marker when the component unmounts.
	useEffect(() => {
		return () => {
			if (markerRef.current) {
				markerRef.current.remove();
				markerRef.current = null;
			}
		};
	}, []);

	return null;
}
