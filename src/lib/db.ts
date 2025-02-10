import { Conf, type IConfInput } from "@/lib/entities/conf";
import { type IRouteInput, Route } from "@/lib/entities/route";
import { getMinAndMaxElevation } from "@/lib/geojson-utils";
import { gpx as fromGpx } from "@tmcw/togeojson";
import { coordAll, length } from "@turf/turf";
import Dexie, { type EntityTable } from "dexie";

export class AppDatabase extends Dexie {
	conf!: EntityTable<Conf, "name", IConfInput>;
	route!: EntityTable<Route, "id", IRouteInput>;

	constructor() {
		super("tenKStepsDB", { autoOpen: true });
		/* ----------- Version 1 ----------- */
		this.version(1).stores({
			conf: "&name, createdAt, updatedAt",
			route: "&id, stepLength, targetAmountOfSteps, createdAt, updatedAt",
		});

		/* ----------- Version 2 ----------- */
		this.version(2)
			.stores({
				conf: "&name, createdAt, updatedAt",
				route: "&id, stepLength, targetAmountOfSteps, createdAt, updatedAt",
			})
			.upgrade((tx) => {
				// remove path(gpx) from route and replace it with geojson
				// @ts-expect-error - the typings are incorrect
				return tx.route.toCollection().modify((r) => {
					const featureCollection = fromGpx(
						new DOMParser().parseFromString(r.path, "text/xml"),
					);
					const distance = length(featureCollection, { units: "kilometers" });
					// @ts-expect-error - we need to get the maximum amount of data even if it's not in the geojson
					const elevation = getMinAndMaxElevation(featureCollection);
					r.geojson = featureCollection;
					r.directionLanguage = "en";
					r.distanceInKm = distance;
					r.coordinates = coordAll(featureCollection).map(
						([lng, lat, value]) => ({
							lat,
							lng,
							value: value ?? 0,
						}),
					);
					r.maxElevation = elevation.max || 1;
					r.minElevation = elevation.min || 0;
					r.amountOfSteps = Math.round((distance * 100000) / r.stepLength);
					r.path = undefined;
					r.color = undefined;
				});
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
