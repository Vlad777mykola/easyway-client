import { create } from 'zustand';

type CollectionFilterStoreState = {
	fullExerciseScreen: boolean;
};

type CollectionFilterStoreActions = {
	setFullScreen: (value?: boolean) => void;
};

export type CollectionFilterStoreType = CollectionFilterStoreState & CollectionFilterStoreActions;

export const useCommonStoreBase = create<CollectionFilterStoreType>()((set, get) => ({
	fullExerciseScreen: false,
	setFullScreen: (value) => {
		set((state) => {
			return { ...state, fullExerciseScreen: value || !get().fullExerciseScreen };
		});
	},
}));
