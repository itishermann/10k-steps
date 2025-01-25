import type { AppDatabase } from "@/lib/db";
import { Entity } from "dexie";

export class Route extends Entity<AppDatabase> {
	id!: number;
	path!: string;
	color!: string;
	stepLength!: number;
	originLatitude!: number;
	originLongitude!: number;
	targetAmountOfSteps!: number;
	createdAt: Date = new Date();
	updatedAt: Date | null = null;
}
