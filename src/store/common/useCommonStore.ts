import { create } from 'zustand';

type CollectionFilterStoreState = {
	fullExerciseScreen: boolean;
};

type CollectionFilterStoreActions = {
	setFullScreen: (fullExerciseScreen?: boolean) => void;
};

export type CollectionFilterStoreType = CollectionFilterStoreState & CollectionFilterStoreActions;

export const useCommonStoreBase = create<CollectionFilterStoreType>()((set, get) => ({
	fullExerciseScreen: false,
	setFullScreen: (fullExerciseScreen) => {
		set((state) => {
			return { ...state, fullExerciseScreen: !get().fullExerciseScreen || fullExerciseScreen };
		});
	},
}));
