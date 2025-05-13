import { create } from 'zustand';
import { filterWordCollection } from './service';
import { ExerciseResponseType } from '@/shared/constants/collections/data';
import { getReadyQuestion } from '@/modules/vocabularies/services/fetchDefinition';
import {
	DEFAULT_DATA_TEST,
	DEFAULT_WORD_CONFIG,
	EXERCISE_FORMATE,
	EXERCISE_MODE,
} from './constants';
import {
	CommonProgressDataType,
	ExerciseConfigType,
	ExerciseListProgressType,
	ExerciseType,
	Word,
} from './type';
import { shuffleArray } from '@/shared/utils/shuffle-array';

type VocabularyStoreState = {
	filteredWordsVocabulary: Word[];
	wordConfig: string;
	words: Word[];
	exerciseListIds: string[];
	collectionsExerciseConfig: ExerciseConfigType;
	exerciseList: ExerciseType[];
	exerciseListResponse: ExerciseResponseType[];
	commonProgressData: CommonProgressDataType;
	resolvedExerciseId: string[];
	exerciseListProgress: ExerciseListProgressType[];
};

type VocabularyStoreActions = {
	getWordConfig: () => number[] | string | boolean | string[] | number;
	getExerciseById: (id: string) => Promise<ExerciseType | null>;
	getExerciseConfig: <T extends keyof ExerciseConfigType>(key: T) => ExerciseConfigType[T];
	getExerciseProgressById: (id: string) => number;
	setCollectionsExerciseConfig: (
		key: string,
		value: number[] | string | boolean | string[] | number,
	) => void;
	setWordConfig: (key: string, value: number[] | string | boolean | string[] | number) => void;
	setCleanWordConfig: () => void;
	setFilterWordOnSearch: () => void;
	setWordsListResponse: (vocabularyList: Word[]) => void;
	setExerciseListResponse: (exerciseList: ExerciseResponseType[], collectionId: string) => void;
	setExerciseListProgress: (
		id: string,
		isResolved: boolean,
		fromData?: { id: string; countCorrectAnswers: number }[],
	) => void;
};

export type VocabularyStoreType = VocabularyStoreState & VocabularyStoreActions;

export const useVocabularyStoreBase = create<VocabularyStoreType>()((set, get) => ({
	filteredWordsVocabulary: [],
	wordConfig: DEFAULT_WORD_CONFIG,
	words: [],
	exerciseListIds: [],
	collectionsExerciseConfig: {
		exerciseMode: EXERCISE_MODE.isRandom,
		exerciseCorrectResponse: 15,
		exerciseFormate: EXERCISE_FORMATE.isClassic,
		autoPlay: false,
	},
	exerciseList: [],
	exerciseListResponse: [],
	commonProgressData: {
		collectionId: '',
		resolvedExerciseIds: [],
	},
	resolvedExerciseId: [],
	exerciseListProgress: [],
	setWordConfig: (key, value) => {
		set((state) => ({
			...state,
			[key]: value,
		}));
	},
	setCleanWordConfig: () => {
		set((state) => ({
			...state,
			wordConfig: DEFAULT_WORD_CONFIG,
		}));
	},
	setFilterWordOnSearch: () => {
		const wordConfig = get().wordConfig;
		const wordsCollection = get().words;
		const filteredWords = filterWordCollection(wordsCollection, wordConfig);

		set((state) => {
			return { ...state, filteredWordsVocabulary: filteredWords };
		});
	},
	setWordsListResponse: (vocabularyList) => {
		set((state) => {
			return { ...state, words: vocabularyList, filteredWordsVocabulary: vocabularyList };
		});
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
	setExerciseListProgress: (id = '', isResolved = false, fromData = []) => {
		console.log('FROM DATA not if: ', fromData.length === 0);
		if (fromData.length === 0 && id !== '' && isResolved) {
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
		} else {
			console.log('FORM DATA: ', fromData);
			set((state) => ({
				...state,
				exerciseListProgress: fromData,
			}));
		}
	},
	setCollectionsExerciseConfig: (key, value) => {
		set((state) => ({
			collectionsExerciseConfig: {
				...state.collectionsExerciseConfig,
				[key]: value,
			},
		}));
	},
	getWordConfig: () => {
		return get().wordConfig;
	},
	getExerciseConfig: (key) => {
		return get().collectionsExerciseConfig[key];
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
			let variants = { [exerciseAnswer[0]]: ['1'] };
			if (exercise?.variants) {
				variants = { [exerciseAnswer[0]]: exercise.variants };
			}
			if (!exercise?.variants) {
				variants = await getReadyQuestion(exerciseAnswer);
			}
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
		return state.find((item) => item.id === id)?.countCorrectAnswers || 0;
	},
}));
