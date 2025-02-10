import { db } from "@/lib/db";
import type { IConf } from "@/lib/entities/conf";
import type { IRouteInput } from "@/lib/entities/route";
import { getMinAndMaxElevation } from "@/lib/geojson-utils";
import { type Point, routingClient } from "@/lib/routing-client";
import { calculateDistance } from "@/lib/utils";
import { coordAll, length } from "@turf/turf";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { uuidv7 } from "uuidv7";

const defaultValue: IConf = {
	value: "",
	createdAt: new Date(),
	updatedAt: null,
	name: "orsApiKey",
};

export function useRoutingService() {
	const conf = useLiveQuery(() => db.conf.get("orsApiKey"), [], defaultValue);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if (conf?.value && conf?.value !== "" && typeof conf?.value === "string") {
			routingClient.setApiKey(conf.value);
			setIsReady(true);
		} else {
			setIsReady(false);
		}
	}, [conf?.value]);

	const generateRoute = async (
		from: Point,
		stepLength: number,
		stepAmount: number,
		language = "en",
	) => {
		if (!conf?.value || conf?.value === "") {
			throw new Error("No API key provided");
		}
		const distance = calculateDistance(stepLength, stepAmount, "m");
		if (distance > 100000) {
			throw new Error(
				"Distance is too long. it should be less than 100km (100000m)",
			);
		}
		const featureCollection = await routingClient.getLoopedDirections(
			from,
			distance,
			language,
		);
		const elevation = getMinAndMaxElevation(featureCollection);
		const distanceInKm = length(featureCollection, { units: "kilometers" });
		const route: IRouteInput = {
			id: uuidv7(),
			stepLength,
			originLatitude: from.lat,
			originLongitude: from.lng,
			targetAmountOfSteps: stepAmount,
			geojson: featureCollection,
			minElevation: elevation.min,
			maxElevation: elevation.max,
			distanceInKm,
			coordinates: coordAll(featureCollection).map(([lng, lat, value]) => ({
				lat,
				lng,
				value,
			})),
			amountOfSteps: Math.round((distanceInKm * 100000) / stepLength),
			directionLanguage: language,
		};
		await db.route.add(route);
		return route;
	};

	return [generateRoute, isReady] as const;
}
