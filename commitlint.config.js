module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				'ci',
				'test',
				'build',
				'chore',
				'docs',
				'ticket',
				'release',
				'feat',
				'fix',
				'hot-fix',
				'perf',
				'refactor',
				'revert',
				'style',
			],
		],
		'subject-case': [0, 'always'],
		'body-case': [0, 'always'],
		'header-max-length': [0, 'always', -1],
		'footer-max-line-length': [0, 'always', -1],
	},
};
