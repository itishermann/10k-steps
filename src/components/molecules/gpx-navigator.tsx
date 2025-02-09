"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-gpx";
import { Button } from "@/components/atoms/button";
import { Control } from "@/components/atoms/control";
import { latLng } from "leaflet";
import type React from "react";
import { useEffect, useState } from "react";
import {
	MapContainer,
	Marker,
	Polyline,
	Popup,
	TileLayer,
} from "react-leaflet";
import { parseString } from "xml2js";

interface GpxNavigatorProps {
	gpxString: string;
}

interface Instruction {
	description: string;
	position: [number, number];
	distance: number;
}

export function GpxNavigator({ gpxString }: GpxNavigatorProps) {
	const [coordinates, setCoordinates] = useState<[number, number][]>([]);
	const [instructions, setInstructions] = useState<Instruction[]>([]);
	const [currentInstruction, setCurrentInstruction] = useState<number>(0);
	const [isNavigating, setIsNavigating] = useState(false);
	const [userPosition, setUserPosition] = useState<[number, number] | null>(
		null,
	);

	useEffect(() => {
		// Parse GPX string
		parseString(gpxString, (err, result) => {
			if (err) {
				console.error("Error parsing GPX:", err);
				return;
			}

			// Extract coordinates and instructions
			const rtept = result.gpx.rte[0].rtept;
			const coords: [number, number][] = [];
			const navInstructions: Instruction[] = [];

			for (const point of rtept) {
				const lat = Number.parseFloat(point.$.lat);
				const lon = Number.parseFloat(point.$.lon);
				coords.push([lat, lon]);

				if (point.desc) {
					navInstructions.push({
						description: point.desc[0],
						position: [lat, lon],
						distance: point.extensions[0].distance
							? Number.parseFloat(point.extensions[0].distance[0])
							: 0,
					});
				}
			}

			setCoordinates(coords);
			setInstructions(navInstructions);
		});
	}, [gpxString]);

	useEffect(() => {
		if (isNavigating) {
			// Start watching user position
			const watchId = navigator.geolocation.watchPosition(
				(position) => {
					setUserPosition([
						position.coords.latitude,
						position.coords.longitude,
					]);

					// Check if user is close to next instruction point
					if (instructions[currentInstruction]) {
						const userLoc = latLng(
							position.coords.latitude,
							position.coords.longitude,
						);
						const instructionLoc = latLng(
							instructions[currentInstruction].position[0],
							instructions[currentInstruction].position[1],
						);

						if (userLoc.distanceTo(instructionLoc) < 20) {
							// 20 meters threshold
							setCurrentInstruction((prev) => prev + 1);
						}
					}
				},
				(error) => console.error("Error getting location:", error),
				{ enableHighAccuracy: true },
			);

			return () => navigator.geolocation.clearWatch(watchId);
		}
	}, [isNavigating, currentInstruction, instructions]);

	const startNavigation = () => {
		setIsNavigating(true);
		setCurrentInstruction(0);
	};

	console.log("coordinates", coordinates);
	console.log("instructions", instructions);
	console.log("currentInstruction", currentInstruction);

	return (
		<main className="h-screen w-screen">
			<MapContainer
				center={coordinates[0] || [45.552429, 6.45343]}
				zoom={13}
				scrollWheelZoom
				className="h-full w-screen"
			>
				<TileLayer
					attribution='&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Built by <a target="_blank" href="https://itishermann.me">Hermann Kao</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{coordinates.length > 0 && (
					<Polyline positions={coordinates} color="blue" />
				)}

				{userPosition && (
					<Marker position={userPosition}>
						<Popup>You are here</Popup>
					</Marker>
				)}
				<Control position="bottomleft">
					{!isNavigating ? (
						<Button onClick={startNavigation}>Start Navigation</Button>
					) : (
						<div className="bg-white">
							<h3>Current Instruction:</h3>
							<p>
								{instructions[currentInstruction]?.description ||
									"Navigation complete!"}
							</p>
							<p>
								Distance:{" "}
								{instructions[currentInstruction]?.distance.toFixed(0)}m
							</p>
						</div>
					)}
				</Control>
			</MapContainer>
		</main>
	);
}
