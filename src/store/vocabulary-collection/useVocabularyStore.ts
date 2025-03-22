import { create } from 'zustand';
import { filterVocabularyCollections, filterWordCollection } from './service';
import { ExerciseResponseType } from '@/shared/constants/collections/data';
import { getReadyQuestion } from '@/modules/vocabularies/services/fetchDefinition';

function shuffleArray(array: string[]) {
	const newArr = [...array];
	for (let i = newArr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[j]] = [newArr[j], newArr[i]];
	}
	return newArr;
}

const DEFAULT_VOCABULARY_CONFIG = {
	title: '',
	vocabularyTopic: [],
	vocabularyCategories: [],
	levelBased: [],
};

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

const DEFAULT_WORD_CONFIG = '';

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
	topic: 'vocabularyTopic',
	categories: 'vocabularyCategories',
	level: 'levelBased',
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
	exerciseAnswer: string[];
	selectedAnswer: string;
	currentWord: number;
	isComplete: boolean;
	isCorrectAnswer: boolean;
	explanationAnswer: string[];
	explanationVariants: string[];
	variants: { [key: string]: string[] };
};

type ExerciseConfigType = {
	exerciseMode: ExerciseModeType;
	exerciseCorrectResponse: number;
	exerciseFormate: ExerciseFormateType;
};

type CommonProgressDataType = {
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

type ExerciseListProgressType = {
	id: string;
	countCorrectAnswers: number;
};

type VocabularyConfigKeyType = keyof VocabularyConfigType;
type ExerciseConfigKeyType = keyof ExerciseConfigType;

type VocabularyStoreState = {
	vocabularyCollections: VocabularyListType[];
	collectionsVocabularyConfig: VocabularyConfigType;
	filteredCollectionsVocabulary: VocabularyListType[];
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
	getVocabularyConfig: (
		key: VocabularyConfigKeyType,
	) => VocabularyTopicType[] | VocabularyCategoriesType[] | LevelBasedType[] | string;
	getWordConfig: () => number[] | string | boolean | string[] | number;
	getExerciseById: (id: string) => Promise<ExerciseType | null>;
	getExerciseConfig: (
		key: ExerciseConfigKeyType,
	) => ExerciseModeType | number | ExerciseFormateType;
	getExerciseProgressById: (id: string) => number;
	setCollectionsExerciseConfig: (
		key: string,
		value: number[] | string | boolean | string[] | number,
	) => void;
	setCollectionsVocabularyConfig: (
		key: string,
		value: number[] | string | boolean | string[] | number,
	) => void;
	setWordConfig: (key: string, value: number[] | string | boolean | string[] | number) => void;
	setClean: () => void;
	setCleanWordConfig: () => void;
	setFilterVocabularyOnSearch: () => void;
	setFilterWordOnSearch: () => void;
	setVocabularyCollections: (vocabularyCollections: VocabularyListType[]) => void;
	setWordsListResponse: (vocabularyList: Word[]) => void;
	setExerciseListResponse: (exerciseList: ExerciseResponseType[], collectionId: string) => void;
	setExerciseListProgress: (id: string, isResolved: boolean) => void;
};

export type VocabularyStoreType = VocabularyStoreState & VocabularyStoreActions;

export const useVocabularyStoreBase = create<VocabularyStoreType>()((set, get) => ({
	vocabularyCollections: [],
	collectionsVocabularyConfig: DEFAULT_VOCABULARY_CONFIG,
	filteredCollectionsVocabulary: [],
	filteredWordsVocabulary: [],
	wordConfig: DEFAULT_WORD_CONFIG,
	words: [],
	exerciseListIds: [],
	collectionsExerciseConfig: {
		exerciseMode: EXERCISE_MODE.isRandom,
		exerciseCorrectResponse: 15,
		exerciseFormate: EXERCISE_FORMATE.isClassic,
	},
	exerciseList: [],
	exerciseListResponse: [],
	commonProgressData: {
		collectionId: '',
		resolvedExerciseIds: [],
	},
	resolvedExerciseId: [],
	exerciseListProgress: [],
	setCollectionsVocabularyConfig: (key, value) => {
		set((state) => ({
			...state,
			collectionsVocabularyConfig: {
				...state.collectionsVocabularyConfig,
				[key]: value,
			},
		}));
	},
	setWordConfig: (key, value) => {
		set((state) => ({
			...state,
			[key]: value,
		}));
	},
	setClean: () => {
		set((state) => ({
			...state,
			collectionsVocabularyConfig: DEFAULT_VOCABULARY_CONFIG,
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
	setFilterVocabularyOnSearch: () => {
		const collectionsVocabularyConfig = get().collectionsVocabularyConfig;
		const vocabularyCollections = get().vocabularyCollections;
		const filteredVocabulary = filterVocabularyCollections(
			vocabularyCollections,
			collectionsVocabularyConfig,
		);

		set((state) => {
			return { ...state, filteredCollectionsVocabulary: filteredVocabulary };
		});
	},
	setVocabularyCollections: (vocabularyCollections) => {
		set((state) => {
			return { ...state, vocabularyCollections: vocabularyCollections };
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
	setCollectionsExerciseConfig: (key, value) => {
		set((state) => ({
			collectionsExerciseConfig: {
				...state.collectionsExerciseConfig,
				[key]: value,
			},
		}));
	},
	getVocabularyConfig: (key) => {
		return get().collectionsVocabularyConfig[key];
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
		return state.find((item) => item.id === id)?.countCorrectAnswers || 0;
	},
}));
