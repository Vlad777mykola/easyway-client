import { localstorage } from '@/shared/utils/local-storage/localstorage';
import { create } from 'zustand';
import { ExerciseResponseType } from '@/shared/constants/data';
import { getReadyQuestion } from '@/modules/exercise/services/fetchDefinition';

function shuffleArray(array: string[]) {
	const newArr = [...array];
	for (let i = newArr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[j]] = [newArr[j], newArr[i]];
	}
	return newArr;
}

export const EXERCISE_MODE = {
	isExam: 'examMode',
	isRandom: 'randomMode',
	isInfinitive: 'infinitiveMode',
} as const;

export const EXERCISE_FORMATE = {
	isSelecting: 'selectingFormate',
	isClassic: 'classicFormate',
} as const;

export const EXERCISE_CONFIG = {
	MODE: 'exerciseMode',
	TOTAL_CORRECT_RESPONSE: 'exerciseCorrectResponse',
	FORMATE: 'exerciseFormate',
} as const;

export const DEFAULT_DATA_TEST = {
	id: '',
	exercise: '',
	explanation: '',
	exerciseAnswer: [],
	selectedAnswer: '',
	currentWord: 0,
	isComplete: false,
	isCorrectAnswer: true,
	explanationAnswer: [],
	explanationVariants: [],
	variants: {},
};

