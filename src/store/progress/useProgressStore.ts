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
	count: number;
	timestamp: number;
};

export type ProgressStoreState = {
	examModeProgress: ExamModeProgressType;
	randomModeProgress: {
		progress: RandomTest[];
		resolved: ResolvedRandomTest[];
	};
	latestTests: LatestTest;
};

type ProgressStoreActions = {
	setExamProgress: (id: string, isResolved: boolean) => void;
	setRandomProgress: (id: string, isResolved: boolean, totalCorrectResponse: number) => void;
	setLatestTests: () => void;
	getProgressFromIndexedDB: (
		examModeProgress: ExamModeProgressType,
		randomModeProgress: {
			progress: RandomTest[];
			resolved: ResolvedRandomTest[];
		},
		latestTests: LatestTest,
	) => void;
	saveProgressToIndexedDB: () => {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: { progress: RandomTest[]; resolved: ResolvedRandomTest[] };
		latestTests: LatestTest;
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
	latestTests: { count: 0, timestamp: 0 },
	setExamProgress: (id, isResolved) => {
		set((state) => {
			const { successProgress, errorProgress } = state.examModeProgress;

			return {
				...state,
				examModeProgress: {
					successProgress: isResolved ? successProgress.concat(id) : successProgress,
					errorProgress: !isResolved
						? errorProgress.concat(id)
						: errorProgress.filter((item) => item !== id),
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
	// rename to explain of function is do !!!!!
	// how much tests he completed it must just number counter -> get counter from indexed db set to state. Add plus one every time.
	setLatestTests: () => {
		const count = get().latestTests;
		console.log('COUNT: ', count);
		const time = Date.now();
		set((state) => ({
			...state,
			latestTests: {
				...state.latestTests,
				count: count.count + 1,
				timestamp: time,
			},
		}));
	},
	getProgressFromIndexedDB: (examModeProgress, randomModeProgress, latestTests) => {
		set((state) => ({
			...state,
			examModeProgress: examModeProgress || { successProgress: [], errorProgress: [] },
			randomModeProgress: randomModeProgress || { progress: [], resolved: [] },
			latestTests: latestTests || { count: 0, timestamp: 0 },
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
			latestTests: {
				count: 0,
				timestamp: 0,
			},
		}));
	},
}));
