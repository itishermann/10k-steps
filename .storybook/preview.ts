import type { Preview } from "@storybook/react";
import "@/styles/globals.css";
import "@/styles/typography.css";

import { withThemeByClassName } from "@storybook/addon-themes";

export const decorators = [
	withThemeByClassName({
		themes: {
			light: "light",
			dark: "dark",
		},
		defaultTheme: "light",
	}),
];

const preview: Preview = {
	parameters: {
		// actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
