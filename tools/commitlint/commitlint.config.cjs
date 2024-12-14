module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [2, 'always', ['chore', 'feat', 'fix', 'refactor', 'test', 'style']],
		'subject-case': [0, 'always'],
		'body-case': [0, 'always'],
		'header-max-length': [0, 'always', -1],
		'footer-max-line-length': [0, 'always', -1],
	},
};
