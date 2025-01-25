import { RoutesForm } from "@/components/molecules/route-manager/routes-form";
import { RoutesList } from "@/components/molecules/route-manager/routes-list";

export function RoutesManager() {
	return (
		<div>
			<RoutesForm />
			<RoutesList />
		</div>
	);
}
