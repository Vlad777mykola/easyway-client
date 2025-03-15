import { create } from 'zustand';
import { filterCollections } from './service';
import { TOPIC_TENSES } from './constants';

export const FILTER_LABELS = {
	title: 'title',
	topic: 'topic',
	category: 'category',
};

const DEFAULT_FILTER = {
	title: '',
	topic: [],
	category: [],
};

type CollectionTensesType = (typeof TOPIC_TENSES)[keyof typeof TOPIC_TENSES];
/* type LevelType = (typeof LEVEL)[keyof typeof LEVEL];
type LearningStyleType = (typeof LEARNING_STYLE)[keyof typeof LEARNING_STYLE];
type LearnByInterestType = (typeof LEARN_BY_INTEREST)[keyof typeof LEARN_BY_INTEREST];
type LearnBySkillType = (typeof LEARN_BY_SKILL)[keyof typeof LEARN_BY_SKILL]; */

export type CollectionType = {
	id: string;
	title: string;
	/* subtitle: string; */
	/* level: string; */
	category: string[];
	topic: string[];
	/* 	learningStyle: string;
	learnByInterest: string;
	learnBySkill: string; */
};

export type FilterDataType = {
	title: string;
	topic: CollectionTensesType[];
	/* subtitle: string; */
	category: CollectionTensesType[];
	/* level: LevelType;
	learningStyle: LearningStyleType;
	learnByInterest: LearnByInterestType;
	learnBySkill: LearnBySkillType; */
};

export type FilterDataKeyType = keyof FilterDataType;

type CollectionFilterStoreState = {
	filterCollectionData: FilterDataType;
	collectionsData: CollectionType[];
	filteredCollectionsData: CollectionType[];
};

type CollectionFilterStoreActions = {
	getFiltersData: <T extends keyof FilterDataType>(key: T) => FilterDataType[T];
	setFilter: (key: string, value: number[] | string | boolean | string[] | number) => void;
	setCollections: (collections: CollectionType[]) => void;
	setFilterDataOnSearch: () => void;
	setClean: () => void;
};

export type CollectionFilterStoreType = CollectionFilterStoreState & CollectionFilterStoreActions;

export const useCollectionFilterBase = create<CollectionFilterStoreType>()((set, get) => ({
	filterCollectionData: DEFAULT_FILTER,
	collectionsData: [],
	filteredCollectionsData: [],

	getFiltersData: (key) => {
		return get().filterCollectionData[key];
	},
	setFilter: (key, value) => {
		set((state) => {
			return { ...state, filterCollectionData: { ...state.filterCollectionData, [key]: value } };
		});
	},
	setClean: () => {
		set((state) => {
			return { ...state, filterCollectionData: DEFAULT_FILTER, filteredCollectionsData: [] };
		});
	},

	setCollections: (collections) => {
		set((state) => {
			return { ...state, collectionsData: collections };
		});
	},
	setFilterDataOnSearch: () => {
		const filterCollectionData = get().filterCollectionData;
		const collectionsData = get().collectionsData;
		const filteredData = filterCollections(collectionsData, filterCollectionData);
		console.log(filteredData);
		set((state) => {
			return { ...state, filteredCollectionsData: filteredData };
		});
	},
}));
