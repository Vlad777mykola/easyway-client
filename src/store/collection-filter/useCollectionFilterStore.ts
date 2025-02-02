import {
	TOPIC_TENSES,
	LEVEL,
	LEARNING_STYLE,
	LEARN_BY_INTEREST,
	LEARN_BY_SKILL,
} from '@/modules/collections/constants/store-constants';
import { create } from 'zustand';
import { filterCollections } from './service';

type collectionTensesType = (typeof TOPIC_TENSES)[keyof typeof TOPIC_TENSES];
type levelType = (typeof LEVEL)[keyof typeof LEVEL];
type learningStyleType = (typeof LEARNING_STYLE)[keyof typeof LEARNING_STYLE];
type learnByInterestType = (typeof LEARN_BY_INTEREST)[keyof typeof LEARN_BY_INTEREST];
type learnBySkillType = (typeof LEARN_BY_SKILL)[keyof typeof LEARN_BY_SKILL];

export type CollectionType = {
	id: string;
	title: string;
	subtitle: string;
	level: string;
	category: string[];
	topic: string[];
	learningStyle: string;
	learnByInterest: string;
	learnBySkill: string;
};

export type filterDatatype = {
	title: string;
	topic: collectionTensesType[];
	subtitle: string;
	category: collectionTensesType[];
	level: levelType;
	learningStyle: learningStyleType;
	learnByInterest: learnByInterestType;
	learnBySkill: learnBySkillType;
};

type CollectionFilterStoreState = {
	filterCollectionData: filterDatatype;
	collectionsData: CollectionType[];
	filteredCollectionsData: CollectionType[];
};

type CollectionFilterStoreActions = {
	getLevel: () => levelType;
	getTopic: () => collectionTensesType[];
	getTitle: () => string;
	getSubtitle: () => string;
	getCategory: () => collectionTensesType[];
	getLearningStyle: () => learningStyleType;
	getLearnByInterest: () => learnByInterestType;
	getLearnBySkill: () => learnBySkillType;
	setFilter: (key: string, value: number[] | string | boolean | string[] | number) => void;
	setCollections: (collections: CollectionType[]) => void;
	setFilterDataOnSearch: () => void;
};

export type CollectionFilterStoreType = CollectionFilterStoreState & CollectionFilterStoreActions;

export const useCollectionFilter = create<CollectionFilterStoreType>()((set, get) => ({
	filterCollectionData: {
		title: '',
		subtitle: '',
		topic: [TOPIC_TENSES.ASPECTS, TOPIC_TENSES.FUTURE_CONTINUOUS],
		category: [TOPIC_TENSES.PRESENT_SIMPLE, TOPIC_TENSES.PAST_SIMPLE],
		level: LEVEL.INTERMEDIATE,
		learningStyle: LEARNING_STYLE.SELECTING_MATCHING,
		learnByInterest: LEARN_BY_INTEREST.BOOKS,
		learnBySkill: LEARN_BY_SKILL.LISTENING,
	},
	collectionsData: [],
	filteredCollectionsData: [],
	getLevel: () => {
		return get().filterCollectionData.level;
	},
	getTopic: () => {
		return get().filterCollectionData.topic;
	},
	getTitle: () => {
		return get().filterCollectionData.title;
	},
	getSubtitle: () => {
		return get().filterCollectionData.subtitle;
	},
	getCategory: () => {
		return get().filterCollectionData.category;
	},
	getLearningStyle: () => {
		return get().filterCollectionData.learningStyle;
	},
	getLearnByInterest: () => {
		return get().filterCollectionData.learnByInterest;
	},
	getLearnBySkill: () => {
		return get().filterCollectionData.learnBySkill;
	},
	setFilter: (key, value) => {
		set((state) => {
			return { ...state, filterCollectionData: { ...state.filterCollectionData, [key]: value } };
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
		console.log(filterCollectionData, collectionsData, filteredData);

		set((state) => {
			return { ...state, filteredCollectionsData: filteredData };
		});
	},
}));
