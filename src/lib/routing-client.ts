import ORS from "openrouteservice";
import { Profile } from "openrouteservice/dist/common";
import { DirectionsFormat } from "openrouteservice/dist/directions";

export interface Point {
	lat: number;
	lng: number;
}

export class RoutingClient {
	private apiKey: string | null = null;

	private ors = new ORS("");

	setApiKey(apiKey: string) {
		if (this.apiKey === apiKey) {
			return;
		}
		this.apiKey = apiKey;
		this.ors = new ORS(apiKey);
	}

	/**
	 *
	 * @param lat
	 * @param lng
	 * @param length - length in meters
	 */
	async getLoopedDirections({ lat, lng }: Point, length: number) {
		if (!this.apiKey) {
			throw new Error("ORS API key is not set");
		}
		const res = await this.ors.getDirections(
			Profile.FOOT_WALKING,
			DirectionsFormat.GPX,
			{
				coordinates: [[lng, lat]],
				options: {
					round_trip: {
						// The target length of the route in meters (note that this is a preferred value, but results may be different).
						length,
						// The number of points to use on the route. Larger values create more circular routes. (randomn between 3 and 30).
						points: Math.floor(Math.random() * 27) + 3,
						// A seed to use for adding randomisation to the overall direction of the generated route (randomn between 0 and 5).
						seed: Math.floor(Math.random() * 5),
					},
				},
			},
		);
		if (typeof res !== "string") {
			// @ts-expect-error - typings are incorrect
			throw new Error((res.error as any).message);
		}
		return res;
	}
}

const routingClientGlobal = globalThis as typeof globalThis & {
	routingClient: RoutingClient;
};

export const routingClient: RoutingClient =
	routingClientGlobal.routingClient || new RoutingClient();

routingClientGlobal.routingClient = routingClient;
