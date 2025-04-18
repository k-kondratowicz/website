import eslint from '@nabla/vite-plugin-eslint';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import checker from 'vite-plugin-checker';
import sitempa from 'vite-plugin-sitemap';

const fullPath = import.meta.url.slice(0, import.meta.url.lastIndexOf('/'));

export default defineConfig({
	plugins: [
		eslint(),
		checker({
			typescript: true,
			eslint: {
				useFlatConfig: false,
				lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}" --config ./.eslintrc.cjs',
			},
		}),
		babel({
			preset: '@babel/preset-env',
		}),
		{
			handleHotUpdate({ file, server }) {
				if (file.endsWith('.html')) {
					server.ws.send({ type: 'full-reload', path: '*' });
				}
			},
		},
		sitempa({
			hostname: 'https://kkondratowicz.pl',
			exclude: ['/googlecf7b814f707ec9bf', '/404'],
		}),
	],

	css: {
		devSourcemap: true,

		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',

				additionalData: `
					@import '${fullPath}/src/scss/abstracts/index.scss';
					@import '${fullPath}/src/scss/mixins/index.scss';
				`,

				silenceDeprecations: ['import'],
			},
		},

		postcss: {
			plugins: [autoprefixer()],
		},
	},

	build: {
		manifest: false,
		assetsInlineLimit: 0,
		rollupOptions: {
			input: ['index.html', 'src/js/main.ts', 'src/scss/main.scss'],
			output: {
				assetFileNames: asset => {
					if ((asset?.originalFileNames ?? []).every(f => f.includes('favicon/'))) {
						return `[name].[ext]`;
					}

					return `assets/[name]-[hash].[ext]`;
				},
			},
		},
	},

	server: {
		cors: {
			origin: '*',
		},
		strictPort: true,
		port: 5173,
	},

	resolve: {
		alias: {
			'@fonts': '/fonts',
			'@images': '/images',
			'@': resolve(fullPath + '/src/js'),
			'@root': process.env.NODE_ENV === 'development' ? resolve(fullPath) : '',
			'@public': process.env.NODE_ENV === 'development' ? resolve(fullPath + '/public') : '/',
		},
	},
});
