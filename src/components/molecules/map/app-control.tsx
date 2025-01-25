import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/atoms/card";
import { ColorModeToggle } from "@/components/molecules/color-mode-toggle";
import { ConfigButton } from "@/components/molecules/configuration/config-button";
import { Control } from "@/components/molecules/map/control";

export function AppControl() {
	return (
		<Control
			position="bottomcenter"
			container={{
				className:
					"max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:flex max-md:flex-1 max-md:items-center max-md:justify-center max-md:w-screen max-md:!ml-0",
			}}
		>
			<Card className=" mb-2">
				<CardHeader>
					<CardTitle className="text-center flex justify-between flex-row items-center">
						<h1 className="text-xl mr-2">10K Steps Path Generator</h1>
						<div className="flex flex-row gap-2">
							<ColorModeToggle />
							<ConfigButton />
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent className="overflow-y-auto max-h-[90vh]"></CardContent>
			</Card>
		</Control>
	);
}
