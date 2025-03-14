import { vocabularyId1, vocabularyId2, vocabularyId3, vocabularyId4 } from './vocabularyData';

export const ALL_VOCABULARIES_BY_ID = new Map([
	['1', vocabularyId1],
	['2', vocabularyId2],
	['3', vocabularyId3],
	['4', vocabularyId4],
]);

export const DEFAULT_COLLECTIONS_VOCABULARY = [
	{
		id: '1',
		title: 'Family',
		topic: 'Family',
		category: ['Other'],
		level: ['A1', 'B2'],
	},
	{
		id: '2',
		title: 'Parts of the body',
		topic: 'Parts of the body',
		category: ['Other', 'Adjectives'],
		level: ['A1', 'B2', 'C1'],
	},
	{
		id: '3',
		title: 'Clothes',
		topic: 'Clothes',
		category: ['Other', 'Adjectives', 'Verbs'],
		level: ['A1', 'B2', 'C1', 'C2'],
		words: [
			{
				english: 'Shirt',
				ukrainian: 'Сорочка',
				transcription: '[ʃɜːrt]',
				partOfSpeech: 'noun',
				explanation:
					'A piece of clothing worn on the upper body, usually with buttons and a collar.',
				examples: ['He wore a white shirt to the meeting.', 'I bought a new blue shirt yesterday.'],
			},
			{
				english: 'T-shirt',
				ukrainian: 'Футболка',
				transcription: '[ˈtiːʃɜːrt]',
				partOfSpeech: 'noun',
				explanation: 'A casual short-sleeved top, usually made of cotton.',
				examples: [
					'He prefers wearing a T-shirt and jeans.',
					'I have a black T-shirt with a funny print.',
				],
			},
			{
				english: 'Jeans',
				ukrainian: 'Джинси',
				transcription: '[dʒiːnz]',
				partOfSpeech: 'noun',
				explanation: 'Trousers made of denim fabric, often blue in color.',
				examples: ['She bought a new pair of jeans.', 'Jeans are comfortable for everyday wear.'],
			},
			{
				english: 'Jacket',
				ukrainian: 'Куртка',
				transcription: '[ˈdʒækɪt]',
				partOfSpeech: 'noun',
				explanation: 'A short coat worn over other clothes for warmth or style.',
				examples: [
					'He wore a leather jacket to the concert.',
					'I need a warm jacket for the winter.',
				],
			},
		],
	},
	{
		id: '4',
		title: 'Describing people',
		topic: 'Describing people',
		category: ['Adjectives', 'Verbs'],
		level: ['B1', 'B2'],
	},
];
