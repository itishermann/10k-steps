import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { db } from "@/lib/db";
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ApiKey() {
	const [apiKey, setApiKey] = useState<string>("");

	const handleSaveAsDefault = async () => {
		const toastId = "save-api-key";
		toast.loading("Saving api key...", { id: toastId });
		try {
			await db.conf.put({ value: apiKey, name: "orsApiKey" });
			toast.success("Saved api key", { id: toastId });
		} catch (e) {
			toast.error("Failed to save api key", {
				id: toastId,
				description: (e as Error).message ?? "Unknown error",
			});
		}
	};
	return (
		<div>
			<div className="space-y-2">
				<p className="text-sm text-muted-foreground">
					Provide an api key in order to use the OpenRouteService API. You can
					get one for free by signing up at{" "}
					<a
						href="https://openrouteservice.org/sign-up/"
						rel="noreferrer"
						target="_blank"
					>
						openrouteservice.org
					</a>
				</p>
			</div>
			<div className="grid gap-2">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="ors-apikey">API Key</Label>
					<Input
						id="ors-apikey"
						className="col-span-2"
						type="password"
						autoComplete="off"
						value={apiKey}
						onChange={(e) => setApiKey(e.target.value)}
						minLength={5}
					/>
					<Button
						variant="default"
						size="icon"
						className="col-span-1"
						onClick={handleSaveAsDefault}
					>
						<Save />
					</Button>
				</div>
			</div>
		</div>
	);
}
