export type Point = { latitude: number; longitude: number };
export type Segment = { bearing: number; distance: number };

const TURN_THRESHOLD = 15; // Degrees for considering straight movement

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

export function haversineDistance(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number,
): number {
	const R = 6371e3; // Earth radius in meters
	const phi1 = (lat1 * Math.PI) / 180;
	const phi2 = (lat2 * Math.PI) / 180;
	const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
	const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

	const a =
		Math.sin(deltaPhi / 2) ** 2 +
		Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2;
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Fix: Return the actual calculated distance
}

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

export function getTurnType(
	prevBearing: number,
	currentBearing: number,
): "left" | "right" | "straight" {
	let angleDiff = currentBearing - prevBearing;
	angleDiff = ((angleDiff % 360) + 360) % 360;
	if (angleDiff > 180) angleDiff -= 360;

	if (Math.abs(angleDiff) < TURN_THRESHOLD) return "straight";
	return angleDiff > 0 ? "right" : "left";
}

export function formatDistance(distance: number): string {
	return distance >= 1000
		? `${(distance / 1000).toFixed(1)}km`
		: `${Math.round(distance)}m`;
}

export function getWalkingInstructions(points: Point[]): string[] {
	const instructions: string[] = [];
	const segments: Segment[] = [];

	// Generate valid segments
	for (let i = 0; i < points.length - 1; i++) {
		const start = points[i];
		const end = points[i + 1];
		const distance = haversineDistance(
			start.latitude,
			start.longitude,
			end.latitude,
			end.longitude,
		);
		if (distance < 1) continue;

		segments.push({
			bearing: calculateBearing(
				start.latitude,
				start.longitude,
				end.latitude,
				end.longitude,
			),
			distance,
		});
	}

	if (segments.length === 0) return [];

	// First instruction
	const first = segments[0];
	instructions.push(
		`Walk ${formatDistance(first.distance)} towards ${getCompassDirection(first.bearing)}`,
	);

	// Subsequent instructions
	for (let i = 1; i < segments.length; i++) {
		const prev = segments[i - 1];
		const current = segments[i];
		const turn = getTurnType(prev.bearing, current.bearing);

		if (turn !== "straight") {
			instructions.push(`In ${formatDistance(prev.distance)}, turn ${turn}`);
		}

		instructions.push(
			turn === "straight"
				? `Continue on ${formatDistance(current.distance)}`
				: `Walk ${formatDistance(current.distance)}`,
		);
	}

	return instructions;
}
