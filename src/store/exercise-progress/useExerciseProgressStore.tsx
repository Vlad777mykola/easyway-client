import { localstorage } from '@/shared/utils/local-storage/localstorage';
import { create } from 'zustand';

export const EXERCISE_MODE = {
	EXAM_MODE: 'examMode',
	RANDOM_MODE: 'randomMode',
	INFINITIVE_MODE: 'infinitiveMode',
} as const;

export type ExerciseListType = {
	id: string;
	exercise: string;
	explanation: string;
	exerciseAnswer: string[];
	selectedAnswer: string;
	currentWord: number;
	isComplete: boolean;
	isCorrectAnswer: boolean;
	variants: { [key: string]: string[] };
};

type ExerciseModeType = (typeof EXERCISE_MODE)[keyof typeof EXERCISE_MODE];

type ExerciseListProgressType = {
	id: string;
	countCorrectAnswers: number;
};

type CommonProgressDataType = {
	collection: string;
	countCorrectAnswers: number;
	resolvedExerciseIds: string[];
};

type ExerciseConfigType = {
	exerciseMode: ExerciseModeType;
	exerciseCorrectResponse: number;
};

type ExerciseStoreState = {
	exerciseListIds: { id: string }[];
	exerciseList: ExerciseListType[];
	exerciseListProgress: ExerciseListProgressType[];
	commonProgressData: CommonProgressDataType;
	collectionsExerciseConfig: ExerciseConfigType;
};

type ExerciseStoreActions = {
	setExerciseListIds: <T extends { id: string }>(exerciseList: T[]) => void;
	getExerciseMode: () => ExerciseModeType;
	getExerciseCorrectResponseCount: () => number;
	setCollectionsExerciseConfig: (
		key: string,
		value: number[] | string | boolean | string[] | number,
	) => void;
	getExerciseById: (id: string) => ExerciseListType | null;
	setExerciseList: (exercise: ExerciseListType) => void;

	setExerciseListProgress: (id: string, isResolved: boolean) => void;
	getExerciseProgressById: (id: string) => ExerciseListProgressType | null;

	saveProgressToLocalStore: (collectionId: string) => void;
	setProgressFromLocalStore: (collectionId: string) => void;
};

export type ExerciseStoreType = ExerciseStoreState & ExerciseStoreActions;

export const useExerciseProgressStore = create<ExerciseStoreType>()((set, get) => ({
	exerciseListIds: [],
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

	setExerciseListIds: (exerciseList) => {
		set((state) => ({
			...state,
			exerciseListIds: exerciseList.map((item) => ({ id: item.id })),
		}));
	},

	getExerciseCorrectResponseCount: () => {
		return get().collectionsExerciseConfig.exerciseCorrectResponse;
	},
	getExerciseMode: () => {
		return get().collectionsExerciseConfig.exerciseMode;
	},

	getExerciseById: (id) => {
		const state = get().exerciseList;
		return state.find((item) => item.id === id) || null;
	},
	setExerciseList: (exercise) => {
		set((state) => ({ ...state, exerciseList: [...state.exerciseList, exercise] }));
	},

	getExerciseProgressById: (id) => {
		const state = get().exerciseListProgress;
		return state.find((item) => item.id === id) || null;
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

			return { ...state, exerciseListProgress: updatedProgressList };
		});
	},

	saveProgressToLocalStore: (collectionId) => {
		localstorage.removeItem(collectionId);
		const exerciseListProgress = get().exerciseListProgress;
		localstorage.setItem(collectionId, exerciseListProgress);
	},
	setProgressFromLocalStore: (collectionId) => {
		const existProgress = get().exerciseListProgress.length > 0;
		if (existProgress) {
			return;
		}
		const storedExerciseListProgress: ExerciseListProgressType[] =
			localstorage.getItem(collectionId) || [];
		set((state) => ({ ...state, exerciseListProgress: storedExerciseListProgress }));
	},
}));
