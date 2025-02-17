import { id1, id2, id3 } from './suportData';
import { common1000 } from './words/1000words';

export type ExerciseResponseType = {
	id: string;
	exercise: string;
	exerciseAnswer: string;
	explanation: string;
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
	['4', id3],
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
};

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
		id: '3',
		title: '1000 Most Common English Words',
		subtitle: 'Practice Common English Words',
		level: 'Intermediate',
		category: ['Present Simple', 'Past Simple'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Books',
		learnBySkill: 'Reading',
	},
	{
		id: '4',
		title: 'Modals',
		subtitle: 'Practice the sentence',
		level: 'Intermediate',
		category: ['Modals'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'News/Blogs',
		learnBySkill: 'Writing',
	},
];
