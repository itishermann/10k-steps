/**
 * startElement.className = `h-4 w-4 rounded-full bg-green-500 border-2 border-white`;
 *         endElement.className = `h-4 w-4 rounded-full border-2 border-white`;
 *         endElement.style.background =
 *             'repeating-conic-gradient(#fff 0 90deg, #000 0 180deg) 0 0/8px 8px round';
 */
import L from "leaflet";

export const routeStartingPointIcon = L.divIcon({
	html: "<div />",
	className: "h-4 w-4 rounded-full border-2 border-white checkered-background",
	iconSize: [15, 15],
	iconAnchor: [7.5, 7.5],
});