export type ExerciseType = {
	id: string;
	exercise: string;
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
type ExerciseFormateType = (typeof EXERCISE_FORMATE)[keyof typeof EXERCISE_FORMATE];
type AllExerciseModesType = {
	[key in keyof typeof EXERCISE_MODE]: boolean;
};
type AllExerciseFormateType = {
	[key in keyof typeof EXERCISE_FORMATE]: boolean;
};
type ExerciseListProgressType = {
	id: string;
	countCorrectAnswers: number;
};

type CommonProgressDataType = {
	collectionId: string;
	resolvedExerciseIds: string[];
};

type ExerciseConfigType = {
	exerciseMode: ExerciseModeType;
	exerciseCorrectResponse: number;
	exerciseFormate: ExerciseFormateType;
};
type ExerciseConfigKeyType = keyof ExerciseConfigType;

type ExerciseStoreState = {
	exerciseListResponse: ExerciseResponseType[];
	exerciseListIds: string[];
	exerciseList: ExerciseType[];
	resolvedExerciseId: string[];
	collectionsExerciseConfig: ExerciseConfigType;

	exerciseListProgress: ExerciseListProgressType[];
	commonProgressData: CommonProgressDataType;
};

type ExerciseStoreActions = {
	setExerciseListResponse: (exerciseList: ExerciseResponseType[], collectionId: string) => void;
	getExerciseConfig: (
		key: ExerciseConfigKeyType,
	) => ExerciseModeType | number | ExerciseFormateType;
	setCollectionsExerciseConfig: (
		key: string,
		value: number[] | string | boolean | string[] | number,
	) => void;
	getExerciseById: (id: string) => Promise<ExerciseType | null>;
	getExerciseMode: () => AllExerciseModesType;
	getExerciseFormate: () => AllExerciseFormateType;

	setExerciseListProgress: (id: string, isResolved: boolean) => void;
	getExerciseProgressById: (id: string) => ExerciseListProgressType | null;

	saveProgressToLocalStore: (collectionId: string) => void;
	getProgressFromLocalStore: (collectionId: string) => void;
	removeProgress: (collectionId: string) => void;
};

export type ExerciseStoreType = ExerciseStoreState & ExerciseStoreActions;

export const useExerciseProgressStoreBase = create<ExerciseStoreType>()((set, get) => ({
	exerciseListResponse: [],
	exerciseListIds: [],
	exerciseList: [],
	exerciseListProgress: [],
	resolvedExerciseId: [],
	commonProgressData: {
		collectionId: '',
		resolvedExerciseIds: [],
	},
	collectionsExerciseConfig: {
		exerciseMode: EXERCISE_MODE.isRandom,
		exerciseCorrectResponse: 15,
		exerciseFormate: EXERCISE_FORMATE.isSelecting,
	},

	setExerciseListResponse: (exerciseList, collectionId) => {
		const exerciseListResponse = get().exerciseListResponse;
		const id = get().commonProgressData.collectionId;

		if (exerciseListResponse?.length > 0 && collectionId === id) {
			return;
		}
		const isUntracedMode =
			get().collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isInfinitive;

		let ids = exerciseList.map((item) => item.id);

		if (!isUntracedMode) {
			const resolvedExerciseId = get().resolvedExerciseId;
			ids = ids.filter((i) => !resolvedExerciseId.includes(i));
		}

		set((state) => ({
			...state,
			exerciseListIds: ids,
			exerciseListResponse: exerciseList,
			commonProgressData: { ...state.commonProgressData, collectionId },
		}));
	},

	setCollectionsExerciseConfig: (key, value) => {
		set((state) => ({
			collectionsExerciseConfig: {
				...state.collectionsExerciseConfig,
				[key]: value,
			},
		}));
	},

	getExerciseConfig: (key) => {
		return get().collectionsExerciseConfig[key];
	},

	getExerciseMode: () => {
		const mode = get().collectionsExerciseConfig.exerciseMode;
		return {
			isExam: mode === EXERCISE_MODE.isExam,
			isRandom: mode === EXERCISE_MODE.isRandom,
			isInfinitive: mode === EXERCISE_MODE.isInfinitive,
		};
	},

	getExerciseFormate: () => {
		const formate = get().collectionsExerciseConfig.exerciseFormate;
		return {
			isClassic: formate === EXERCISE_FORMATE.isClassic,
			isSelecting: formate === EXERCISE_FORMATE.isSelecting,
		};
	},

	getExerciseById: async (id) => {
		let exercise = null;
		const exerciseListPrepared = get().exerciseList;
		exercise = exerciseListPrepared.find((item) => item.id === id);

		if (exercise) {
			return exercise;
		}

		const exerciseListResponse = get().exerciseListResponse;
		exercise = exerciseListResponse.find((item) => item.id === id) || null;

		if (exercise) {
			const exerciseAnswer = exercise.exerciseAnswer.split(' ');
			const explanationAnswer = exercise.explanation.split(' ');
			const explanationVariants = shuffleArray(explanationAnswer);
			const variants = await getReadyQuestion(exerciseAnswer);
			exercise = {
				...DEFAULT_DATA_TEST,
				...exercise,
				exerciseAnswer,
				explanationAnswer,
				explanationVariants,
				variants,
			};
			set({ exerciseList: [...exerciseListPrepared, exercise] });
		}

		return exercise;
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
				const isUntracedMode =
					get().collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isInfinitive;
				const exerciseCorrectResponse = get().collectionsExerciseConfig.exerciseCorrectResponse;
				const countCorrectAnswers = (existingProgress?.countCorrectAnswers || 0) + 1;

				if (!isUntracedMode && exerciseCorrectResponse === countCorrectAnswers) {
					const exerciseListIds = get().exerciseListIds;
					const resolvedExerciseId = get().resolvedExerciseId;
					const removedExercise = exerciseListIds.filter((i) => i !== id);

					return {
						...state,
						exerciseListProgress: updatedProgressList,
						exerciseListIds: removedExercise,
						resolvedExerciseId: [...resolvedExerciseId, id],
					};
				} else {
					updatedProgressList = [...updatedProgressList, { id, countCorrectAnswers }];
				}
			} else {
				updatedProgressList = [...updatedProgressList, { id, countCorrectAnswers: 0 }];
			}

			return { ...state, exerciseListProgress: updatedProgressList };
		});
	},

	saveProgressToLocalStore: (collectionId) => {
		localstorage.removeItem(collectionId);
		const exerciseListProgress = get().exerciseListProgress;
		const resolvedExerciseId = get().resolvedExerciseId;
		localstorage.setItem(collectionId, { exerciseListProgress, resolvedExerciseId });
	},
	getProgressFromLocalStore: (collectionId) => {
		const existProgress = get().exerciseListProgress.length > 0;
		if (existProgress) {
			return;
		}
		const {
			resolvedExerciseId,
			exerciseListProgress,
		}: {
			exerciseListProgress: ExerciseListProgressType[];
			resolvedExerciseId: string[];
		} = localstorage.getItem(collectionId) || {
			exerciseListProgress: [],
			resolvedExerciseId: [],
		};

		set((state) => ({
			...state,
			exerciseListProgress,
			resolvedExerciseId,
		}));
	},
	removeProgress: (collectionId) => {
		if (localstorage.getItem(collectionId)) {
			localstorage.removeItem(collectionId);
			set((state) => ({ ...state, exerciseListProgress: [] }));
		}
	},
}));
