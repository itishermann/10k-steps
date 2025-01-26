import type { Route } from "@/lib/entities/route";
// import { getWalkingInstructions } from "@/lib/get-walking-instruction";
import { renameGpxTrack } from "@/lib/gpx-utils";
import { cn } from "@/lib/utils";
// import { parseGPX } from "@we-gold/gpxjs";
import L from "leaflet";
import { Download, Eye, EyeOff, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import type * as React from "react";
import { useMap } from "react-leaflet";

interface RouteItemProps {
	data: Route;
}

export function RouteItem({
	data: { path: gpxPath, color, stepLength },
}: RouteItemProps) {
	const [isShown, setIsShown] = useState(false);
	const VisibilityIcon = isShown ? EyeOff : Eye;
	const map = useMap();
	const gpx = useMemo(
		() =>
			new L.GPX(gpxPath, {
				async: false,
				polyline_options: { color },
			}),
		[gpxPath, color],
	);

	const onView = () => {
		gpx.addTo(map);
		map.fitBounds(gpx.getBounds());
		setIsShown(true);
	};

	const onHide = () => {
		gpx.removeFrom(map);
		setIsShown(false);
	};

	const onClick = () => {
		// const [parsedFile, error] = parseGPX(gpxPath);
		// if (error) {
		// 	console.error(error);
		// 	return;
		// }
		// console.log(parsedFile?.routes[0].points);
		// console.log(getWalkingInstructions(parsedFile?.routes[0].points));
		if (isShown) {
			onHide();
		} else {
			onView();
		}
	};

	const distanceInKm = (gpx.get_distance() / 1000).toFixed(2);
	const stepAmount = Math.round((gpx.get_distance() * 100) / stepLength);

	const downloadGpxFile = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		const filename = `${Math.round(Number(distanceInKm))}_km_walk_${stepAmount}_steps_track.gpx`;
		const renamedTrack = renameGpxTrack(
			gpxPath,
			filename.replaceAll("_", " ").replace(".gpx", ""),
		);
		const blob = new Blob([renamedTrack], { type: "application/gpx+xml" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div
			onClick={onClick}
			className={cn(
				"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				"h-15 border p-2 grid grid-cols-9 items-center justify-center cursor-pointer",
				isShown && "bg-accent",
			)}
			onKeyDown={(e) => e.key === "Enter" && onClick()}
		>
			<dl className="text-center col-span-2">
				<dd className="font-bold">{distanceInKm}</dd>
				<dt className="text-muted-foreground">km</dt>
			</dl>
			<dl className="text-center col-span-2">
				<dd className="font-bold">&asymp;{stepAmount}</dd>
				<dt className="text-muted-foreground">steps</dt>
			</dl>
			<dl className="text-center col-span-2">
				<dd className="font-bold">&asymp;{stepLength.toFixed(2)}</dd>
				<dt className="text-muted-foreground">cm/steps</dt>
			</dl>
			<VisibilityIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all col-span-1" />
			<button onClick={downloadGpxFile} className="col-span-1" type="button">
				<Download className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-blue-500" />
			</button>
			<Trash className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all col-span-1 text-red-500" />
		</div>
	);
}
