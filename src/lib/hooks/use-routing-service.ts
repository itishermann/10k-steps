import { db } from "@/lib/db";
import type { IConf } from "@/lib/entities/conf";
import { type Point, routingClient } from "@/lib/routing-client";
import { calculateDistance, generateRandomRgbColor } from "@/lib/utils";
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
		const color = generateRandomRgbColor();
		const gpx = await routingClient.getLoopedDirections(from, distance);
		const route = {
			id: uuidv7(),
			color,
			stepLength,
			originLatitude: from.lat,
			originLongitude: from.lng,
			targetAmountOfSteps: stepAmount,
			path: gpx,
		};
		await db.route.add(route);
		return route;
	};

	return [generateRoute, isReady] as const;
}
