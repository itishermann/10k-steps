import globalEventEmitter, { type EventNames } from "@/lib/event-emitter";
import { useCallback, useEffect, useRef, useState } from "react";

export const useEventEmitter = <T>(eventName: EventNames) => {
	const [eventData, setEventData] = useState<T>();
	const skipRerender = useRef(false);

	const publishEvent = useCallback(
		(eventData: T, skipRender = true) => {
			skipRerender.current = skipRender;
			const event = new CustomEvent(eventName, { detail: eventData });
			globalEventEmitter.dispatchEvent(event);
		},
		[eventName],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: the skipRerender is used to prevent rerendering when the event is published
	useEffect(() => {
		const listener = (event: Event) => {
			if (skipRerender.current) {
				skipRerender.current = false;
				return;
			}
			setEventData((event as CustomEvent).detail);
		};

		globalEventEmitter.addEventListener(eventName, listener);

		// Cleanup subscription on unmount
		return () => {
			globalEventEmitter.removeEventListener(eventName, listener);
		};
	}, [eventName, skipRerender]);

	return { eventData, publishEvent };
};
