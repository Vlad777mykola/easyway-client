import { create } from 'zustand';
import { saveState, loadState, deleteState, clearAllState } from '@/utils/indexedDB';

type ExamModeProgressType = {
	successProgress: string[];
	errorProgress: string[];
};

export type RandomTest = {
	id: string;
	correctCount: number;
};

export type ProgressStoreState = {
	examModeProgress: ExamModeProgressType;
	randomModeProgress: {
		isDone: boolean;
		progress: RandomTest[];
	};
};

type ProgressStoreActions = {
	setExamProgress: (id: string, isResolved: boolean) => void;
	setRandomProgress: (id: string, isResolved: boolean) => void;
	setIsDoneRandomProgress: (isDone: boolean) => void;
	getProgressFromIndexedDB: (collectionId: string) => void;
	saveProgressToIndexedDB: (collectionId: string) => void;
	resetItemProgress: (collectionId: string, nameProgress: string) => void;
	clearAll: () => void;
};

export type ProgressStoreType = ProgressStoreState & ProgressStoreActions;

// total count during the day

export const useProgressStoreBase = create<ProgressStoreType>()((set, get) => ({
	examModeProgress: {
		successProgress: [],
		errorProgress: [],
	},
	randomModeProgress: {
		isDone: false, // need to be removed
		progress: [],
		resolved: [],
	},
	setExamProgress: (id, isResolved) => {
		set((state) => {
			const { successProgress, errorProgress } = state.examModeProgress;

			return {
				...state,
				examModeProgress: {
					successProgress: isResolved ? successProgress.concat(id) : successProgress,
					errorProgress: !isResolved ? errorProgress.concat(id) : errorProgress,
				},
			};
		});
	},
	setRandomProgress: (id, isResolved) => {
		set((state) => {
			const { progress } = state.randomModeProgress;
			const existingItem = progress.find((item) => item.id === id);

			return {
				...state,
				randomModeProgress: {
					...state.randomModeProgress,
					progress: existingItem
						? progress.map((item) =>
								item.id === id
									? { ...item, correctCount: item.correctCount + (isResolved ? 1 : 0) }
									: item,
							)
						: isResolved
							? [...progress, { id, correctCount: 1 }]
							: progress,
				},
			};
		});
	},
	setIsDoneRandomProgress: (isDone: boolean) => {
		set((state) => {
			return {
				...state,
				randomModeProgress: {
					...state.randomModeProgress,
					isDone,
				},
			};
		});
	},
	// indexDB
	getProgressFromIndexedDB: async (collectionId) => {
		const examModeProgress = await loadState<ExamModeProgressType>(
			`${collectionId}_examModeProgress`,
		);
		const randomModeProgress = await loadState<{ isDone: boolean; progress: RandomTest[] }>(
			`${collectionId}_randomModeProgress`,
		);

		console.log('examModeProgress INDEXED DB: ', examModeProgress);
		console.log('randomModeProgress INDEXED DB: ', randomModeProgress);

		set((state) => ({
			...state,
			examModeProgress: examModeProgress || { successProgress: [], errorProgress: [] },
			randomModeProgress: randomModeProgress || { isDone: false, progress: [] },
		}));
	},
	// indexDB
	saveProgressToIndexedDB: async (collectionId) => {
		const examModeProgress = get().examModeProgress;
		const randomModeProgress = get().randomModeProgress;
		saveState(`${collectionId}_examModeProgress`, examModeProgress);
		saveState(`${collectionId}_randomModeProgress`, randomModeProgress);
	},
	resetItemProgress: async (collectionId, nameProgress) => {
		await deleteState(`${collectionId}_${nameProgress}`);
		set((state) => ({
			...state,
			examModeProgress:
				nameProgress === 'examModeProgress'
					? {
							successProgress: [],
							errorProgress: [],
						}
					: state.examModeProgress,
			randomModeProgress:
				'randomModeProgress' === nameProgress
					? {
							isDone: false,
							progress: [],
						}
					: state.randomModeProgress,
		}));
	},
	clearAll: async () => {
		await clearAllState();
		set((state) => ({
			...state,
			examModeProgress: {
				successProgress: [],
				errorProgress: [],
			},
			randomModeProgress: {
				isDone: false,
				progress: [],
			},
		}));
	},
}));
