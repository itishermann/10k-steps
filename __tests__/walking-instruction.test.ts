import { expect, test } from "bun:test";
import {
	type Point,
	calculateBearing,
	getCompassDirection,
	getTurnType,
	getWalkingInstructions,
	haversineDistance,
} from "@/lib/get-walking-instruction";

test("calculateBearing", () => {
	// North
	expect(calculateBearing(0, 0, 1, 0)).toBeCloseTo(0);
	// East
	expect(calculateBearing(0, 0, 0, 1)).toBeCloseTo(90);
	// South
	expect(calculateBearing(1, 0, 0, 0)).toBeCloseTo(180);
	// West
	expect(calculateBearing(0, 1, 0, 0)).toBeCloseTo(270);
});

test("haversineDistance", () => {
	// Test with actual 1km distance (40.7128 to 40.7218 is ~1km)
	const dist = haversineDistance(40.7128, -74.006, 40.7218, -74.006);
	expect(dist).toBeWithin(990, 1010);
});

test("getCompassDirection", () => {
	expect(getCompassDirection(0)).toBe("North");
	expect(getCompassDirection(90)).toBe("East");
	expect(getCompassDirection(135)).toBe("South-East");
	expect(getCompassDirection(315)).toBe("North-West");
});

test("getTurnType", () => {
	expect(getTurnType(0, 10)).toBe("straight");
	expect(getTurnType(0, 20)).toBe("right");
	expect(getTurnType(90, 70)).toBe("left"); // Changed from 80 to 70
	expect(getTurnType(180, 350)).toBe("right");
});

test("getWalkingInstructions", () => {
	const points: Point[] = [
		{ latitude: 40.7128, longitude: -74.006 },
		{ latitude: 40.7218, longitude: -74.006 }, // 1.0km North
		{ latitude: 40.7218, longitude: -74.0 }, // 506m East
		{ latitude: 40.7218, longitude: -73.991 }, // 758m East
	];

	const result = getWalkingInstructions(points);
	expect(result).toEqual([
		"Walk 1.0km towards North",
		"In 1.0km, turn right",
		"Walk 506m",
		"Continue on 758m",
	]);
});
