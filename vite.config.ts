import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@ui-components': path.resolve(__dirname, './src/ui-components'),
		},
	},
	// base: '/easyway-client',
});
