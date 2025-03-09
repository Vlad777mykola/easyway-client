import { create } from 'zustand';

export type ExamModeProgressType = {
	successProgress: string[];
	errorProgress: string[];
};

export type RandomTest = {
	id: string;
	correctCount: number;
};

export type LatestTest = {
	id: string;
	timestamp: number;
};

export type ProgressStoreState = {
	examModeProgress: ExamModeProgressType;
	randomModeProgress: {
		isDone: boolean;
		progress: RandomTest[];
	};
	latestTests: LatestTest[];
};

type ProgressStoreActions = {
	setExamProgress: (id: string, isResolved: boolean) => void;
	setRandomProgress: (id: string, isResolved: boolean) => void;
	setIsDoneRandomProgress: (isDone: boolean) => void;
	setLatestTests: (id: string) => void;
	getProgressFromIndexedDB: (
		examModeProgress: ExamModeProgressType | unknown,
		randomModeProgress: { isDone: boolean; progress: RandomTest[] } | unknown,
		latestTests: LatestTest[],
	) => void;
	saveProgressToIndexedDB: () => {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: { isDone: boolean; progress: RandomTest[] };
		latestTests: LatestTest[];
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
	latestTests: [],
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
	setLatestTests: (id: string) => {
		const time = Date.now();
		const latestTests = get().latestTests;
		if (latestTests.some((item) => item.id === id)) {
			const filterArray = latestTests.filter((item) => item.id !== id);
			set((state) => {
				return {
					...state,
					latestTests: [{ id, timestamp: time }, ...filterArray],
				};
			});
		} else {
			set((state) => {
				return {
					...state,
					latestTests: [{ id, timestamp: time }, ...latestTests],
				};
			});
		}
	},
	// indexDB
	getProgressFromIndexedDB: (
		examModeProgress: unknown,
		randomModeProgress: unknown,
		latestTests: LatestTest[],
	) => {
		const examProgress = examModeProgress as ExamModeProgressType;
		const randomProgress = randomModeProgress as { isDone: boolean; progress: RandomTest[] };
		set((state) => ({
			...state,
			examModeProgress: examProgress || { successProgress: [], errorProgress: [] },
			randomModeProgress: randomProgress || { isDone: false, progress: [] },
			latestTests: latestTests || [],
		}));
	},
	saveProgressToIndexedDB: () => {
		const examModeProgress = get().examModeProgress;
		const randomModeProgress = get().randomModeProgress;
		const latestTests = get().latestTests;
		return { examModeProgress, randomModeProgress, latestTests };
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
			latestTests: [],
		}));
	},
}));
