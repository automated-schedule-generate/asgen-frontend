// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: false },

	future: {
		compatibilityVersion: 4,
	},

	modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/fonts', 'vuetify-nuxt-module', '@pinia/nuxt'],

	ssr: false,

	// when enabling ssr option you need to disable inlineStyles and maybe devLogs
	features: {
		inlineStyles: false,
		devLogs: false,
	},
	css: ['vuetify/styles', '~/assets/settings.scss'],
	build: {
		transpile: ['vuetify'],
	},

	vite: {
		optimizeDeps: {
			include: [
				'vuetify',
				'axios',
				'socket.io-client',
				'flatted',
				'sortablejs',
				'sweetalert2',
			],
			entries: ['vuetify.config.ts'],
		},
		server: {
			allowedHosts: true,
		},
	},

	vuetify: {
		moduleOptions: {
			// check https://nuxt.vuetifyjs.com/guide/server-side-rendering.html
			ssrClientHints: {
				reloadOnFirstRequest: false,
				viewportSize: true,
				prefersColorScheme: false,

				prefersColorSchemeOptions: {
					useBrowserThemeOnly: false,
				},
			},

			// /* If customizing sass global variables ($utilities, $reset, $color-pack, $body-font-family, etc) */
			//disableVuetifyStyles: true,
			styles: {
				configFile: 'assets/settings.scss',
			},
		},
	},

	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title: 'Gerador de grade de horarios',
			meta: [
				{
					name: 'description',
					content: 'Gerador de grade de horarios',
				},
			],
			script: [
				{
					src: '/js/vlibras.js',
					tagPosition: 'bodyClose',
				},
			],
		},
	},
});
