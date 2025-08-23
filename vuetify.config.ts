import type { ThemeDefinition } from 'vuetify';
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';

const darkSide: ThemeDefinition = {
	dark: false,
	colors: {
		background: '#fcfdffff',
		surface: '#fcfdffff',
		primary: '#072a62',
		'primary-darken-1': '#eeeeeeff',
		secondary: '#03DAC6',
		'secondary-darken-1': '#018786',
		error: '#B00020',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FB8C00',
	},
};

export default defineVuetifyConfiguration({
	theme: {
		defaultTheme: 'darkSide',
		themes: {
			darkSide,
		},
	},
	defaults: {
		VTextField: {
			class: 'rounded-pill',
		},
		VInput: {
			class: 'rounded-pill',
		},
		VSelect: {
			class: 'rounded-pill',
		},
		VBtn: {
			color: 'primary',
		},
	},
});
