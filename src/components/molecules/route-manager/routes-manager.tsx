import { FetchRoutesButton } from "@/components/molecules/route-manager/fetch-routes-button";
import { RoutesList } from "@/components/molecules/route-manager/routes-list";

export function RoutesManager() {
	return (
		<div>
			<RoutesList />
			<div className="flex items-center justify-center">
				<FetchRoutesButton />
			</div>
		</div>
	);
}
