export const DEFAULT_TEST = [
	{
		id: 1,
		sentence: 'Ти покажеш?',
		correctAnswer: 'Will you show?',
	},
	{
		id: 2,
		sentence: 'Вона почала?',
		correctAnswer: 'Did she start?',
	},
	{
		id: 3,
		sentence: 'Я розумію.',
		correctAnswer: 'I understand.',
	},
	{
		id: 4,
		sentence: 'Кіт сів на килимок.',
		correctAnswer: 'The Cat sat on the mat.',
	},
	{
		id: 5,
		sentence: 'Гарний сад сповнений барвистих квітів.',
		correctAnswer: 'The beautiful garden is full of colorful flowers.',
	},
	{
		id: 6,
		sentence: 'Незважаючи на втому, вона продовжувала працювати.',
		correctAnswer: 'Although she was tired, she kept working.',
	},
];

export const DEFAULT_COLLECTIONS = [
	{
		id: 1,
		title: 'Test 1',
		subtitle: 'Test 1 subtitle',
		taskList: DEFAULT_TEST.map((i) => i.id),
	},
	{
		id: 2,
		title: 'Test 1',
		subtitle: 'Test 1 subtitle',
		taskList: DEFAULT_TEST.map((i) => i.id),
	},
	{
		id: 3,
		title: 'Test 1',
		subtitle: 'Test 1 subtitle',
		taskList: DEFAULT_TEST.map((i) => i.id),
	},
	{
		id: 4,
		title: 'Test 1',
		subtitle: 'Test 1 subtitle',
		taskList: DEFAULT_TEST.map((i) => i.id),
	},
	{
		id: 5,
		title: 'Test 1',
		subtitle: 'Test 1 subtitle',
		taskList: DEFAULT_TEST.map((i) => i.id),
	},
	{
		id: 6,
		title: 'Test 1',
		subtitle: 'Test 1 subtitle',
		taskList: DEFAULT_TEST.map((i) => i.id),
	},
];
