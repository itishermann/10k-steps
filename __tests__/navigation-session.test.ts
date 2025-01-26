import { expect, test } from "bun:test";
import type { Point } from "@/lib/get-walking-instruction";
import { createNavigationSession } from "@/lib/navigation-session";

test("navigation session generates instructions incrementally", () => {
	const points: Point[] = [
		{ latitude: 40.7128, longitude: -74.006 }, // NYC
		{ latitude: 40.7218, longitude: -74.006 }, // 1km North
		{ latitude: 40.7218, longitude: -73.996 }, // ~843m East
	];

	const session = createNavigationSession(points);

	// Start position
	expect(session.getNextInstruction(40.7128, -74.006)).toBe(
		"Walk 1.0km towards North",
	);

	// Approaching first point
	expect(session.getNextInstruction(40.7217, -74.006)).toMatch(
		/In \d+m, turn right/,
	);

	// Reached first point
	expect(session.getNextInstruction(40.7218, -74.006)).toBe(
		"Turn right and walk 843m",
	);

	// Final approach
	expect(session.getNextInstruction(40.7218, -73.996)).toBe(
		"You have reached your destination",
	);
});
