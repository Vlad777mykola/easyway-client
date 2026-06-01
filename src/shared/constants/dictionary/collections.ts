import { ExerciseResponseType } from '@/shared/constants/collections/data';
import { A1_A2_WORDS } from './a1-a2-words';
import { B1_B2_WORDS } from './b1-b2-words';
export const DICTIONARY_COLLECTIONS = [
	{
		id: '1',
		title: 'A1-A2 Most Common English Words',
		subtitle: 'Practice Common English Words',
		level: ['Intermediate'],
		category: ['Present Simple', 'Past Simple'],
		topic: ['Programming'],
		tenses: ['Programming'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Books',
		learnBySkill: 'Reading',
	},
	{
		id: '2',
		title: 'B1-B2 Most Common English Words',
		subtitle: 'Practice Common English Words',
		level: ['Intermediate'],
		category: ['Present Simple', 'Past Simple'],
		topic: ['Programming'],
		tenses: ['Programming'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Books',
		learnBySkill: 'Reading',
	},
];

export const ALL_DICTIONARY_COLLECTIONS_TASKS_BY_ID = new Map<string, ExerciseResponseType[]>([
	['1', A1_A2_WORDS],
	['2', B1_B2_WORDS],
]);
