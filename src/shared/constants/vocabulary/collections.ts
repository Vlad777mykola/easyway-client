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
		subtitle: 'Family',
		level: 'A1',
		category: ['Other'],
		topic: ['Family'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Books',
		learnBySkill: 'Reading',
	},
	{
		id: '2',
		title: 'Parts of the body',
		subtitle: 'Family',
		level: 'B2',
		category: ['Other', 'Adjectives'],
		topic: ['Parts of the body'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Books',
		learnBySkill: 'Reading',
	},
	{
		id: '3',
		title: 'Clothes',
		subtitle: 'Clothes',
		level: 'C1',
		category: ['Other', 'Adjectives', 'Verbs'],
		topic: ['Clothes'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Books',
		learnBySkill: 'Reading',
	},
	{
		id: '4',
		title: 'Describing people',
		subtitle: 'Describing people',
		level: 'B2',
		category: ['Adjectives', 'Verbs'],
		topic: ['Describing people'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Books',
		learnBySkill: 'Reading',
	},
];
