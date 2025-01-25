import { Button } from "@/components/atoms/button";
import { Label } from "@/components/atoms/label";
import { NumberInput } from "@/components/atoms/number-input";
import { db } from "@/lib/db";
import { useRoutingService } from "@/lib/hooks/use-routing-service";
import type { Point } from "@/lib/routing-client";
import { liveQuery } from "dexie";
import { LocateFixed, RefreshCcw } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import { toast } from "sonner";

export function RoutesForm() {
	const [loading, setLoading] = useState(false);
	const [stepAmount, setStepAmount] = useState<number>(10000);
	const [stepLength, setStepLength] = useState<number>(73.5);
	const [startPoint, setStartPoint] = useState<Point | null>(null);
	const [getRoutes, isReady] = useRoutingService();
	const map = useMap();

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			if (!startPoint) {
				throw new Error(
					"No starting point available, please refresh your location and try again",
				);
			}
			await getRoutes(startPoint, stepLength, stepAmount);
		} catch (error) {
			toast.error("An error occurred", {
				description: (error as Error)?.message ?? "Unknown error",
				duration: 5000,
			});
		} finally {
			setLoading(false);
		}
	};

	const refreshLocation = () =>
		map.locate({
			setView: true,
			maxZoom: 13,
			enableHighAccuracy: true,
		});

	useMapEvent("locationfound", (e) =>
		setStartPoint({
			lat: e.latlng.lat,
			lng: e.latlng.lng,
		}),
	);

	useEffect(() => {
		refreshLocation();
		const obs = liveQuery(() => db.conf.get("stepLength"));
		const sub = obs.subscribe({
			next: (c) =>
				c?.value && setStepLength(Number.parseFloat(c?.value?.toString())),
		});
		return () => sub.unsubscribe();
	}, []);

	return (
		<form onSubmit={onSubmit} className="grid gap-1 grid-cols-7">
			<div className="col-span-2 grid grid-cols-1 items-center">
				<Label htmlFor="step-length" className="text-center col-span-1">
					Length
				</Label>
				<NumberInput
					id="step-length"
					min={1}
					value={stepLength}
					onChange={setStepLength}
					step={0.0001}
					className="col-span-1"
					hideControls
					disabled={loading}
				/>
			</div>
			<div className="col-span-3 grid grid-cols-1 items-center">
				<Label htmlFor="step-amount" className="text-center col-span-1">
					Amount
				</Label>
				<NumberInput
					id="step-amount"
					min={100}
					value={stepAmount}
					onChange={setStepAmount}
					step={10}
					className="col-span-1"
					disabled={loading}
				/>
			</div>
			<Button
				type="button"
				size="icon"
				className="col-span-1 self-end"
				onClick={refreshLocation}
				disabled={loading}
			>
				<LocateFixed />
			</Button>
			<Button
				type="submit"
				size="icon"
				className="col-span-1 self-end"
				disabled={!isReady}
				loading={loading}
			>
				<RefreshCcw />
			</Button>
		</form>
	);
}
