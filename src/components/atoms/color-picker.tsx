"use client";

import type { ButtonProps } from "@/components/atoms/button";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/atoms/popover";
import { useForwardedRef } from "@/lib/hooks/use-forwarded-ref";
import { cn } from "@/lib/utils";
import { forwardRef, useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
	value: string;
	onChange: (value: string) => void;
	onBlur?: () => void;
}

const ColorPicker = forwardRef<
	HTMLInputElement,
	Omit<ButtonProps, "value" | "onChange" | "onBlur"> & ColorPickerProps
>(
	(
		{ disabled, value, onChange, onBlur, name, className, ...props },
		forwardedRef,
	) => {
		const ref = useForwardedRef(forwardedRef);
		const [open, setOpen] = useState(false);

		const parsedValue = useMemo(() => {
			return value || "#FFFFFF";
		}, [value]);

		return (
			<Popover onOpenChange={setOpen} open={open}>
				<PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
					<Button
						{...props}
						className={cn("block", className)}
						name={name}
						onClick={() => {
							setOpen(true);
						}}
						size="icon"
						style={{
							backgroundColor: parsedValue,
						}}
						variant="outline"
					>
						<div />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full">
					<HexColorPicker color={parsedValue} onChange={onChange} />
					<Input
						maxLength={7}
						onChange={(e) => {
							onChange(e?.currentTarget?.value);
						}}
						ref={ref}
						value={parsedValue}
					/>
				</PopoverContent>
			</Popover>
		);
	},
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
