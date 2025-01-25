import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Calculate step length based on height
 * @param height - height in cm
 * @param gender
 */
export function calculateStepLength(height: number, gender: "male" | "female") {
	const factor = gender === "male" ? 0.415 : 0.413;
	return height * factor;
}

/**
 * Calculate distance based on step length and step amount and convert
 * @param stepLength - step length in cm
 * @param stepAmount - step amount
 * @param unit - unit to convert to
 */
export function calculateDistance(
	stepLength: number,
	stepAmount: number,
	unit: "km" | "m" = "km",
) {
	const stepLengthInMeters = stepLength / 100;
	const distance = stepLengthInMeters * stepAmount;
	return unit === "km" ? distance / 1000 : distance;
}

/**
 * Generates a random RGB color.
 *
 * @returns An string with the RGB color.
 */
export function generateRandomRgbColor(): string {
	const color = {
		r: Math.floor(Math.random() * 256),
		g: Math.floor(Math.random() * 256),
		b: Math.floor(Math.random() * 256),
	};
	return `rgb(${color.r},${color.g},${color.b})`;
}
