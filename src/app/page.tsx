"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-gpx";
import { AppControl } from "@/components/molecules/map/app-control";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Home() {
	return (
		<main className="h-screen w-screen">
			<MapContainer
				center={[45.552429, 6.45343]}
				zoom={13}
				scrollWheelZoom
				className="h-full w-screen"
			>
				<TileLayer
					attribution='&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Built by <a target="_blank" href="https://itishermann.me">Hermann Kao</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[45.552429, 6.45343]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
				<AppControl />
			</MapContainer>
		</main>
	);
}
