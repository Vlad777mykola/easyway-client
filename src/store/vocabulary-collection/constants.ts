export const DEFAULT_DATA_TEST = {
	id: '',
	exercise: '',
	explanation: '',
	used: '',
	exerciseAnswer: [],
	selectedAnswer: '',
	currentWord: 0,
	isComplete: false,
	isCorrectAnswer: true,
	explanationAnswer: [],
	explanationVariants: [],
	variants: {},
};

export const DEFAULT_WORD_CONFIG = '';

export const VOCABULARY_TOPICS = {
	FAMILY: 'Family',
	PARTS_OF_THE_BODY: 'Parts of the body',
	CLOTHES: 'Clothes',
	DESCRIBING_PEOPLE: 'Describing people',
	HEALTH_AND_ILLNESS: 'Health and illness',
	FEELINGS: 'Feelings',
} as const;

export const VOCABULARY_CATEGORIES = {
	ADVERBS: 'Adverbs',
	VERBS: 'Verbs',
	ADJECTIVES: 'Adjectives',
	OTHER: 'Other',
} as const;

export const LEVEL_BASED = {
	A1: 'A1',
	A2: 'A2',
	B1: 'B1',
	B2: 'B2',
	C1: 'C1',
	C2: 'C2',
};

export const VOCABULARY_CONFIG = {
	title: 'title',
	topic: 'topic',
	category: 'category',
	level: 'level',
} as const;

export const WORD_CONFIG = {
	wordConfig: 'wordConfig',
	placeholder: 'word/слово',
};

export const EXERCISE_MODE = {
	isExam: 'examMode',
	isRandom: 'randomMode',
	isInfinitive: 'infinitiveMode',
} as const;

export const EXERCISE_FORMATE = {
	isSelecting: 'selectingFormate',
	isClassic: 'classicFormate',
} as const;
