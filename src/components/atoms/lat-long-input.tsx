import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { cn } from "@/lib/utils";
import { type ChangeEvent, useCallback, useState } from "react";

interface CoordinateInputProps {
	latitude: number | null;
	longitude: number | null;
	onCoordinatesChange: (lat: number | null, lng: number | null) => void;
	error?: string;
}

export function CoordinateInput({
	latitude,
	longitude,
	onCoordinatesChange,
	error,
}: CoordinateInputProps) {
	const [localLat, setLocalLat] = useState<string | null>(
		latitude === null ? "" : String(latitude),
	);
	const [localLng, setLocalLng] = useState<string | null>(
		longitude === null ? "" : String(longitude),
	);

	const validateAndNotify = useCallback(
		(latStr: string | null, lngStr: string | null) => {
			let lat: number | null = null;
			let lng: number | null = null;

			if (latStr) {
				const parsedLat = Number.parseFloat(latStr);
				if (!Number.isNaN(parsedLat) && parsedLat >= -90 && parsedLat <= 90) {
					lat = parsedLat;
				} else {
					onCoordinatesChange(null, null);
					return;
				}
			}

			if (lngStr) {
				const parsedLng = Number.parseFloat(lngStr);
				if (!Number.isNaN(parsedLng) && parsedLng >= -180 && parsedLng <= 180) {
					lng = parsedLng;
				} else {
					onCoordinatesChange(null, null);
					return;
				}
			}

			onCoordinatesChange(lat, lng);
		},
		[onCoordinatesChange],
	);

	const handleLatChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setLocalLat(e.target.value);
			validateAndNotify(e.target.value, localLng);
		},
		[localLng, validateAndNotify],
	);

	const handleLngChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setLocalLng(e.target.value);
			validateAndNotify(localLat, e.target.value);
		},
		[localLat, validateAndNotify],
	);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-2">
				<div className="grid gap-1">
					<Label htmlFor="latitude">Latitude</Label>
					<Input
						id="latitude"
						type="text"
						placeholder="e.g. 34.0522"
						value={localLat || ""}
						onChange={handleLatChange}
						className={cn(error && "ring-red-500")}
					/>
				</div>

				<div className="grid gap-1">
					<Label htmlFor="longitude">Longitude</Label>
					<Input
						id="longitude"
						type="text"
						placeholder="e.g. -118.2437"
						value={localLng || ""}
						onChange={handleLngChange}
						className={cn(error && "ring-red-500")}
					/>
				</div>
			</div>
			{error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	);
}
