import { id1, id2, id3 } from './suportData';

export type ExerciseType = {
	id: string;
	exercise: string;
	exerciseAnswer: string;
	explanation: string;
	level: string;
	topic: string[];
	category: string[];
	exerciseType: string;
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
export const ALL_COLLECTIONS_TASKS_BY_ID = new Map<string, ExerciseType[]>([
	['1', id1],
	['2', id2],
	['3', id3],
	['4', id3],
	['5', id3],
	['6', id3],
	['7', id3],
	['8', id3],
	['9', id3],
	['10', id3],
]);

export const DEFAULT_COLLECTIONS = [
	{
		id: '1',
		title: 'Present and past',
		subtitle: 'Practice the sentence',
		level: 'Intermediate',
		category: ['Present Simple', 'Past Simple'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Movies/Series',
		learnBySkill: 'Listening',
	},
	{
		id: '2',
		title: 'Present perfect and past',
		subtitle: 'Practice the sentence',
		level: 'Intermediate',
		category: ['Present perfect', 'Past Simple'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Music',
		learnBySkill: 'Speaking',
	},
	{
		id: '3',
		title: 'Future',
		subtitle: 'Practice the Future',
		level: 'Intermediate',
		category: ['Future'],
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
	{
		id: '5',
		title: 'If and wish',
		subtitle: 'Practice the Future',
		level: 'Intermediate',
		category: ['Future'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Movies/Series',
		learnBySkill: 'Listening',
	},
	{
		id: '6',
		title: 'Passive',
		subtitle: 'Practice the Passive',
		level: 'Intermediate',
		category: ['Passive'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Music',
		learnBySkill: 'Listening',
	},
	{
		id: '7',
		title: 'Reported speech',
		subtitle: 'Practice the reported speech',
		level: 'Intermediate',
		category: ['Present Simple', 'Past Simple'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Music',
		learnBySkill: 'Writing',
	},
	{
		id: '8',
		title: 'Questions and auxiliary verbs',
		subtitle: 'Practice the questions and auxiliary verbs',
		level: 'Intermediate',
		category: ['Present Simple', 'Past Simple'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Books',
		learnBySkill: 'Reading',
	},
	{
		id: '9',
		title: '–ing and to',
		subtitle: 'Practice the –ing and to',
		level: 'Intermediate',
		category: ['Present Simple', 'Past Simple'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'News/Blogs',
		learnBySkill: 'Writing',
	},
	{
		id: '10',
		title: 'Articles and nouns',
		subtitle: 'Practice the articles and nouns',
		level: 'Intermediate',
		category: ['Articles', 'Nouns'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
		learnByInterest: 'Movies/Series',
		learnBySkill: 'Listening',
	},
];

export const selectData = [
	{
		id: '13',
		keyValue: 'selectKey3',
		selectData: ['select5', 'select6'],
		defaultValue: ['select5'],
		label: 'label of filter',
		componentType: 'multiple',
	},
	{
		id: '14',
		keyValue: 'selectKey4',
		selectData: ['select7', 'select8'],
		defaultValue: ['select7'],
		label: 'label of filter',
		componentType: 'select',
	},
	{
		id: '15',
		keyValue: 'inputKey1',
		defaultValue: 'default input 1',
		placeholder: 'input',
		componentType: 'input',
	},
	{
		id: '17',
		keyValue: 'checkbox',
		label: 'checkbox',
		isChecked: false,
		componentType: 'checkbox',
	},
];
