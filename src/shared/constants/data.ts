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
];

export const DEFAULT_TEST_2 = [
	{
		id: '1111',
		sentence: 'Кіт сів на килимок.',
		correctAnswer: 'The Cat sat on the mat.',
		lessonTopic: 'Correct the sentence',
	},
	{
		id: '2222',
		sentence: 'Гарний сад сповнений барвистих квітів.',
		correctAnswer: 'The beautiful garden is full of colorful flowers.',
		lessonTopic: 'Correct the sentence',
	},
];

export const DEFAULT_COLLECTIONS = [
	{
		id: '1',
		title: 'Past simple',
		subtitle: 'Translate the sentence',
		taskList: DEFAULT_TEST.map((i) => i.id),
	},
	{
		id: '2',
		title: 'Past continuous',
		subtitle: 'Correct the sentence',
		taskList: DEFAULT_TEST_2.map((i) => i.id),
	},
];
