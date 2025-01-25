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
 * Calculate distance based on step length and step amount and convert to kilometers
 * @param stepLength - step length in cm
 * @param stepAmount - step amount
 */
export function calculateDistance(stepLength: number, stepAmount: number) {
	return (stepLength * stepAmount) / 10000; // Convert to kilometers
}
