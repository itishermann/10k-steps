import { Conf } from "@/lib/entities/conf";
import { Route } from "@/lib/entities/route";
import Dexie, { type EntityTable } from "dexie";

export class AppDatabase extends Dexie {
	conf!: EntityTable<Conf, "name">;
	route!: EntityTable<Route, "id">;

	constructor() {
		super("tenKStepsDB", { autoOpen: true });
		this.version(1).stores({
			conf: "name, createdAt, updatedAt",
			route: "++id, stepLength, targetAmountOfSteps, createdAt",
		});
		this.conf.mapToClass(Conf);
		this.route.mapToClass(Route);

		this.conf.hook("creating", (_, obj) => {
			obj.createdAt = new Date();
			obj.updatedAt = null;
		});
		this.conf.hook("updating", (_, __, obj) => {
			obj.updatedAt = new Date();
		});
		this.route.hook("creating", (_, obj) => {
			obj.createdAt = new Date();
			obj.updatedAt = null;
		});
		this.route.hook("updating", (_, __, obj) => {
			obj.updatedAt = new Date();
		});
	}
}

export const db = new AppDatabase();
