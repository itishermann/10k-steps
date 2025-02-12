class GlobalEventEmitter extends EventTarget {}

export enum EventNames {
	RenderHotPolylineHighlight = "RenderHotPolylineHighlight",
}

const globalEventEmitter = new GlobalEventEmitter();

export default globalEventEmitter;
