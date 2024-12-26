// eslint.config.js

import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import cssModules from 'eslint-plugin-css-modules';

export default [
	// Base JavaScript recommended rules
	js.configs.recommended,

	// TypeScript-specific rules
	{
		files: ['src/**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser, // Add browser globals like 'document'
			},
		},
		plugins: {
			'css-modules': cssModules,
			'@typescript-eslint': tseslint,
		},
		rules: {
			...tseslint.configs.recommended.rules, // Use recommended TypeScript rules
			'@typescript-eslint/no-unused-vars': ['error'],
			'css-modules/no-unused-class': 'error',
		},

		ignores: ['dist/', 'node_modules/'],
	},

	// React-specific rules
	{
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules, // React hooks recommended rules
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		},
	},

	// Prettier integration
	{
		plugins: {
			prettier,
		},
		rules: {
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
					useTabs: true,
					semi: true,
					trailingComma: 'all',
					bracketSpacing: true,
					printWidth: 100,
					endOfLine: 'auto',
				},
			],
		},
	},
];
