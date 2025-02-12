import { Card, CardContent } from "@/components/atoms/card";
import { createMarkup } from "@/lib/create-markup";
import { instructionCodeToSymbol } from "@/lib/gpx-utils";
import type { Step } from "@/types/geojson";

interface InstructionItemProps {
	step: Step;
}

export function InstructionItem({
	step: { instruction, duration, distance, type, name },
}: InstructionItemProps) {
	const durationInMinutes = Math.floor(duration / 60);
	const durationInSeconds = Math.floor(duration);
	const showDuration = durationInMinutes > 0 || durationInSeconds > 0;
	const durationUnit = durationInMinutes > 0 ? "minute" : "second";
	const durationValue =
		durationInMinutes > 0 ? durationInMinutes : durationInSeconds;
	const isDurationPlural = durationValue > 1;
	const durationText = `${durationValue} ${durationUnit}${isDurationPlural ? "s" : ""}`;
	const distanceInKm = Math.floor(distance / 1000);
	const distanceInM = Math.floor(distance);
	const distanceUnit = distanceInKm > 0.5 ? "km" : "m";
	const distanceValue = distanceInKm > 0.5 ? distanceInKm : distanceInM;
	const distanceText = `${distanceValue} ${distanceUnit}`;
	return (
		<Card className="h-fit">
			<CardContent className="grid grid-cols-3 grid-rows-3 p-2 gap-1">
				<div className="row-span-2 flex items-center justify-center">
					<b
						className="text-2xl line-clamp-1 font-bold"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: the html is sanitized
						dangerouslySetInnerHTML={createMarkup(
							instructionCodeToSymbol[type],
						)}
					/>
				</div>
				<b className="col-start-1 row-start-3 flex items-center justify-center text-lg">
					{distanceText}
				</b>
				<div className="col-span-2 col-start-2 row-start-1">
					{name && name !== "-" ? "on" : ""}
					{name && name !== "-" && <b> {name}</b>}
				</div>
				<div className="col-span-2 col-start-2 row-start-2">
					{/* biome-ignore lint/security/noDangerouslySetInnerHtml: the html is sanitized */}
					<span dangerouslySetInnerHTML={createMarkup(instruction)} />
				</div>
				<small className="col-span-2 row-start-3">
					{showDuration ? `${durationText}` : ""}
				</small>
			</CardContent>
		</Card>
	);
}
