import { create } from 'zustand';

export type ExamModeProgressType = {
	successProgress: string[];
	errorProgress: string[];
};

export type RandomTest = {
	id: string;
	correctCount: number;
};

export type ResolvedRandomTest = {
	id: string;
	isDone: boolean;
};

export type LatestTest = {
	id: string;
	timestamp: number;
};

export type ProgressStoreState = {
	examModeProgress: ExamModeProgressType;
	randomModeProgress: {
		progress: RandomTest[];
		resolved: ResolvedRandomTest[];
	};
	latestTests: LatestTest[];
};

type ProgressStoreActions = {
	setExamProgress: (id: string, isResolved: boolean) => void;
	setRandomProgress: (id: string, isResolved: boolean, totalCorrectResponse: number) => void;
	setLatestTests: (id: string) => void;
	getProgressFromIndexedDB: (
		examModeProgress: ExamModeProgressType | unknown,
		randomModeProgress: { progress: RandomTest[] } | unknown,
		latestTests: LatestTest[],
	) => void;
	saveProgressToIndexedDB: () => {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: { progress: RandomTest[]; resolved: ResolvedRandomTest[] };
		latestTests: LatestTest[];
	};
	resetItemProgress: (collectionId: string, nameProgress: string) => void;
	clearAll: () => void;
};

export type ProgressStoreType = ProgressStoreState & ProgressStoreActions;

export const useProgressStoreBase = create<ProgressStoreType>()((set, get) => ({
	examModeProgress: {
		successProgress: [],
		errorProgress: [],
	},
	randomModeProgress: {
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
	setRandomProgress: (id, isResolved, totalCorrectResponse) => {
		set((state) => {
			const { progress, resolved } = state.randomModeProgress;
			const existingItem = progress.find((item) => item.id === id);
			const existingResolved = resolved.find((item) => item.id === id);

			return {
				...state,
				randomModeProgress: {
					...state.randomModeProgress,
					progress: existingItem
						? progress.map((item) =>
								item.id === id && item.correctCount < totalCorrectResponse
									? { ...item, correctCount: item.correctCount + (isResolved ? 1 : 0) }
									: item,
							)
						: isResolved
							? [...progress, { id, correctCount: 1 }]
							: progress,
					resolved: existingResolved
						? resolved.map((resolvedItem) => {
								const progressItem = progress.find(
									(progressItem) => progressItem.id === resolvedItem.id,
								);
								if (
									resolvedItem.id === id &&
									progressItem?.correctCount === totalCorrectResponse - 1 &&
									isResolved
								) {
									return { ...resolvedItem, isDone: true };
								} else {
									return resolvedItem;
								}
							})
						: [...resolved, { id: id, isDone: false }],
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
	getProgressFromIndexedDB: (
		examModeProgress: unknown,
		randomModeProgress: unknown,
		latestTests: LatestTest[],
	) => {
		const examProgress = examModeProgress as ExamModeProgressType;
		const randomProgress = randomModeProgress as {
			progress: RandomTest[];
			resolved: ResolvedRandomTest[];
		};
		set((state) => ({
			...state,
			examModeProgress: examProgress || { successProgress: [], errorProgress: [] },
			randomModeProgress: randomProgress || { progress: [], resolved: [] },
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
							resolved: [],
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
				resolved: [],
			},
			latestTests: [],
		}));
	},
}));
