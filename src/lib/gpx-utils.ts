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
