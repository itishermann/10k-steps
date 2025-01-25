import { Label } from "@/components/atoms/label";
import { NumberInput } from "@/components/atoms/number-input";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import { calculateStepLength } from "@/lib/utils";
import { useMemo, useState } from "react";

export function EstimateStepLength() {
	const [height, setHeight] = useState<number>(180);
	const [gender, setGender] = useState<string>("female");

	const stepLength = useMemo(
		() => calculateStepLength(height, gender as "male" | "female"),
		[height, gender],
	);
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
					<NumberInput
						id="height"
						className="col-span-3"
						value={height}
						onChange={setHeight}
					/>
				</div>
				<RadioGroup
					className="grid grid-cols-2 items-center gap-2"
					onValueChange={setGender}
					defaultValue={gender}
				>
					<div className="items-center space-x-2 col-span-1">
						<RadioGroupItem value="female" id="female" />
						<Label htmlFor="female">Female</Label>
					</div>
					<div className="items-center space-x-2 col-span-1">
						<RadioGroupItem value="male" id="male" />
						<Label htmlFor="male">Male</Label>
					</div>
				</RadioGroup>
			</div>
			<dl className="text-center mt-4">
				<dd className="text-4xl font-bold">&asymp;{stepLength.toFixed(2)}</dd>
				<dt>step length (cm)</dt>
			</dl>
		</div>
	);
}
