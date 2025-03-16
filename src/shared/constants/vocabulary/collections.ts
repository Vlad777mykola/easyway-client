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
		topic: ['Family'],
		category: ['Other'],
		level: ['A1', 'B2'],
	},
	{
		id: '2',
		title: 'Parts of the body',
		topic: ['Parts of the body'],
		category: ['Other', 'Adjectives'],
		level: ['A1', 'B2', 'C1'],
	},
	{
		id: '3',
		title: 'Clothes',
		topic: ['Clothes'],
		category: ['Other', 'Adjectives', 'Verbs'],
		level: ['A1', 'B2', 'C1', 'C2'],
	},
	{
		id: '4',
		title: 'Describing people',
		topic: ['Describing people'],
		category: ['Adjectives', 'Verbs'],
		level: ['B1', 'B2'],
	},
];
