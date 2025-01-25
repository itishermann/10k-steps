import { useCallback } from "react";

export function useCopyToClipboard() {
	const copy = useCallback(async (text: string) => {
		if (!navigator?.clipboard) {
			throw new Error("Clipboard API not available in this browser.");
		}
		await navigator.clipboard.writeText(text);
		return true;
	}, []);

	return [copy];
}
