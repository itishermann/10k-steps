import { RouteItem } from "@/components/molecules/route-manager/route-item";
import { appStore } from "@/lib/stores/app.store";

export function RoutesList() {
	const paths = appStore.use.paths();

	const mappedPaths = paths.map((p, index) => <RouteItem data={p} key={p} />);

	return <div className="flex flex-col gap-2">{mappedPaths}</div>;
}
