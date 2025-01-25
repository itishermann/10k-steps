import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Save } from "lucide-react";

export function ApiKey() {
	return (
		<div>
			<div className="space-y-2">
				<h4 className="font-medium leading-none">Configuration</h4>
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
					/>
					<Button variant="default" size="icon" className="col-span-1">
						<Save />
					</Button>
				</div>
			</div>
		</div>
	);
}
