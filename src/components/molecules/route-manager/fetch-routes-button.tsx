import { Button } from "@/components/atoms/button";
import { appStore } from "@/lib/stores/app.store";
import * as React from "react";
import { useState } from "react";

export function FetchRoutesButton() {
	const apiKey = appStore.use.apiKey();
	const getLoopedPaths = appStore.use.getLoopedPaths();
	const [loading, setLoading] = useState(false);
	const onClick = async () => {
		try {
			setLoading(true);
			await getLoopedPaths();
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			type="button"
			loading={loading}
			disabled={!apiKey}
			onClick={onClick}
		>
			Get routes
		</Button>
	);
}
