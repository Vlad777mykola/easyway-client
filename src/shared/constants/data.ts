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

export const DEFAULT_COLLECTIONS_VOCABULARY = [
	{
		id: '1',
		title: 'Family',
		topic: 'Family',
		category: ['Other'],
		level: ['A1', 'B2'],
		words: [
			{
				english: 'Father',
				ukrainian: 'Батько',
				transcription: '[ˈfɑːðər]',
				partOfSpeech: 'noun',
				explanation: 'A male parent of a child.',
				examples: ['My father is a doctor.', 'He became a father at the age of 30.'],
			},
			{
				english: 'Mother',
				ukrainian: 'Мати',
				transcription: '[ˈmʌðər]',
				partOfSpeech: 'noun',
				explanation: 'A female parent of a child.',
				examples: ['My mother makes the best apple pie.', 'She is a wonderful mother.'],
			},
			{
				english: 'Brother',
				ukrainian: 'Брат',
				transcription: '[ˈbrʌðər]',
				partOfSpeech: 'noun',
				explanation: 'A male sibling.',
				examples: ['My brother is two years younger than me.', 'He is my older brother.'],
			},
			{
				english: 'Sister',
				ukrainian: 'Сестра',
				transcription: '[ˈsɪstər]',
				partOfSpeech: 'noun',
				explanation: 'A female sibling.',
				examples: ['My sister loves to paint.', 'I have a twin sister.'],
			},
		],
	},
	{
		id: '2',
		title: 'Parts of the body',
		topic: 'Parts of the body',
		category: ['Other', 'Adjectives'],
		level: ['A1', 'B2', 'C1'],
		words: [
			{
				english: 'Head',
				ukrainian: 'Голова',
				transcription: '[hɛd]',
				partOfSpeech: 'noun',
				explanation:
					'The upper part of the human body that contains the brain, eyes, ears, nose, and mouth.',
				examples: ['She shook her head in disagreement.', 'I have a headache.'],
			},
			{
				english: 'Face',
				ukrainian: 'Обличчя',
				transcription: '[feɪs]',
				partOfSpeech: 'noun',
				explanation: "The front part of a person's head including the eyes, nose, and mouth.",
				examples: ['She has a beautiful face.', 'His face turned red from embarrassment.'],
			},
			{
				english: 'Eye',
				ukrainian: 'Око',
				transcription: '[aɪ]',
				partOfSpeech: 'noun',
				explanation: 'The organ of sight in humans and animals.',
				examples: ['She has blue eyes.', 'An eyelash got into my eye.'],
			},
			{
				english: 'Nose',
				ukrainian: 'Ніс',
				transcription: '[noʊz]',
				partOfSpeech: 'noun',
				explanation: 'The part of the face used for smelling and breathing.',
				examples: ['He has a small nose.', 'She wrinkled her nose at the bad smell.'],
			},
		],
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
		words: [
			{
				english: 'Tall',
				ukrainian: 'Високий',
				transcription: '[tɔːl]',
				partOfSpeech: 'adjective',
				explanation: 'Having a greater than average height.',
				examples: [
					'He is very tall for his age.',
					'The tall man helped me get something from the top shelf.',
				],
			},
			{
				english: 'Short',
				ukrainian: 'Низький',
				transcription: '[ʃɔːrt]',
				partOfSpeech: 'adjective',
				explanation: 'Having a small height.',
				examples: [
					'She is quite short compared to her brother.',
					'I need a shorter ladder to reach the top.',
				],
			},
			{
				english: 'Slim',
				ukrainian: 'Стрункий',
				transcription: '[slɪm]',
				partOfSpeech: 'adjective',
				explanation: 'Thin in an attractive way.',
				examples: ['She has a slim figure.', 'He stays slim by exercising regularly.'],
			},
			{
				english: 'Overweight',
				ukrainian: 'Зайва вага',
				transcription: '[ˌoʊvərˈweɪt]',
				partOfSpeech: 'adjective',
				explanation: 'Weighing more than is considered healthy.',
				examples: [
					'Being overweight can lead to health problems.',
					'He started exercising to lose some weight.',
				],
			},
		],
	},
];

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
