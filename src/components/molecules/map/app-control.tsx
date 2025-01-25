import { Control } from "@/components/atoms/control";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/atoms/drawer";
import { ColorModeToggle } from "@/components/molecules/color-mode-toggle";
import { ConfigButton } from "@/components/molecules/configuration/config-button";
import { RoutesManager } from "@/components/molecules/route-manager/routes-manager";
import { useState } from "react";

const snapPoints = [0.6, 1];

export function AppControl() {
	const [snap, setSnap] = useState<number | string | null>(snapPoints[1]);
	return (
		<Control
			position="bottomcenter"
			container={{
				className:
					"max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:flex max-md:flex-1 max-md:items-center max-md:justify-center max-md:w-screen max-md:!ml-0",
			}}
		>
			<Drawer
				dismissible={false}
				open
				snapPoints={snapPoints}
				activeSnapPoint={snap}
				setActiveSnapPoint={setSnap}
			>
				<DrawerContent className="max-w-md m-5">
					<DrawerHeader>
						<DrawerTitle>
							<div className="text-center flex justify-between flex-row items-center">
								<h1 className="text-xl mr-2">10K Steps Path Generator</h1>
								<div className="flex flex-row gap-2">
									<ColorModeToggle />
									<ConfigButton />
								</div>
							</div>
						</DrawerTitle>
						<DrawerDescription className="text-sm text-muted-foreground">
							Generate a looped path that helps you reach your daily goal of
							steps. The path generated starts and ends at your current
							location.
						</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<RoutesManager />
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Control>
	);
}
