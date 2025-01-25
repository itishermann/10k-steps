import { cn } from "@/lib/utils";
import React from "react";

export const ErrorMessage = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
	const body = children && typeof children === "string" ? children : null;

	if (!body) {
		return null;
	}

	return (
		<p
			ref={ref}
			className={cn("text-[0.8rem] font-medium text-destructive", className)}
			{...props}
		>
			{body}
		</p>
	);
});
ErrorMessage.displayName = "ErrorMessage";
