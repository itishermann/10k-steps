import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Minus, Plus } from "lucide-react";
import type * as React from "react";

interface NumberInputProps {
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	className?: string;
	id?: string;
}

export function NumberInput({
	value,
	onChange,
	min = 0,
	max = Number.POSITIVE_INFINITY,
	step = 1,
	disabled = false,
	className = "",
	id,
}: NumberInputProps) {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = Number.parseFloat(e.target.value);
		if (!Number.isNaN(newValue) && newValue >= min && newValue <= max) {
			onChange(newValue);
		}
	};

	const handleIncrement = () => {
		const newValue = value + step;
		if (newValue <= max) {
			onChange(newValue);
		}
	};

	const handleDecrement = () => {
		const newValue = value - step;
		if (newValue >= min) {
			onChange(newValue);
		}
	};

	return (
		<div className={`flex items-center space-x-2 ${className}`}>
			<Button
				variant="outline"
				size="icon"
				onClick={handleDecrement}
				disabled={disabled || value <= min}
			>
				<Minus className="h-4 w-4" />
			</Button>
			<Input
				id={id}
				type="number"
				value={value}
				onChange={handleInputChange}
				min={min}
				max={max}
				step={step}
				disabled={disabled}
				className="w-20 text-center"
			/>
			<Button
				variant="outline"
				size="icon"
				onClick={handleIncrement}
				disabled={disabled || value >= max}
			>
				<Plus className="h-4 w-4" />
			</Button>
		</div>
	);
}
