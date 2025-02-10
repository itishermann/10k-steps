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
export function getInstruction(instructionType: number) {
	switch (instructionType) {
		case Instruction.Left:
			return "Left";
		case Instruction.Right:
			return "Right";
		case Instruction.SharpLeft:
			return "Sharp left";
		case Instruction.SharpRight:
			return "Sharp right";
		case Instruction.SlightLeft:
			return "Slight left";
		case Instruction.SlightRight:
			return "Slight right";
		case Instruction.Straight:
			return "Straight";
		case Instruction.EnterRoundabout:
			return "Enter roundabout";
		case Instruction.ExitRoundabout:
			return "Exit roundabout";
		case Instruction.Uturn:
			return "U-turn";
		case Instruction.Goal:
			return "Goal";
		case Instruction.Depart:
			return "Depart";
		case Instruction.KeepLeft:
			return "Keep left";
		case Instruction.KeepRight:
			return "Keep right";
		default:
			return "Unknown";
	}
}
export enum Instruction {
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
