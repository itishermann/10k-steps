import {
	type Point,
	calculateBearing,
	formatDistance,
	getCompassDirection,
	getTurnType,
	haversineDistance,
} from "./get-walking-instruction";

type Segment = {
	start: Point;
	end: Point;
	bearing: number;
	distance: number;
};

export function createNavigationSession(points: Point[], threshold = 10) {
	const segments: Segment[] = [];
	const validPoints: Point[] = [points[0]];

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
			start,
			end,
			bearing: calculateBearing(
				start.latitude,
				start.longitude,
				end.latitude,
				end.longitude,
			),
			distance,
		});
		validPoints.push(end);
	}

	let currentSegmentIndex = 0;
	let nextTurnInstruction = false;

	return {
		getNextInstruction(currentLat: number, currentLon: number): string | null {
			if (currentSegmentIndex >= segments.length) return null;

			const currentSegment = segments[currentSegmentIndex];
			const distanceToEnd = haversineDistance(
				currentLat,
				currentLon,
				currentSegment.end.latitude,
				currentSegment.end.longitude,
			);

			// Check if we should trigger next instruction
			if (distanceToEnd <= threshold) {
				currentSegmentIndex++;
				nextTurnInstruction = false;

				if (currentSegmentIndex >= segments.length) {
					return "You have reached your destination";
				}

				// Generate turn instruction if needed
				const prevBearing = segments[currentSegmentIndex - 1].bearing;
				const newBearing = segments[currentSegmentIndex].bearing;
				const turn = getTurnType(prevBearing, newBearing);

				if (turn !== "straight") {
					nextTurnInstruction = true;
					return `Turn ${turn} and walk ${formatDistance(segments[currentSegmentIndex].distance)}`;
				}
			}

			// Generate distance-based instructions
			if (!nextTurnInstruction) {
				const remainingDistance = haversineDistance(
					currentLat,
					currentLon,
					currentSegment.end.latitude,
					currentSegment.end.longitude,
				);

				if (remainingDistance < 50) {
					// Warn about upcoming turn
					const nextSegment = segments[currentSegmentIndex + 1];
					if (nextSegment) {
						const turn = getTurnType(
							currentSegment.bearing,
							nextSegment.bearing,
						);
						if (turn !== "straight") {
							return `In ${Math.round(remainingDistance)}m, turn ${turn}`;
						}
					}
				}

				return currentSegmentIndex === 0
					? `Walk ${formatDistance(currentSegment.distance)} towards ${getCompassDirection(currentSegment.bearing)}`
					: `Continue for ${formatDistance(remainingDistance)}`;
			}

			return `Walk ${formatDistance(currentSegment.distance)} towards ${getCompassDirection(currentSegment.bearing)}`;
		},
	};
}
