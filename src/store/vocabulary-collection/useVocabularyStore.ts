import { create } from 'zustand';
import { filterVocabularyCollections } from './service';

const DEFAULT_VOCABULARY_CONFIG = {
	title: '',
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
	title: 'title',
	topic: 'vocabularyTopic',
	categories: 'vocabularyCategories',
	level: 'levelBased',
} as const;

type Word = {
	english: string;
	ukrainian: string;
	transcription: string;
	partOfSpeech: string;
	explanation: string;
	examples: string[];
};

export type VocabularyListType = {
	id: string;
	title: string;
	topic: VocabularyTopicType;
	category: string[];
	level: LevelBasedType[];
	words: Word[];
};

type VocabularyTopicType = (typeof VOCABULARY_TOPICS)[keyof typeof VOCABULARY_TOPICS];
type VocabularyCategoriesType = (typeof VOCABULARY_CATEGORIES)[keyof typeof VOCABULARY_CATEGORIES];
type LevelBasedType = (typeof LEVEL_BASED)[keyof typeof LEVEL_BASED];

export type VocabularyConfigType = {
	title: string;
	vocabularyTopic: VocabularyTopicType[];
	vocabularyCategories: VocabularyCategoriesType[];
	levelBased: LevelBasedType[];
};
type VocabularyConfigKeyType = keyof VocabularyConfigType;

type VocabularyStoreState = {
	vocabularyCollections: VocabularyListType[];
	collectionsVocabularyConfig: VocabularyConfigType;
	filteredCollectionsVocabulary: VocabularyListType[];
};

type VocabularyStoreActions = {
	getVocabularyConfig: (
		key: VocabularyConfigKeyType,
	) => VocabularyTopicType[] | VocabularyCategoriesType[] | LevelBasedType[] | string;
	setCollectionsVocabularyConfig: (
		key: string,
		value: number[] | string | boolean | string[] | number,
	) => void;
	setClean: () => void;
	setFilterVocabularyOnSearch: () => void;
	setVocabularyCollections: (vocabularyCollections: VocabularyListType[]) => void;
};

export type VocabularyStoreType = VocabularyStoreState & VocabularyStoreActions;

export const useVocabularyStoreBase = create<VocabularyStoreType>()((set, get) => ({
	vocabularyCollections: [],
	collectionsVocabularyConfig: DEFAULT_VOCABULARY_CONFIG,
	filteredCollectionsVocabulary: [],
	setCollectionsVocabularyConfig: (key, value) => {
		set((state) => ({
			...state,
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
	setFilterVocabularyOnSearch: () => {
		const collectionsVocabularyConfig = get().collectionsVocabularyConfig;
		const vocabularyCollections = get().vocabularyCollections;
		const filteredVocabulary = filterVocabularyCollections(
			vocabularyCollections,
			collectionsVocabularyConfig,
		);

		console.log('FILTERED VOCABULARY: ', filteredVocabulary);

		set((state) => {
			return { ...state, filteredCollectionsVocabulary: filteredVocabulary };
		});
	},
	setVocabularyCollections: (vocabularyCollections) => {
		set((state) => {
			return { ...state, vocabularyCollections: vocabularyCollections };
		});
	},
	getVocabularyConfig: (key) => {
		return get().collectionsVocabularyConfig[key];
	},
}));
