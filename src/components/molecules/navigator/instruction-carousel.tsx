import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/atoms/carousel";
import { InstructionItem } from "@/components/molecules/navigator/instruction-item";
import { EventNames } from "@/lib/event-emitter";
import { useEventEmitter } from "@/lib/hooks/use-event-emitter";
import { cn } from "@/lib/utils";
import type { OrsFeaturesCollection } from "@/types/geojson";
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
	const [selectedIndex, setSelectedIndex] = useState(0);
	const { publishEvent } = useEventEmitter(
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
			setSelectedIndex(a.selectedScrollSnap());
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
				align: "center",
			}}
			className="w-full"
		>
			<CarouselContent>
				{steps.map((step, index) => (
					<CarouselItem
						key={`${step.instruction}_${step.distance}_${step.way_points.toString()}`}
						className={cn(
							"md:basis-1/2 lg:basis-1/3 xl:basis-1/4 md:scale-75",
							index === selectedIndex &&
								"md:transform md:scale-100 md:transition-transform md:duration-300 md:ease-in-out",
							index === steps.length - 1 && "md:mr-[30%]",
							index === 0 && "md:ml-[30%]",
						)}
						onClick={() => api?.scrollTo(index)}
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
