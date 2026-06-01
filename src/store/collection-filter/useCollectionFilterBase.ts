import { create } from 'zustand';
import { filterCollections } from './service';
import { TOPIC_TENSES } from './constants';

export const FILTER_LABELS = {
	title: 'title',
	topic: 'topic',
	category: 'category',
	tenses: 'tenses',
	level: 'level',
};

const DEFAULT_FILTER = {
	title: '',
	topic: [],
	category: [],
	tenses: [],
	level: [],
};

type CollectionTensesType = (typeof TOPIC_TENSES)[keyof typeof TOPIC_TENSES];

export type CollectionType = {
	id: string;
	title: string;
	category: string[];
	topic: string[];
	tenses: string[];
	level: string[];
};

export type FilterDataType = {
	title: string;
	topic: CollectionTensesType[];
	category: CollectionTensesType[];
	level: string[];
	tenses: string[];
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
