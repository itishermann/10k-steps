import type { InstructionType } from "@/lib/gpx-utils";
import type { FeatureCollection, LineString } from "geojson";

export type OrsFeaturesCollection = FeatureCollection<
	LineString,
	GeojsonProperties
>;

export interface GeojsonProperties {
	ascent: number;
	descent: number;
	segments: Segment[];
	way_points: number[];
	summary: Summary;
}

export interface Segment {
	/**
	 * in kilometers
	 */
	distance: number;
	/**
	 * in seconds
	 */
	duration: number;
	steps: Step[];
	ascent: number;
	descent: number;
}

export interface Step {
	/**
	 * in kilometers
	 */
	distance: number;
	/**
	 * in seconds
	 */
	duration: number;
	type: InstructionType;
	instruction: string;
	name: string;
	way_points: number[];
}

export interface Summary {
	distance: number;
	duration: number;
}
