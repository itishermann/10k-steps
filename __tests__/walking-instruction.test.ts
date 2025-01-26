import { describe, expect, it } from "bun:test";
import {
	type Point,
	calculateBearing,
	getCompassDirection,
	getTurnDirection,
	getWalkingInstructions,
	haversineDistance,
} from "@/lib/get-walking-instruction";

describe("Geographic Calculations", () => {
	describe("calculateBearing", () => {
		it("should calculate the correct bearing from North to East", () => {
			const bearing = calculateBearing(0, 0, 0, 1);
			expect(bearing).toBeCloseTo(90);
		});

		it("should calculate the correct bearing from East to South", () => {
			const bearing = calculateBearing(0, 1, 1, 1);
			expect(bearing).toBeCloseTo(180);
		});

		it("should calculate the correct bearing from South to West", () => {
			const bearing = calculateBearing(1, 1, 1, 0);
			expect(bearing).toBeCloseTo(270);
		});

		it("should handle bearings crossing the 360-degree boundary", () => {
			const bearing = calculateBearing(0, 0, -1, 1);
			expect(bearing).toBeGreaterThan(0);
			expect(bearing).toBeLessThan(360);
		});
	});

	describe("haversineDistance", () => {
		it("should calculate distance between the same points as zero", () => {
			const distance = haversineDistance(0, 0, 0, 0);
			expect(distance).toBeCloseTo(0);
		});

		it("should calculate distance between two known points", () => {
			// Example: London (51.5074° N, 0.1278° W) to Paris (48.8566° N, 2.3522° E)
			const london: Point = { latitude: 51.5074, longitude: -0.1278 };
			const paris: Point = { latitude: 48.8566, longitude: 2.3522 };
			const distance = haversineDistance(
				london.latitude,
				london.longitude,
				paris.latitude,
				paris.longitude,
			);
			// Expected distance is approximately 343,556 meters (~343.6 km)
			expect(distance).toBeCloseTo(343550, -0); // Acceptable range
		});

		it("should handle antipodal points correctly", () => {
			const point1: Point = { latitude: 0, longitude: 0 };
			const point2: Point = { latitude: -0, longitude: 180 };
			const distance = haversineDistance(
				point1.latitude,
				point1.longitude,
				point2.latitude,
				point2.longitude,
			);
			// Half the Earth's circumference: ~20015086 meters
			expect(distance).toBeCloseTo(20015086, -0);
		});
	});

	describe("getTurnDirection", () => {
		it('should return "right" for positive angle differences', () => {
			const direction = getTurnDirection(0, 90);
			expect(direction).toBe("right");
		});

		it('should return "left" for negative angle differences', () => {
			const direction = getTurnDirection(90, 0);
			expect(direction).toBe("left");
		});

		it('should return "right" when angle difference is exactly 180 degrees', () => {
			const direction = getTurnDirection(0, 180);
			expect(direction).toBe("right"); // By implementation, > 0
		});

		it("should correctly handle angle differences greater than 180 degrees", () => {
			const direction = getTurnDirection(10, 200); // Difference: 190 -> -170 (left)
			expect(direction).toBe("left");
		});

		it("should correctly handle angle differences less than -180 degrees", () => {
			const direction = getTurnDirection(200, 10); // Difference: -190 -> 170 (right)
			expect(direction).toBe("right");
		});
	});

	describe("getCompassDirection", () => {
		it('should return "North" for bearings close to 0 degrees', () => {
			expect(getCompassDirection(0)).toBe("North");
			expect(getCompassDirection(10)).toBe("North");
			expect(getCompassDirection(22.4)).toBe("North");
		});

		it('should return "North-East" for bearings around 45 degrees', () => {
			expect(getCompassDirection(45)).toBe("North-East");
			expect(getCompassDirection(67.4)).toBe("North-East");
		});

		it('should return "East" for bearings around 90 degrees', () => {
			expect(getCompassDirection(90)).toBe("East");
		});

		it("should handle bearings near 360 degrees correctly", () => {
			expect(getCompassDirection(359)).toBe("North");
		});
	});
});

describe("getWalkingInstructions", () => {
	it("should return an empty array for less than two points", () => {
		expect(getWalkingInstructions([])).toEqual([]);
		expect(getWalkingInstructions([{ latitude: 0, longitude: 0 }])).toEqual([]);
	});

	it("should handle a single segment correctly", () => {
		const points: Point[] = [
			{ latitude: 0, longitude: 0 },
			{ latitude: 0, longitude: 1 }, // East, ~111 km
		];
		const instructions = getWalkingInstructions(points);
		expect(instructions).toEqual(["Head East for 111 km"]);
	});

	it("should handle multiple segments with turns", () => {
		const points: Point[] = [
			{ latitude: 0, longitude: 0 },
			{ latitude: 0, longitude: 1 }, // East, ~111 km
			{ latitude: 1, longitude: 1 }, // South, ~111 km
			{ latitude: 1, longitude: 0 }, // West, ~111 km
			{ latitude: 0, longitude: 0 }, // North, ~111 km
		];
		const instructions = getWalkingInstructions(points);
		expect(instructions).toEqual([
			"Head East for 111.2 km",
			"Turn right and walk 111.2 km",
			"Turn right and walk 111.2 km",
			"Turn right and walk 111.2 km",
		]);
	});

	it("should skip points that are too close", () => {
		const points: Point[] = [
			{ latitude: 0, longitude: 0 },
			{ latitude: 0, longitude: 0.0001 }, // ~11 meters, should be skipped
			{ latitude: 0, longitude: 1 }, // East, ~111 km
		];
		const instructions = getWalkingInstructions(points);
		expect(instructions).toEqual(["Head East for 111.2 km"]);
	});

	it("should handle bearing normalization correctly", () => {
		const points: Point[] = [
			{ latitude: 0, longitude: 0 },
			{ latitude: 0, longitude: 1 }, // East
			{ latitude: 1, longitude: 0 }, // Southwest
		];
		const instructions = getWalkingInstructions(points);
		expect(instructions).toEqual([
			"Head East for 111.2 km",
			"Turn right and walk 157.2 km",
		]);
	});

	it("should handle zero distance segments correctly", () => {
		const points: Point[] = [
			{ latitude: 0, longitude: 0 },
			{ latitude: 0, longitude: 0 }, // Same point
			{ latitude: 0, longitude: 1 },
		];
		const instructions = getWalkingInstructions(points);
		expect(instructions).toEqual(["Head East for 111.2 km"]);
	});

	it("should handle complex path with multiple turns and distances", () => {
		const points: Point[] = [
			{ latitude: 37.7749, longitude: -122.4194 }, // San Francisco
			{ latitude: 37.8044, longitude: -122.2711 }, // Oakland
			{ latitude: 37.6879, longitude: -122.4702 }, // Daly City
			{ latitude: 37.6213, longitude: -122.379 }, // SFO Airport
		];
		const instructions = getWalkingInstructions(points);
		expect(instructions).toEqual([
			"Head North-East for 13.8 km",
			"Turn left and walk 21.3 km",
			"Turn right and walk 10.4 km",
		]);
	});
});
