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
	return (
		<Card className="h-fit">
			<CardContent className="grid grid-cols-3 grid-rows-3 p-2 gap-1">
				<div className="row-span-2 flex items-center justify-center">
					<span
						className="text-2xl line-clamp-1"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: the html is sanitized
						dangerouslySetInnerHTML={createMarkup(
							instructionCodeToSymbol[type],
						)}
					/>
				</div>
				<div className="col-start-1 row-start-3 flex items-center justify-center ">
					{distance > 0.5 ? `${Math.floor(distance)}m` : ""}
				</div>
				<div className="col-span-2 col-start-2 row-start-1">
					{name && name !== "-" ? `on ${name}` : ""}
				</div>
				<div className="col-span-2 col-start-2 row-start-2">
					{/* biome-ignore lint/security/noDangerouslySetInnerHtml: the html is sanitized */}
					<span dangerouslySetInnerHTML={createMarkup(instruction)} />
				</div>
				<div className="col-span-2 row-start-3">
					{/* duration formatted in minutes or seconds if less than a minute */}
					{duration < 60
						? `${Math.floor(duration)} seconds`
						: `${Math.floor(duration / 60)} minutes`}
				</div>
			</CardContent>
		</Card>
	);
}
