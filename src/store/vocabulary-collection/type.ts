import {
	EXERCISE_FORMATE,
	EXERCISE_MODE,
	LEVEL_BASED,
	VOCABULARY_CATEGORIES,
	VOCABULARY_TOPICS,
} from './constants';

export type Word = {
	id: string;
	exercise: string;
	exerciseAnswer: string;
	explanation: string;
};

export type VocabularyListType = {
	id: string;
	title: string;
	topic: VocabularyTopicType[];
	category: string[];
	level: LevelBasedType[];
};

export type ExerciseType = {
	id: string;
	exercise: string;
	explanation: string;
	used: string;
	exerciseAnswer: string[];
	selectedAnswer: string;
	currentWord: number;
	isComplete: boolean;
	isCorrectAnswer: boolean;
	explanationAnswer: string[];
	explanationVariants: string[];
	variants: { [key: string]: string[] };
};

export type ExerciseConfigType = {
	exerciseMode: ExerciseModeType;
	exerciseCorrectResponse: number;
	exerciseFormate: ExerciseFormateType;
	autoPlay: boolean;
};

export type CommonProgressDataType = {
	collectionId: string;
	resolvedExerciseIds: string[];
};

type VocabularyTopicType = (typeof VOCABULARY_TOPICS)[keyof typeof VOCABULARY_TOPICS];
type VocabularyCategoriesType = (typeof VOCABULARY_CATEGORIES)[keyof typeof VOCABULARY_CATEGORIES];
type LevelBasedType = (typeof LEVEL_BASED)[keyof typeof LEVEL_BASED];
type ExerciseFormateType = (typeof EXERCISE_FORMATE)[keyof typeof EXERCISE_FORMATE];
export type ExerciseModeType = (typeof EXERCISE_MODE)[keyof typeof EXERCISE_MODE];

export type VocabularyConfigType = {
	title: string;
	vocabularyTopic: VocabularyTopicType[];
	vocabularyCategories: VocabularyCategoriesType[];
	levelBased: LevelBasedType[];
};

export type ExerciseListProgressType = {
	id: string;
	countCorrectAnswers: number;
};
