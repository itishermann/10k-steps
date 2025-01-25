import { RouteItem } from "@/components/molecules/route-manager/route-item";
import { db } from "@/lib/db";
import type { Route } from "@/lib/entities/route";
import { useLiveQuery } from "dexie-react-hooks";

export function RoutesList() {
	const routes = useLiveQuery(
		() => db.route.orderBy("createdAt").reverse().toArray(),
		[],
		[] as Route[],
	);

	if (!routes || routes.length === 0) {
		return <p className="text-center">No routes saved yet</p>;
	}

	const mapped = routes.map((r) => (
		<RouteItem data={r} key={`route-${r.id}`} />
	));

	return <div className="flex flex-col gap-2">{mapped}</div>;
}
