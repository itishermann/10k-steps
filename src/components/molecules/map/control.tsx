import L from "leaflet";
import React, {
	createRef,
	type HTMLAttributes,
	type ReactNode,
	useEffect,
	useState,
} from "react";
import { useMap } from "react-leaflet";

interface Props {
	position: L.ControlPosition;
	children?: ReactNode;
	container?: HTMLAttributes<HTMLDivElement>;
	prepend?: boolean;
}

const POSITION_CLASSES = {
	bottomleft: "leaflet-bottom leaflet-left",
	bottomright: "leaflet-bottom leaflet-right",
	topleft: "leaflet-top leaflet-left",
	topright: "leaflet-top leaflet-right",
};

export function Control(props: Props) {
	const [portalRoot, setPortalRoot] = useState<any>(
		document.createElement("div"),
	);
	const positionClass =
		(props.position && POSITION_CLASSES[props.position]) ||
		POSITION_CLASSES.topright;
	const controlContainerRef = createRef<HTMLDivElement>();
	const map = useMap();

	/**
	 * Whenever the control container ref is created,
	 * Ensure the click / scroll propagation is removed
	 * This way click/scroll events do not bubble down to the map
	 */
	useEffect(() => {
		if (controlContainerRef.current !== null) {
			L.DomEvent.disableClickPropagation(controlContainerRef.current);
			L.DomEvent.disableScrollPropagation(controlContainerRef.current);
		}
	}, [controlContainerRef]);

	/**
	 * Whenever the position is changed, go ahead and get the container of the map and the first
	 * instance of the position class in that map container
	 */
	useEffect(() => {
		const mapContainer = map.getContainer();
		const targetDiv = mapContainer.getElementsByClassName(positionClass);
		setPortalRoot(targetDiv[0]);
	}, [positionClass]);

	/**
	 * Whenever the portal root is complete,
	 * append or prepend the control container to the portal root
	 */
	useEffect(() => {
		if (portalRoot !== null) {
			if (props.prepend !== undefined && props.prepend) {
				portalRoot.prepend(controlContainerRef.current);
			} else {
				portalRoot.append(controlContainerRef.current);
			}
		}
	}, [portalRoot, props.prepend, controlContainerRef]);

	/**
	 * Concatenate the props.container className to the class of the control div
	 */
	const className = `${props.container?.className?.concat(" ") || ""}leaflet-control`;

	/**
	 * Render
	 */
	return (
		<div {...props.container} ref={controlContainerRef} className={className}>
			{props.children}
		</div>
	);
}
