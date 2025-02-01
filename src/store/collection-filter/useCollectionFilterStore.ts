import {
	TOPIC_TENSES,
	LEVEL,
	LEARNING_STYLE,
} from '@/modules/collections/constants/store-constants';
import { create } from 'zustand';

type collectionTensesType = (typeof TOPIC_TENSES)[keyof typeof TOPIC_TENSES];
type levelType = (typeof LEVEL)[keyof typeof LEVEL];
type learningStyleType = (typeof LEARNING_STYLE)[keyof typeof LEARNING_STYLE];

type CollectionFilterStoreState = {
	filterCollectionData: {
		id: string;
		title: string;
		topic: collectionTensesType[];
		subtitle: string;
		category: collectionTensesType[];
		level: levelType;
		learningStyle: learningStyleType;
	};
};

type CollectionFilterStoreActions = {
	getLevel: () => levelType;
	getTopic: () => collectionTensesType[];
	getTitle: () => string;
	getSubtitle: () => string;
	getCategory: () => collectionTensesType[];
	getLearningStyle: () => learningStyleType;
	setFilter: (key: string, value: number[] | string | boolean | string[] | number) => void;
	setClear: () => void;
};

export type CollectionFilterStoreType = CollectionFilterStoreState & CollectionFilterStoreActions;

export const useCollectionFilter = create<CollectionFilterStoreType>()((set, get) => ({
	filterCollectionData: {
		id: '123',
		title: '',
		subtitle: 'Practice the sentence',
		topic: [TOPIC_TENSES.ASPECTS, TOPIC_TENSES.FUTURE_CONTINUOUS],
		category: [TOPIC_TENSES.FUTURE_CONTINUOUS, TOPIC_TENSES.FUTURE_PERFECT],
		level: LEVEL.ADVANCED,
		learningStyle: LEARNING_STYLE.SELECTING_MATCHING,
	},
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
	setFilter: (key, value) => {
		set((state) => {
			return { ...state, filterCollectionData: { ...state.filterCollectionData, [key]: value } };
		});
	},
	setClear: () => {
		set((state) => {
			return { ...state };
		});
	},
}));
