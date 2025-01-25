import { id1, id2, id3 } from './suportData';

type Collection = {
	id: string;
	sentence: string;
	correctAnswer: string;
	exerciseType: string;
	level: string;
	topic: string;
	category: string;
	learningStyle: string;
};
export const DEFAULT_TASKS = [...id1, ...id2];
export const ALL_COLLECTIONS_TASKS_BY_ID = new Map<string, Collection[]>([
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
	},
	{
		id: '2',
		title: 'Present perfect and past',
		subtitle: 'Practice the sentence',
		level: 'Intermediate',
		category: ['Present perfect', 'Past Simple'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
	},
	{
		id: '3',
		title: 'Future',
		subtitle: 'Practice the Future',
		level: 'Intermediate',
		category: ['Future'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
	},
	{
		id: '4',
		title: 'Modals',
		subtitle: 'Practice the sentence',
		level: 'Intermediate',
		category: ['Modals'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
	},
	{
		id: '5',
		title: 'If and wish',
		subtitle: 'Practice the Future',
		level: 'Intermediate',
		category: ['Future'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
	},
	{
		id: '6',
		title: 'Passive',
		subtitle: 'Practice the Passive',
		level: 'Intermediate',
		category: ['Passive'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
	},
	{
		id: '7',
		title: 'Reported speech',
		subtitle: 'Practice the reported speech',
		level: 'Intermediate',
		category: ['Present Simple', 'Past Simple'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
	},
	{
		id: '8',
		title: 'Questions and auxiliary verbs',
		subtitle: 'Practice the questions and auxiliary verbs',
		level: 'Intermediate',
		category: ['Present Simple', 'Past Simple'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
	},
	{
		id: '9',
		title: '–ing and to',
		subtitle: 'Practice the –ing and to',
		level: 'Intermediate',
		category: ['Present Simple', 'Past Simple'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
	},
	{
		id: '10',
		title: 'Articles and nouns',
		subtitle: 'Practice the articles and nouns',
		level: 'Intermediate',
		category: ['Articles', 'Nouns'],
		topic: ['Programming'],
		learningStyle: 'Selecting/Matching',
	},
];

export const selectData = [
	{
		id: '1',
		keyValue: 'selectKey1',
		selectData: ['select1', 'select2'],
		defaultValue: ['select2'],
		label: 'label of filter',
		componentType: 'select',
	},
	{
		id: '2',
		keyValue: 'selectKey2',
		selectData: ['select3', 'select4'],
		defaultValue: ['select4'],
		label: 'label of filter',
		componentType: 'select',
	},
	{
		id: '3',
		keyValue: 'selectKey3',
		selectData: ['select5', 'select6'],
		defaultValue: ['select5'],
		label: 'label of filter',
		componentType: 'multiple',
	},
	{
		id: '4',
		keyValue: 'selectKey4',
		selectData: ['select7', 'select8'],
		defaultValue: ['select7'],
		label: 'label of filter',
		componentType: 'select',
	},
	{
		id: '5',
		keyValue: 'inputKey1',
		defaultValue: 'default input 1',
		placeholder: 'input',
		componentType: 'input',
	},
	{
		id: '6',
		keyValue: 'inputKey2',
		defaultValue: 'default input 2',
		placeholder: 'input1',
		componentType: 'input',
	},
	{
		id: '7',
		keyValue: 'checkbox',
		label: 'checkbox',
		isChecked: false,
		componentType: 'checkbox',
	},
	{
		id: '8',
		keyValue: 'checkbox1',
		label: 'checkbox1',
		isChecked: false,
		componentType: 'checkbox',
	},
];
