import { Button } from "@/components/atoms/button";
import {
	Popover,
	PopoverArrow,
	PopoverContent,
	PopoverTrigger,
} from "@/components/atoms/popover";
import { ApiKey } from "@/components/molecules/configuration/api-key";
import { EstimateStepLength } from "@/components/molecules/configuration/estimate-step-length";
import { Settings } from "lucide-react";
import * as React from "react";

export function ConfigButton() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon">
					<Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="grid gap-4">
					<ApiKey />
					<EstimateStepLength />
				</div>
				<PopoverArrow />
			</PopoverContent>
		</Popover>
	);
}
