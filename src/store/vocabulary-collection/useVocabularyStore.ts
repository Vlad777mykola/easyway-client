import { create } from 'zustand';

const DEFAULT_VOCABULARY_CONFIG = {
	vocabularyTopic: [],
	vocabularyCategories: [],
	levelBased: [],
};

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
	topic: 'vocabularyTopic',
	categories: 'vocabularyCategories',
	level: 'levelBased',
} as const;

type Word = {
	english: string;
	ukrainian: string;
	transcription: string;
	partOfSpeech: VocabularyCategoriesType;
	explanation: string;
	examples: string[];
};

type VocabularyListType = {
	id: string;
	topic: VocabularyTopicType;
	categories: VocabularyCategoriesType[];
	level: LevelBasedType[];
	words: Word[];
};

type VocabularyTopicType = (typeof VOCABULARY_TOPICS)[keyof typeof VOCABULARY_TOPICS];
type VocabularyCategoriesType = (typeof VOCABULARY_CATEGORIES)[keyof typeof VOCABULARY_CATEGORIES];
type LevelBasedType = (typeof LEVEL_BASED)[keyof typeof LEVEL_BASED];

type VocabularyConfigType = {
	vocabularyTopic: VocabularyTopicType[];
	vocabularyCategories: VocabularyCategoriesType[];
	levelBased: LevelBasedType[];
};
type VocabularyConfigKeyType = keyof VocabularyConfigType;

type VocabularyStoreState = {
	vocabularyList: VocabularyListType[];
	collectionsVocabularyConfig: VocabularyConfigType;
};

type VocabularyStoreActions = {
	getVocabularyConfig: (
		key: VocabularyConfigKeyType,
	) => VocabularyTopicType[] | VocabularyCategoriesType[] | LevelBasedType[];
	setCollectionsVocabularyConfig: (
		key: string,
		value: number[] | string | boolean | string[] | number,
	) => void;
	setClean: () => void;
};

export type VocabularyStoreType = VocabularyStoreState & VocabularyStoreActions;

export const useVocabularyStoreBase = create<VocabularyStoreType>()((set, get) => ({
	vocabularyList: [],
	collectionsVocabularyConfig: {
		vocabularyTopic: [VOCABULARY_TOPICS.CLOTHES],
		vocabularyCategories: [VOCABULARY_CATEGORIES.ADJECTIVES],
		levelBased: [LEVEL_BASED.A1],
	},
	setCollectionsVocabularyConfig: (key, value) => {
		set((state) => ({
			collectionsVocabularyConfig: {
				...state.collectionsVocabularyConfig,
				[key]: value,
			},
		}));
	},
	setClean: () => {
		set((state) => ({
			...state,
			collectionsVocabularyConfig: DEFAULT_VOCABULARY_CONFIG,
		}));
	},
	getVocabularyConfig: (key) => {
		return get().collectionsVocabularyConfig[key];
	},
}));
