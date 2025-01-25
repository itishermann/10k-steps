import { Button } from "@/components/atoms/button";
import { Label } from "@/components/atoms/label";
import { NumberInput } from "@/components/atoms/number-input";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import { db } from "@/lib/db";
import { useCopyToClipboard } from "@/lib/use-copy-to-clipboard";
import { calculateStepLength } from "@/lib/utils";
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function EstimateStepLength() {
	const [height, setHeight] = useState<number>(180);
	const [gender, setGender] = useState<string>("female");
	const [copyToClipboard] = useCopyToClipboard();
	const stepLength = calculateStepLength(height, gender as "male" | "female");

	const handleClickOnResult = () => {
		const promise = copyToClipboard(stepLength.toFixed(2));
		toast.promise(promise, {
			loading: "Copying step length to clipboard...",
			success: "Copied the step length to your clipboard",
			error: "Failed to copy to clipboard",
		});
	};

	const handleSaveAsDefault = async () => {
		toast.loading("Saving step length as default...", { id: "save" });
		try {
			const floated = Number.parseFloat(stepLength.toFixed(2));
			await db.conf.put({ value: floated, name: "stepLength" });
			toast.success("Saved step length as default", { id: "save" });
		} catch (e) {
			toast.error("Failed to save step length as default", {
				id: "save",
				description: (e as Error).message ?? "Unknown error",
			});
		}
	};
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
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: There is no need for keyboard interactions */}
			<dl
				className="text-center my-4 cursor-copy"
				onClick={handleClickOnResult}
			>
				<dd className="text-4xl font-bold">&asymp;{stepLength.toFixed(2)}</dd>
				<dt>step length (cm)</dt>
			</dl>
			<Button variant="default" onClick={handleSaveAsDefault}>
				<Save /> Save as default
			</Button>
		</div>
	);
}
