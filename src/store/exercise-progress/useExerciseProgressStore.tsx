import { create } from 'zustand';

export const EXERCISE_MODE = {
	EXAM_MODE: 'examMode',
	RANDOM_MODE: 'randomMode',
	INFINITIVE_MODE: 'infinitiveMode',
} as const;

type ExerciseModeType = (typeof EXERCISE_MODE)[keyof typeof EXERCISE_MODE];

type ExerciseListType = {
	id: string;
	exercise: string;
	explanation: string;
	exerciseAnswer: string[];
	selectedAnswer: string;
	currentWord: number;
	isComplete: boolean;
	isCorrectAnswer: boolean;
};

type ExerciseListProgressType = {
	id: string;
	countCorrectAnswers: number;
};

type CommonProgressDataType = {
	collection: string;
	countCorrectAnswers: number;
	resolvedExerciseIds: string[];
};

type CollectionExerciseConfigType = {
	exerciseMode: ExerciseModeType;
	exerciseCorrectResponse: number;
};

type ExerciseStoreState = {
	exerciseList: ExerciseListType[];
	exerciseListProgress: ExerciseListProgressType[];
	commonProgressData: CommonProgressDataType;
	collectionsExerciseConfig: CollectionExerciseConfigType;
};

type ExerciseStoreActions = {
	getExerciseMode: () => ExerciseModeType;
	getExerciseCorrectResponseCount: () => number;
	setCollectionsExerciseConfig: (
		key: string,
		value: number[] | string | boolean | string[] | number,
	) => void;
	getExerciseById: (id: string) => ExerciseListType | null;
	setExerciseList: (exercise: ExerciseListType) => void;
	setExerciseListProgress: (id: string, isResolved: boolean) => void;
};

export type ExerciseStoreType = ExerciseStoreState & ExerciseStoreActions;

export const useExerciseProgressStore = create<ExerciseStoreType>()((set, get) => ({
	exerciseList: [],
	exerciseListProgress: [],
	commonProgressData: {
		collection: '',
		countCorrectAnswers: 0,
		resolvedExerciseIds: [],
	},
	collectionsExerciseConfig: {
		exerciseMode: EXERCISE_MODE.RANDOM_MODE,
		exerciseCorrectResponse: 5,
	},
	setCollectionsExerciseConfig: (key, value) => {
		set((state) => ({
			collectionsExerciseConfig: {
				...state.collectionsExerciseConfig,
				[key]: value,
			},
		}));
	},
	getExerciseById: (id) => {
		const state = get().exerciseList;
		return state.find((item) => item.id === id) || null;
	},
	getExerciseCorrectResponseCount: () => {
		return get().collectionsExerciseConfig.exerciseCorrectResponse;
	},
	getExerciseMode: () => {
		return get().collectionsExerciseConfig.exerciseMode;
	},
	setExerciseList: (exercise) => {
		set((state) => ({ exerciseList: [...state.exerciseList, exercise] }));
	},
	setExerciseListProgress: (id, isResolved) => {
		set((state) => {
			const existingProgress = state.exerciseListProgress.find((e) => e.id === id);
			let updatedProgressList = state.exerciseListProgress.filter((e) => e.id !== id);

			if (isResolved) {
				const countCorrectAnswers = (existingProgress?.countCorrectAnswers || 0) + 1;
				updatedProgressList = [...updatedProgressList, { id, countCorrectAnswers }];
			} else {
				updatedProgressList = [...updatedProgressList, { id, countCorrectAnswers: 0 }];
			}

			return { exerciseListProgress: updatedProgressList };
		});
	},
}));
