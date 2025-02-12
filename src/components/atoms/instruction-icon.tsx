interface InstructionIconProps {
	instructionType: number;
}

export function InstructionIcon({ instructionType }: InstructionIconProps) {
	return (
		<span
			dangerouslySetInnerHTML={{
				__html: instructionCodeToSymbol[instructionType],
			}}
		/>
	);
}
