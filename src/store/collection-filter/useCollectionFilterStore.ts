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
	id: string;
	title: string;
	topic: collectionTensesType[];
	subtitle: string;
	category: collectionTensesType[];
	level: levelType;
	learningStyle: learningStyleType;
};

type CollectionFilterStoreActions = {
	getLevel: () => levelType;
	getTopic: () => collectionTensesType[];
	getTitle: () => string;
	getSubtitle: () => string;
};

export type CollectionFilterStoreType = CollectionFilterStoreState & CollectionFilterStoreActions;

export const useCollectionFilter = create<CollectionFilterStoreType>()((set, get) => ({
	id: '123',
	title: 'Present and Past',
	subtitle: 'Practice the sentence',
	topic: [TOPIC_TENSES.ASPECTS, TOPIC_TENSES.FUTURE_CONTINUOUS],
	category: [TOPIC_TENSES.FUTURE_CONTINUOUS, TOPIC_TENSES.FUTURE_PERFECT],
	level: LEVEL.ADVANCED,
	learningStyle: LEARNING_STYLE.SELECTING_MATCHING,
	getLevel: () => {
		return get().level;
	},
	getTopic: () => {
		return get().topic;
	},
	getTitle: () => {
		return get().title;
	},
	getSubtitle: () => {
		return get().subtitle;
	},
}));
