import { EXERCISE_FORMATE, EXERCISE_MODE } from './constants';

export type ExerciseType = {
	id: string;
	exercise: string;
	used: string;
	explanation: string;
	exerciseAnswer: string[];
	selectedAnswer: string;
	currentWord: number;
	isComplete: boolean;
	isCorrectAnswer: boolean;
	explanationAnswer: string[];
	explanationVariants: string[];
	variants: { [key: string]: string[] };
};

export type ExerciseModeType = (typeof EXERCISE_MODE)[keyof typeof EXERCISE_MODE];
export type ExerciseFormateType = (typeof EXERCISE_FORMATE)[keyof typeof EXERCISE_FORMATE];

export type ExerciseListProgressType = {
	id: string;
	countCorrectAnswers: number;
};

export type CommonProgressDataType = {
	collectionId: string;
	resolvedExerciseIds: string[];
};

export type ExerciseConfigType = {
	autoPlay: boolean;
	exerciseMode: ExerciseModeType;
	exerciseCorrectResponse: number;
	exerciseFormate: ExerciseFormateType;
};
