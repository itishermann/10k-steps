import type L from "leaflet";

class GlobalEventEmitter extends EventTarget {}

// Define event map type with event names and their corresponding data types
export interface EventMap {
	RenderHotPolylineHighlight: {
		coordinates: L.LatLngExpression[] | L.LatLngExpression[][];
		options?: L.PolylineOptions;
		fitBounds?: boolean;
	};
	UserLocationUpdated: {
		coordinates: L.LatLngExpression;
	};
}

// Create enum from EventMap keys
export const EventNames = {
	RenderHotPolylineHighlight: "RenderHotPolylineHighlight",
	UserLocationUpdated: "UserLocationUpdated",
} as const;

// Type for event names
export type EventNames = keyof EventMap;

const globalEventEmitter = new GlobalEventEmitter();

export default globalEventEmitter;
