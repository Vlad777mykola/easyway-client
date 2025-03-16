import { id1, id2, id3 } from '../fr-questions/wordsJSCSS';
import { common1000 } from '../dictionary/1000words';
import { tsQ } from '../fr-questions/tsQ';

export type ExerciseResponseType = {
	id: string;
	exercise: string;
	exerciseAnswer: string;
	explanation: string;
	used?: string;
	variants?: string[];
};

export type DefaultCollectionType = {
	id: string;
	title: string;
	subtitle: string;
	level: string;
	category: string[];
	topic: string[];
	learningStyle: string;
	learnByInterest: string;
	learnBySkill: string;
};

export const DEFAULT_TASKS = [...id1, ...id2];
export const ALL_COLLECTIONS_TASKS_BY_ID = new Map<string, ExerciseResponseType[]>([
	['1', id1],
	['2', id2],
	['3', common1000],
	['4', tsQ],
	['5', id3],
	['6', id3],
	['7', id3],
	['8', id3],
	['9', id3],
	['10', id3],
]);

export const FILTER_LABELS = {
	title: 'title',
	topic: 'topic',
	category: 'category',
} as const;

export const DEFAULT_COLLECTIONS = [
	{
		id: '1',
		title: 'JS Practice',
		subtitle: 'Practice the questions',
		level: 'Intermediate',
		category: ['Present Simple', 'Past Simple'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Books',
		learnBySkill: 'Reading',
	},
	{
		id: '2',
		title: 'Css Practice',
		subtitle: 'Practice the questions',
		level: 'Intermediate',
		category: ['Present Perfect', 'Past Simple'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Books',
		learnBySkill: 'Reading',
	},
	{
		id: '4',
		title: 'Typescript Practice',
		subtitle: 'Practice the questions',
		level: 'Intermediate',
		category: ['Present Perfect', 'Past Simple'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Books',
		learnBySkill: 'Reading',
	},
];
