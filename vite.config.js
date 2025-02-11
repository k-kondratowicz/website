import eslint from '@nabla/vite-plugin-eslint';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import checker from 'vite-plugin-checker';

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
			'@': resolve(fullPath + '/src/js'),
			'@root': process.env.NODE_ENV === 'development' ? resolve(fullPath) : '',
			'@public': process.env.NODE_ENV === 'development' ? resolve(fullPath + '/public') : '/',
		},
	},
});
