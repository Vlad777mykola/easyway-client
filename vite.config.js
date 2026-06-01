import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig(({ command }) => ({
	plugins: [react()],
	base: command === 'build' ? '/easyway-client/' : '/',
	resolve: {
		alias: {
			// eslint-disable-next-line no-undef
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		proxy: {
			'/auth': 'http://localhost:3000',
		},
	},
}));
