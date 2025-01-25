import { RoutesForm } from "@/components/molecules/route-manager/routes-form";
import { RoutesList } from "@/components/molecules/route-manager/routes-list";

export function RoutesManager() {
	return (
		<div className="flex flex-col gap-2">
			<RoutesForm />
			<RoutesList />
		</div>
	);
}
