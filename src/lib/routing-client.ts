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
	 * @param count - number of alternative routes.
	 */
	async getLoopedDirections(
		{ lat, lng }: Point,
		length: number,
		count: number,
	) {
		if (!this.apiKey) {
			throw new Error("ORS API key is not set");
		}
		return await this.ors.getDirections(
			Profile.FOOT_WALKING,
			DirectionsFormat.GPX,
			{
				coordinates: [[lng, lat]],
				alternative_routes: {
					// Target number of alternative routes to compute. Service returns up to this number of routes that fulfill the share-factor and weight-factor constraints.
					target_count: count,
					// Maximum factor by which route weight may diverge from the optimal route. The value of 1.4 means alternatives can be up to 1.4 times longer (costly) than the optimal route.
					weight_factor: 0,
					// Maximum fraction of the route that alternatives may share with the optimal route. The default value of 0.6 means alternatives can share up to 60% of path segments with the optimal route.
					share_factor: 0.6,
				},
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
	}
}

const routingClientGlobal = globalThis as typeof globalThis & {
	routingClient: RoutingClient;
};

export const routingClient: RoutingClient =
	routingClientGlobal.routingClient || new RoutingClient();

routingClientGlobal.routingClient = routingClient;
