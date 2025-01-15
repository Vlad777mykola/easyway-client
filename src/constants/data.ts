export const DEFAULT_TEST = [
	{
		id: '1',
		sentence: 'Ти покажеш?',
		correctAnswer: 'Will you show?',
		lessonTopic: 'Translate the sentence',
	},
	{
		id: '2',
		sentence: 'Вона почала?',
		correctAnswer: 'Did she start?',
		lessonTopic: 'Translate the sentence',
	},
	{
		id: '3',
		sentence: 'Я розумію.',
		correctAnswer: 'I understand.',
		lessonTopic: 'Translate the sentence',
	},
	// {
	// 	id: 4,
	// 	sentence: 'Кіт сів на килимок.',
	// 	correctAnswer: 'The Cat sat on the mat.',
	// },
	// {
	// 	id: 5,
	// 	sentence: 'Гарний сад сповнений барвистих квітів.',
	// 	correctAnswer: 'The beautiful garden is full of colorful flowers.',
	// },
	// {
	// 	id: 6,
	// 	sentence: 'Незважаючи на втому, вона продовжувала працювати.',
	// 	correctAnswer: 'Although she was tired, she kept working.',
	// },
];

export const DEFAULT_TEST_2 = [
	{
		id: '1111',
		sentence: 'Кіт сів на килимок.',
		correctAnswer: 'The Cat sat on the mat.',
		lessonTopic: 'Translate the sentence',
	},
	{
		id: '2222',
		sentence: 'Гарний сад сповнений барвистих квітів.',
		correctAnswer: 'The beautiful garden is full of colorful flowers.',
		lessonTopic: 'Translate the sentence',
	},
	{
		id: '3333',
		sentence: 'Незважаючи на втому, вона продовжувала працювати.',
		correctAnswer: 'Although she was tired, she kept working.',
		lessonTopic: 'Translate the sentence',
	},
];

export const DEFAULT_COLLECTIONS = [
	{
		id: '1',
		title: 'Test 1',
		subtitle: 'Test 1 subtitle',
		taskList: DEFAULT_TEST.map((i) => i.id),
	},
	{
		id: '2',
		title: 'Test 2',
		subtitle: 'Test 2 subtitle',
		taskList: DEFAULT_TEST_2.map((i) => i.id),
	},
];
