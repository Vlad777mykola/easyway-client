import {
	TOPIC_TENSES,
	LEVEL,
	LEARNING_STYLE,
	LEARN_BY_INTEREST,
	LEARN_BY_SKILL,
} from '@/modules/collections/constants/store-constants';
import { create } from 'zustand';
import { filterCollections } from './service';

type CollectionTensesType = (typeof TOPIC_TENSES)[keyof typeof TOPIC_TENSES];
type LevelType = (typeof LEVEL)[keyof typeof LEVEL];
type LearningStyleType = (typeof LEARNING_STYLE)[keyof typeof LEARNING_STYLE];
type LearnByInterestType = (typeof LEARN_BY_INTEREST)[keyof typeof LEARN_BY_INTEREST];
type LearnBySkillType = (typeof LEARN_BY_SKILL)[keyof typeof LEARN_BY_SKILL];

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

export type FilterDatatype = {
	title: string;
	topic: CollectionTensesType[];
	subtitle: string;
	category: CollectionTensesType[];
	level: LevelType;
	learningStyle: LearningStyleType;
	learnByInterest: LearnByInterestType;
	learnBySkill: LearnBySkillType;
};

type CollectionFilterStoreState = {
	filterCollectionData: FilterDatatype;
	collectionsData: CollectionType[];
	filteredCollectionsData: CollectionType[];
};

type CollectionFilterStoreActions = {
	getLevel: () => LevelType;
	getTopic: () => CollectionTensesType[];
	getTitle: () => string;
	getSubtitle: () => string;
	getCategory: () => CollectionTensesType[];
	getLearningStyle: () => LearningStyleType;
	getLearnByInterest: () => LearnByInterestType;
	getLearnBySkill: () => LearnBySkillType;
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

		set((state) => {
			return { ...state, filteredCollectionsData: filteredData };
		});
	},
}));
