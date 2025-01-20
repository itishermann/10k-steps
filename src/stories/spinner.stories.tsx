import type { Meta, StoryObj } from "@storybook/react";

import { Spinner } from "@/components/atoms/spinner";

const meta: Meta<typeof Spinner> = {
	title: "ui/Spinner",
	component: Spinner,
	tags: ["autodocs"],
	argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Small: Story = {
	render: (args) => <Spinner {...args}>Label</Spinner>,
	args: {
		size: "small",
	},
};
export const Medium: Story = {
	render: (args) => <Spinner {...args}>Label</Spinner>,
	args: {
		size: "medium",
	},
};
export const Large: Story = {
	render: (args) => <Spinner {...args}>Label</Spinner>,
	args: {
		size: "large",
	},
};
