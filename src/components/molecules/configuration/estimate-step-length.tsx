import { Button } from "@/components/atoms/button";
import { Label } from "@/components/atoms/label";
import { NumberInput } from "@/components/atoms/number-input";
import { Save } from "lucide-react";
import * as React from "react";

export function EstimateStepLength() {
	return (
		<div>
			<div className="space-y-2 border-t pt-4">
				<h4 className="font-medium leading-none">Estimate your step length</h4>
				<p className="text-sm text-muted-foreground">
					Based on your height and your gender, we can estimate your step length
					using the following formula: height * 0.413 if you are a female, and
					height * 0.415 if you are a male. source:{" "}
					<a
						href="https://marathonhandbook.com/average-stride-length/"
						rel="noreferrer"
						target="_blank"
					>
						marathonhandbook.com
					</a>
				</p>
			</div>
			<div className="grid gap-2">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="height">Height</Label>
					<NumberInput id="height" className="col-span-3" />
				</div>
			</div>
		</div>
	);
}
