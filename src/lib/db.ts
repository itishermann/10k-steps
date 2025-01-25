import { Conf } from "@/lib/entities/conf";
import { Route } from "@/lib/entities/route";
import Dexie, { type EntityTable } from "dexie";
import { uuidv7 } from "uuidv7";

export class AppDatabase extends Dexie {
	conf!: EntityTable<
		Conf,
		"name",
		Omit<Conf, "createdAt" | "updatedAt" | "table">
	>;
	route!: EntityTable<
		Route,
		"id",
		Omit<Route, "createdAt" | "updatedAt" | "table">
	>;

	constructor() {
		super("tenKStepsDB", { autoOpen: true });
		this.version(1).stores({
			conf: "&name, createdAt, updatedAt",
			route: "&id, stepLength, targetAmountOfSteps, createdAt, updatedAt",
		});
		this.conf.mapToClass(Conf);
		this.route.mapToClass(Route);

		// @ts-expect-error - the typings are incorrect
		this.conf.hook("creating", (_, obj) => {
			obj.createdAt = new Date();
			obj.updatedAt = null;
			return obj;
		});
		this.conf.hook("updating", (changes, _, obj) => ({
			...obj,
			...changes,
			updatedAt: new Date(),
		}));
		// @ts-expect-error - the typings are incorrect
		this.route.hook("creating", (_, obj) => {
			obj.createdAt = new Date();
			obj.updatedAt = null;
			return obj;
		});
		this.route.hook("updating", (changes, _, obj) => ({
			...obj,
			...changes,
			updatedAt: new Date(),
		}));
	}
}

export const db = new AppDatabase();
