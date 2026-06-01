export const EXERCISE_MODE = {
	Exam: 'examMode',
	Random: 'randomMode',
	Infinitive: 'infinitiveMode',
} as const;

export const EXERCISE_FORMATE = {
	Used: 'usedFormate',
	Selecting: 'selectingFormate',
	Classic: 'classicFormate',
} as const;

export const EXERCISE_CONFIG = {
	MODE: 'exerciseMode',
	TOTAL_CORRECT_RESPONSE: 'exerciseCorrectResponse',
	FORMATE: 'exerciseFormate',
	AUTO_PLAY: 'autoPlay',
} as const;

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
