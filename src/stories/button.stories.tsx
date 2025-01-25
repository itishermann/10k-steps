import { Button } from "@/components/atoms/button";
import type { Meta, StoryObj } from "@storybook/react";
import { Mail } from "lucide-react";

const meta: Meta<typeof Button> = {
	title: "atoms/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: { type: "select" },
			options: [
				"default",
				"destructive",
				"outline",
				"secondary",
				"ghost",
				"link",
			],
		},
		size: {
			control: { type: "select" },
			options: ["default", "sm", "lg", "icon"],
		},
		effect: {
			control: { type: "select" },
			options: [
				"expandIcon",
				"ringHover",
				"shine",
				"shineHover",
				"gooeyRight",
				"gooeyLeft",
				"underline",
				"hoverUnderline",
			],
		},
		loading: { control: "boolean" },
		disabled: { control: "boolean" },
		iconPlacement: {
			control: { type: "select" },
			options: ["left", "right"],
		},
	},
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
	render: (args) => <Button {...args}>Button</Button>,
	args: {
		variant: "default",
		size: "default",
		loading: false,
		disabled: false,
	},
};

export const WithIcon: Story = {
	render: (args) => <Button {...args}>Login with Email Button</Button>,
	args: {
		variant: "secondary",
		size: "default",
		icon: Mail,
		iconPlacement: "left",
	},
};

export const Loading: Story = {
	render: (args) => <Button {...args}>Button</Button>,
	args: {
		loading: true,
	},
};

export const Outline: Story = {
	render: (args) => <Button {...args}>Button</Button>,
	args: {
		variant: "outline",
	},
};

export const Ghost: Story = {
	render: (args) => <Button {...args}>Button</Button>,
	args: {
		variant: "ghost",
	},
};

export const Secondary: Story = {
	render: (args) => <Button {...args}>Button</Button>,
	args: {
		variant: "secondary",
	},
};

export const Link: Story = {
	render: (args) => <Button {...args}>Button</Button>,
	args: {
		variant: "link",
	},
};
