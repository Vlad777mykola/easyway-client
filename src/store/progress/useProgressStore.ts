import { create } from 'zustand';

export type ExamModeProgressType = {
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
	getProgressFromIndexedDB: (
		examModeProgress: ExamModeProgressType | unknown,
		randomModeProgress: { isDone: boolean; progress: RandomTest[] } | unknown,
	) => void;
	saveProgressToIndexedDB: () => {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: { isDone: boolean; progress: RandomTest[] };
	};
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
	getProgressFromIndexedDB: (examModeProgress: unknown, randomModeProgress: unknown) => {
		const examProgress = examModeProgress as ExamModeProgressType;
		const randomProgress = randomModeProgress as { isDone: boolean; progress: RandomTest[] };
		set((state) => ({
			...state,
			examModeProgress: examProgress || { successProgress: [], errorProgress: [] },
			randomModeProgress: randomProgress || { isDone: false, progress: [] },
		}));
	},
	saveProgressToIndexedDB: () => {
		const examModeProgress = get().examModeProgress;
		const randomModeProgress = get().randomModeProgress;
		return { examModeProgress, randomModeProgress };
	},
	resetItemProgress: (nameProgress) => {
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
	clearAll: () => {
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
