import type { AppDatabase } from "@/lib/db";
import { Entity } from "dexie";

export class Conf extends Entity<AppDatabase> implements IConf {
	name!: string;
	value!: number | string;
	createdAt: Date = new Date();
	updatedAt: Date | null = null;
}

export type IConf = {
	name: string;
	value: number | string;
	createdAt: Date;
	updatedAt: Date | null;
};

export type IConfInput = Omit<Conf, "createdAt" | "updatedAt" | "table">;
