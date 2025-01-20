import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/atoms/card";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
	title: "ui/Card",
	component: Card,
	tags: ["autodocs"],
	argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Base: Story = {
	render: (args) => (
		<Card {...args}>
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>This is the card description.</CardDescription>
			</CardHeader>
			<CardContent>
				<p>This is the card content.</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	),
	args: {},
};
