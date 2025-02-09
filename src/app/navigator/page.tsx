"use client";
import { GpxNavigator } from "@/components/molecules/gpx-navigator";
import { db } from "@/lib/db";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function Navigation(props: {
	searchParams: SearchParams;
}) {
	const searchParams = use(props.searchParams);
	const gpxId = searchParams.gpxId;
	const [loading, setLoading] = useState(true);
	const [gpxString, setGpxString] = useState<string | null>(null);

	const getGpxString = async (gpxId: string) => {
		setLoading(true);
		try {
			const d = await db.route.get(gpxId);
			if (!d) {
				toast.error(`Gpx with id: ${gpxId} not found`);
				return;
			}
			setGpxString(d.path);
		} catch (error) {
			toast.error(`Failed to load GPX file with id: ${gpxId}`);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (gpxId) {
			getGpxString(gpxId);
		}
	}, [gpxId]);

	if (!gpxId || typeof gpxId !== "string") {
		return <div>GPXId not provided</div>;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!gpxString) {
		return <div>Failed to load GPX file with id: {gpxId}</div>;
	}

	return <GpxNavigator gpxString={gpxString} />;
}
