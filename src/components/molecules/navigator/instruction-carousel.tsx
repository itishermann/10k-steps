import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/atoms/carousel";
import type { InstructionHighlighterProps } from "@/components/molecules/navigator/instruction-highlighter";
import { InstructionItem } from "@/components/molecules/navigator/instruction-item";
import { EventNames } from "@/lib/event-emitter";
import { useEventEmitter } from "@/lib/hooks/use-event-emitter";
import type { OrsFeaturesCollection, Step } from "@/types/geojson";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";

interface InstructionCarouselProps {
	geojson: OrsFeaturesCollection;
}

export function InstructionCarousel({ geojson }: InstructionCarouselProps) {
	const steps = useMemo(
		() => geojson.features[0].properties.segments[0].steps,
		[geojson],
	);
	const [api, setApi] = useState<CarouselApi>();
	const [selectedStep, setSelectedStep] = useState<Step>(steps[0]);
	const { publishEvent } = useEventEmitter<InstructionHighlighterProps>(
		EventNames.RenderHotPolylineHighlight,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: api is the only dependency needed
	useEffect(() => {
		if (!api) return;
		// implement map listener to update carousel instruction based on the current position and instruction's waypoints coordinates
		// L.map("turn-by-turn-navigator-map").on("locationfound", (e) => {
		// 	console.log("location found", e);
		// });
		api.on("select", (a) => {
			const s = steps[a.selectedScrollSnap()];
			if (!s) return;
			const [sliceStart, sliceEnd] = s.way_points;
			const coordinates = geojson.features[0].geometry.coordinates
				.slice(sliceStart, sliceEnd + 1)
				.map(([lng, lat]) => new L.LatLng(lat, lng));
			publishEvent({
				coordinates,
				options: {
					color: "#3388ff", // Border color
					weight: 3, // Border width
					opacity: 1, // Border opacity
					fill: false, // Enable fill
					fillColor: "transparent", // Transparent fill
					fillOpacity: 0, // Make fill fully transparent
				},
				fitBounds: true,
			});
		});
	}, [api]);

	return (
		<Carousel
			setApi={setApi}
			opts={{
				align: "start",
			}}
			orientation="horizontal"
			className="w-full"
		>
			<CarouselContent>
				{steps.map((step, index) => (
					<CarouselItem
						key={`${step.instruction}_${step.distance}_${step.way_points.toString()}`}
						className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
					>
						<InstructionItem step={step} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
