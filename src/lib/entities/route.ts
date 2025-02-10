import type { AppDatabase } from "@/lib/db";
import { Entity } from "dexie";
import type { FeatureCollection } from "geojson";

export class Route extends Entity<AppDatabase> implements IRoute {
	id!: string;
	geojson!: FeatureCollection;
	stepLength!: number;
	originLatitude!: number;
	originLongitude!: number;
	targetAmountOfSteps!: number;
	amountOfSteps!: number;
	maxElevation!: number;
	minElevation!: number;
	distanceInKm!: number;
	directionLanguage!: string;
	coordinates!: { lat: number; lng: number; value: number }[];
	createdAt: Date = new Date();
	updatedAt: Date | null = null;
}

export type IRoute = {
	id: string;
	/**
	 * GPX path
	 * @deprecated
	 * @use {@link geojson}
	 */
	path?: string;
	/**
	 * Color of the route
	 * @deprecated we use a gradient based on the elevation
	 */
	color?: string;
	stepLength: number;
	originLatitude: number;
	originLongitude: number;
	targetAmountOfSteps: number;
	amountOfSteps: number;
	createdAt: Date;
	updatedAt: Date | null;
	geojson: FeatureCollection;
	directionLanguage: string;
	maxElevation: number;
	minElevation: number;
	distanceInKm: number;
	coordinates: { lat: number; lng: number; value: number }[];
};

export type IRouteInput = Omit<Route, "createdAt" | "updatedAt" | "table">;
