import globalEventEmitter, {
	type EventNames,
	type EventMap,
} from "@/lib/event-emitter";
import { useCallback, useEffect, useRef, useState } from "react";

export const useEventEmitter = <TEventName extends EventNames>(
	eventName: TEventName,
) => {
	const [eventData, setEventData] = useState<EventMap[TEventName]>();
	const skipRerender = useRef(false);

	const publishEvent = useCallback(
		(eventData: EventMap[TEventName], skipRender = true) => {
			skipRerender.current = skipRender;
			const event = new CustomEvent(eventName, { detail: eventData });
			globalEventEmitter.dispatchEvent(event);
		},
		[eventName],
	);

	useEffect(() => {
		const listener = (event: Event) => {
			if (skipRerender.current) {
				skipRerender.current = false;
				return;
			}
			setEventData((event as CustomEvent<EventMap[TEventName]>).detail);
		};

		globalEventEmitter.addEventListener(eventName, listener);

		return () => {
			globalEventEmitter.removeEventListener(eventName, listener);
		};
	}, [eventName]);

	return { eventData, publishEvent };
};
