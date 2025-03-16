import { create } from 'zustand';
import { localstorage } from '@/shared/utils/local-storage/localstorage';
import { ExerciseResponseType } from '@/shared/constants/collections/data';
import { getReadyQuestion } from '@/shared/services/get-variants';
import { shuffleArray } from '@/shared/utils/shuffle-array';
import {
	ExerciseListProgressType,
	CommonProgressDataType,
	ExerciseConfigType,
	ExerciseType,
} from './type';
import { DEFAULT_DATA_TEST, EXERCISE_FORMATE, EXERCISE_MODE } from './constants';

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
	getExerciseConfig: <T extends keyof ExerciseConfigType>(key: T) => ExerciseConfigType[T];
	setCollectionsExerciseConfig: (
		key: string,
		value: number[] | string | boolean | string[] | number,
	) => void;

	getExerciseById: (id: string) => Promise<ExerciseType | null>;
	setExerciseListResponse: (exerciseList: ExerciseResponseType[], collectionId: string) => void;

	getExerciseProgressById: (id: string) => number;
	setExerciseListProgress: (id: string, isResolved: boolean) => void;

	saveProgressToLocalStore: (collectionId: string) => void;
	getProgressFromLocalStore: (collectionId: string) => void;
	removeProgress: (collectionId: string) => void;
};

export type ExerciseStoreType = ExerciseStoreState & ExerciseStoreActions;

export const useDictionaryProgressStoreBase = create<ExerciseStoreType>()((set, get) => ({
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
		exerciseMode: EXERCISE_MODE.Random,
		exerciseCorrectResponse: 15,
		exerciseFormate: EXERCISE_FORMATE.Classic,
		autoPlay: false,
	},

	getExerciseConfig: (key) => {
		return get().collectionsExerciseConfig[key];
	},
	setCollectionsExerciseConfig: (key, value) => {
		set((state) => ({
			collectionsExerciseConfig: {
				...state.collectionsExerciseConfig,
				[key]: value,
			},
		}));
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
	setExerciseListResponse: (exerciseList, collectionId) => {
		const exerciseListResponse = get().exerciseListResponse;
		const id = get().commonProgressData.collectionId;

		if (exerciseListResponse?.length > 0 && collectionId === id) {
			return;
		}
		const isUntracedMode =
			get().collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.Infinitive;

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

	getExerciseProgressById: (id) => {
		const state = get().exerciseListProgress;
		return state.find((item) => item.id === id)?.countCorrectAnswers || 0;
	},
	setExerciseListProgress: (id, isResolved) => {
		set((state) => {
			const existingProgress = state.exerciseListProgress.find((e) => e.id === id);
			let updatedProgressList = state.exerciseListProgress.filter((e) => e.id !== id);

			if (isResolved) {
				const isUntracedMode =
					get().collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.Infinitive;
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

// type MapAdIsType<T extends { [key: string]: string }> = {
// 	[K in keyof T as `is${Capitalize<string & K>}`]: boolean;
// };
// type AllExerciseModesType = MapAdIsType<typeof EXERCISE_MODE>;
// type AllExerciseFormateType = MapAdIsType<typeof EXERCISE_FORMATE>;

// getExerciseMode: () => AllExerciseModesType;
// getExerciseFormate: () => AllExerciseFormateType;

// getExerciseMode: () => {
// 	const mode = get().collectionsExerciseConfig.exerciseMode;
// 	return {
// 		isExam: mode === EXERCISE_MODE.Exam,
// 		isRandom: mode === EXERCISE_MODE.Random,
// 		isInfinitive: mode === EXERCISE_MODE.Infinitive,
// 	};
// },

// getExerciseFormate: () => {
// 	const formate = get().collectionsExerciseConfig.exerciseFormate;
// 	return {
// 		isUsed: formate === EXERCISE_FORMATE.Used,
// 		isClassic: formate === EXERCISE_FORMATE.Classic,
// 		isSelecting: formate === EXERCISE_FORMATE.Selecting,
// 	};
// },
