import boundaries from 'eslint-plugin-boundaries';

export const eslintBoundariesConfig = {
	plugins: {
		boundaries,
	},
	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},

		'boundaries/elements': [
			// {
			// 	type: 'app',
			// 	pattern: './src/app',
			// },
			{
				type: 'context',
				pattern: './src/context',
			},
			{
				type: 'features',
				pattern: './src/features/*',
			},
			{
				type: 'layouts',
				pattern: './src/layouts',
			},
			{
				type: 'modules',
				pattern: './src/modules',
			},
			{
				type: 'pages',
				pattern: './src/pages',
			},
			{
				type: 'router',
				pattern: './src/router',
			},
			{
				type: 'shared',
				pattern: './src/shared',
			},
			{
				type: 'store',
				pattern: './src/store',
			},
			{
				type: 'ui-components',
				pattern: './src/ui-components/*',
			},
			{
				type: 'ui-design-atoms',
				pattern: './src/ui-components/*',
			},
		],
	},
	// [ 'context', 'features', 'layouts', 'modules', 'pages', 'router','shared', 'store', 'ui-components', 'ui-design-atoms' ],

	rules: {
		'boundaries/element-types': [
			2,
			{
				default: 'allow',
				rules: [
					{
						from: 'context',
						disallow: [
							'features',
							'layouts',
							'modules',
							'pages',
							'router',
							'store',
							'ui-components',
							'ui-design-atoms',
						],
						message:
							'The module of the lower layer (${file.type}) cannot import the module of the higher layer (${dependency.type})',
					},
					{
						from: 'features',
						disallow: [
							// 'context',
							// 'features',
							'layouts',
							'modules',
							'pages',
							'router',
							// 'shared',
							// 'store',
							// 'ui-components',
							// 'ui-design-atoms',
						],
						message:
							'The module of the lower layer (${file.type}) cannot import the module of the higher layer (${dependency.type})',
					},
					{
						from: 'layouts',
						disallow: [
							// 'context',
							// 'features',
							// 'layouts',
							'modules',
							'pages',
							'router',
							// 'shared',
							// 'store',
							// 'ui-components',
							// 'ui-design-atoms',
						],
						message:
							'The module of the lower layer (${file.type}) cannot import the module of the higher layer (${dependency.type})',
					},
					{
						from: 'modules',
						disallow: [
							// 'context',
							// 'features',
							'layouts',
							'modules',
							'pages',
							'router',
							// 'shared',
							// 'store',
							// 'ui-components',
							// 'ui-design-atoms',
						],
						message:
							'The module of the lower layer (${file.type}) cannot import the module of the higher layer (${dependency.type})',
					},
					{
						from: 'pages',
						disallow: [
							'context',
							// 'features',
							'layouts',
							// 'modules',
							'pages',
							'router',
							// 'shared',
							// 'store',
							// 'ui-components',
							'ui-design-atoms',
						],
						message: 'Higher layer (${file.type}) must not import lower layer (${dependency.type})',
					},
					{
						from: 'router',
						disallow: [
							'context',
							'features',
							// 'layouts',
							// 'modules',
							// 'pages',
							'router',
							'shared',
							'store',
							'ui-components',
							'ui-design-atoms',
						],
						message: 'Higher layer (${file.type}) must not import lower layer (${dependency.type})',
					},
					{
						from: 'shared',
						disallow: [
							'context',
							'features',
							'layouts',
							'modules',
							'pages',
							'router',
							'shared',
							// 'store', // need to remove and no to allow
							// 'ui-components',
							// 'ui-design-atoms',
						],
						message: 'Higher layer (${file.type}) must not import lower layer (${dependency.type})',
					},
					{
						from: 'store',
						disallow: [
							'context',
							'features',
							'layouts',
							'modules',
							'pages',
							'router',
							// 'shared',
							// 'store',
							'ui-components',
							'ui-design-atoms',
						],
						message:
							'The module of the lower layer (${file.type}) cannot import the module of the higher layer (${dependency.type})',
					},
					{
						from: 'ui-components',
						disallow: [
							'context',
							'features',
							'layouts',
							'modules',
							'pages',
							'router',
							'shared',
							'store',
							// 'ui-components',  // need to be changed
							// 'ui-design-atoms',
						],
						message:
							'The module of the lower layer (${file.type}) cannot import the module of the higher layer (${dependency.type})',
					},
					{
						from: 'ui-design-atoms',
						disallow: [
							'context',
							'features',
							'layouts',
							'modules',
							'pages',
							'router',
							'shared',
							'store',
							'ui-components',
							// 'ui-design-atoms',
						],
						message:
							'The module of the lower layer (${file.type}) cannot import the module of the higher layer (${dependency.type})',
					},
				],
			},
		],
		'boundaries/entry-point': [
			2,
			{
				default: 'disallow',
				message:
					'The module (${file.type}) must be imported via the public API. Direct import from ${dependency.source} is prohibited',

				rules: [
					{
						target: ['layouts', 'modules', 'router', 'shared', 'store', 'context'],
						allow: '**',
					},
					{
						target: ['ui-components', 'ui-design-atoms', 'features'],
						allow: ['index.(ts|tsx)'],
					},
					{
						target: ['pages'],
						allow: ['index.(ts|tsx)', '*pages.tsx'],
					},
				],
			},
		],
	},
};
