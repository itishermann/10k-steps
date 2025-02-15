import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "@/components/atoms/label";

const meta: Meta<typeof Label> = {
	title: "atoms/Label",
	component: Label,
	tags: ["autodocs"],
	argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Base: Story = {
	render: (args) => <Label htmlFor="email">Your email address</Label>,
	args: {},
};
