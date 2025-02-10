import { Button } from "@/components/atoms/button";
import {
	DrawerClose,
	DrawerContent,
	DrawerNestedRoot,
	DrawerOverlay,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/atoms/drawer";
import { ApiKey } from "@/components/molecules/configuration/api-key";
import { EstimateStepLength } from "@/components/molecules/configuration/estimate-step-length";
import { Settings } from "lucide-react";
import * as React from "react";

export function ConfigButton() {
	return (
		<DrawerNestedRoot shouldScaleBackground={false}>
			<DrawerTrigger asChild>
				<Button variant="outline" size="icon">
					<Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
				</Button>
			</DrawerTrigger>
			<DrawerOverlay />
			<DrawerContent className="m-5">
				<DrawerTitle className="p-2">Configuration</DrawerTitle>
				<div className="grid gap-4">
					<ApiKey />
					<EstimateStepLength />
				</div>
				<DrawerClose>
					<Button variant="outline" className="mt-2">
						Close
					</Button>
				</DrawerClose>
			</DrawerContent>
		</DrawerNestedRoot>
	);
}
