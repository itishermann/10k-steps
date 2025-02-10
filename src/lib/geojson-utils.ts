import type { FeatureCollection, LineString } from "geojson";

/**
 * gets the max and min elevation from a given geojson feature collection
 * @param geojson - the geojson feature collection
 * @returns the max and min elevation
 */
export function getMinAndMaxElevation(geojson: FeatureCollection<LineString>) {
	const elevations = geojson.features
		.flatMap((feature) => {
			return feature.geometry.coordinates.map((coord) => coord.at(2));
		})
		.filter((elevation) => elevation !== undefined);
	return {
		max: Math.max(...elevations),
		min: Math.min(...elevations),
	};
} // /**
