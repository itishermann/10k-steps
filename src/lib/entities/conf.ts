import type { AppDatabase } from "@/lib/db";
import { Entity } from "dexie";

export class Conf extends Entity<AppDatabase> {
	name!: string;
	value!: number;
	createdAt: Date = new Date();
	updatedAt: Date | null = null;
}
