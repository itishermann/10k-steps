export interface Point {
	latitude: number;
	longitude: number;
}

/**
 * Calculate the initial bearing (in degrees) between two points.
 */
export function calculateBearing(
	startLat: number,
	startLong: number,
	endLat: number,
	endLong: number,
): number {
	const phi1 = (startLat * Math.PI) / 180;
	const phi2 = (endLat * Math.PI) / 180;
	const deltaLambda = ((endLong - startLong) * Math.PI) / 180;

	const y = Math.sin(deltaLambda) * Math.cos(phi2);
	const x =
		Math.cos(phi1) * Math.sin(phi2) -
		Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
	const theta = Math.atan2(y, x);
	return ((theta * 180) / Math.PI + 360) % 360;
}

/**
 * Calculate the distance between two points using the Haversine formula.
 */
export function haversineDistance(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number,
): number {
	const earthRadius = 6371e3; // Earth radius in meters
	const phi1 = (lat1 * Math.PI) / 180;
	const phi2 = (lat2 * Math.PI) / 180;
	const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
	const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

	const a =
		Math.sin(deltaPhi / 2) ** 2 +
		Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2;
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return earthRadius * c;
}

/**
 * Determine turn direction (left/right) between two bearings
 */
export function getTurnDirection(
	previousBearing: number,
	currentBearing: number,
): "left" | "right" {
	let angleDifference = currentBearing - previousBearing;
	angleDifference = ((angleDifference % 360) + 360) % 360; // Normalize to 0-360
	if (angleDifference > 180) angleDifference -= 360; // Get shortest path
	return angleDifference > 0 ? "right" : "left";
}

/**
 * Convert bearing to compass direction for initial instruction
 */
export function getCompassDirection(bearing: number): string {
	const directions = [
		"North",
		"North-East",
		"East",
		"South-East",
		"South",
		"South-West",
		"West",
		"North-West",
	];
	return directions[Math.floor(((bearing + 22.5) % 360) / 45)];
}

/**
 * Generate walking instructions with turn directions
 */
export function getWalkingInstructions(points: Point[]): string[] {
	const instructions: string[] = [];
	if (points.length < 2) return instructions;

	let previousBearing: number | null = null;
	let previousPoint: Point = points[0];

	for (let i = 1; i < points.length; i++) {
		const currentPoint = points[i];
		const distance = haversineDistance(
			previousPoint.latitude,
			previousPoint.longitude,
			currentPoint.latitude,
			currentPoint.longitude,
		);

		// Skip points that are too close
		if (distance < 1) continue;

		const currentBearing = calculateBearing(
			previousPoint.latitude,
			previousPoint.longitude,
			currentPoint.latitude,
			currentPoint.longitude,
		);

		// Format distance
		const distanceStr =
			distance >= 1000
				? `${(distance / 1000).toFixed(1)} km`
				: `${Math.round(distance)} meters`;

		if (previousBearing === null) {
			// First valid segment
			instructions.push(
				`Head ${getCompassDirection(currentBearing)} for ${distanceStr}`,
			);
			previousBearing = currentBearing;
		} else {
			// Subsequent segments with turn direction
			const turn = getTurnDirection(previousBearing, currentBearing);
			instructions.push(`Turn ${turn} and walk ${distanceStr}`);
			previousBearing = currentBearing;
		}

		previousPoint = currentPoint;
	}

	return instructions;
}
