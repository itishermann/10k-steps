import GeoJsonToGpx, {
	type Options as GPXOptions,
} from "@dwayneparton/geojson-to-gpx";
import type { FeatureCollection } from "geojson";

export function renameGpxTrack(gpx: string, newTrackName: string) {
	const parser = new DOMParser();
	const gpxDoc = parser.parseFromString(gpx, "application/xml");

	// Update the track name in the GPX metadata if it exists
	const metadata = gpxDoc.querySelector("metadata");
	if (metadata) {
		const nameElement = metadata.querySelector("name");
		if (nameElement) {
			nameElement.textContent = newTrackName;
		} else {
			const name = gpxDoc.createElement("name");
			name.textContent = newTrackName;
			metadata.appendChild(name);
		}
	} else {
		// If there's no metadata, create it with the new track name
		const metadataElement = gpxDoc.createElement("metadata");
		const nameElement = gpxDoc.createElement("name");
		nameElement.textContent = newTrackName;
		metadataElement.appendChild(nameElement);

		// Insert the metadata element as the first child
		const gpxElement = gpxDoc.querySelector("gpx");
		if (gpxElement) {
			gpxElement.insertBefore(metadataElement, gpxElement.firstChild);
		}
	}

	// Convert the updated GPX document back to a string
	return new XMLSerializer().serializeToString(gpxDoc);
}

/**
 * Converts a GeoJSON object to a GPX string.
 *
 * @param geojson - The GeoJSON object to convert.
 * @param metadata - The metadata to include in the GPX.
 * @returns The Gpx as an XML DOM object.
 *
 */
export function geojsonToGpx(
	geojson: FeatureCollection,
	metadata?: GPXOptions,
) {
	return GeoJsonToGpx(geojson, metadata);
}

/**
 * Gets instruction based on type
 * @param instructionType - The instruction type retrieved from the GEOJSON
 * @returns The instruction as a string
 * Value	Encoding
 * 0	Left
 * 1	Right
 * 2	Sharp left
 * 3	Sharp right
 * 4	Slight left
 * 5	Slight right
 * 6	Straight
 * 7	Enter roundabout
 * 8	Exit roundabout
 * 9	U-turn
 * 10	Goal
 * 11	Depart
 * 12	Keep left
 * 13	Keep right
 */
export function getInstructionType(instructionType: number) {
	switch (instructionType) {
		case InstructionType.Left:
			return "Left";
		case InstructionType.Right:
			return "Right";
		case InstructionType.SharpLeft:
			return "Sharp left";
		case InstructionType.SharpRight:
			return "Sharp right";
		case InstructionType.SlightLeft:
			return "Slight left";
		case InstructionType.SlightRight:
			return "Slight right";
		case InstructionType.Straight:
			return "Straight";
		case InstructionType.EnterRoundabout:
			return "Enter roundabout";
		case InstructionType.ExitRoundabout:
			return "Exit roundabout";
		case InstructionType.Uturn:
			return "U-turn";
		case InstructionType.Goal:
			return "Goal";
		case InstructionType.Depart:
			return "Depart";
		case InstructionType.KeepLeft:
			return "Keep left";
		case InstructionType.KeepRight:
			return "Keep right";
		default:
			return "Unknown";
	}
}
export enum InstructionType {
	Left = 0,
	Right = 1,
	SharpLeft = 2,
	SharpRight = 3,
	SlightLeft = 4,
	SlightRight = 5,
	Straight = 6,
	EnterRoundabout = 7,
	ExitRoundabout = 8,
	Uturn = 9,
	Goal = 10,
	Depart = 11,
	KeepLeft = 12,
	KeepRight = 13,
}

export const instructionCodeToSymbol = [
	"&lsh;", // Turn left           [0]
	"&rsh;", // Turn right          [1]
	"&cularr;", // Sharp left       [2]
	"&curarr;", // Sharp right      [3]
	"&nwarr;", // Slight left       [4]
	"&nearr;", // Slight right      [5]
	"&uarr;", // Straight           [6]
	"&orarr;", // Enter roundabout  [7]
	"&orarr;", // Exit roundabout   [8]
	"&cularr;", // U-turn           [9]
	"&nwArr;", // Goal              [10]
	"&uArr;", // Depart             [11]
	"&larrb;", // Keep left  [12]
	"&rarrb;", // Keep right          [13]
];
