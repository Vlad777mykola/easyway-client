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

export type TakenTestCount = {
	count: number;
	timestamp: number;
};

export type ProgressStoreState = {
	examModeProgress: ExamModeProgressType;
	randomModeProgress: {
		progress: RandomTest[];
		resolved: ResolvedRandomTest[];
	};
	takenTestCount: TakenTestCount;
};

type ProgressStoreActions = {
	setExamProgress: (id: string, isResolved: boolean) => void;
	setRandomProgress: (id: string, isResolved: boolean, totalCorrectResponse: number) => void;
	setTakenTestCount: () => void;
	getProgressFromIndexedDB: (
		examModeProgress: ExamModeProgressType,
		randomModeProgress: {
			progress: RandomTest[];
			resolved: ResolvedRandomTest[];
		},
		takenTestCount: TakenTestCount,
	) => void;
	saveProgressToIndexedDB: () => {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: { progress: RandomTest[]; resolved: ResolvedRandomTest[] };
		takenTestCount: TakenTestCount;
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
	takenTestCount: { count: 0, timestamp: 0 },
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
	setTakenTestCount: () => {
		const count = get().takenTestCount;
		const time = Date.now();
		set((state) => ({
			...state,
			takenTestCount: {
				...state.takenTestCount,
				count: count.count + 1,
				timestamp: time,
			},
		}));
	},
	getProgressFromIndexedDB: (examModeProgress, randomModeProgress, takenTestCount) => {
		set((state) => ({
			...state,
			examModeProgress: examModeProgress || { successProgress: [], errorProgress: [] },
			randomModeProgress: randomModeProgress || { progress: [], resolved: [] },
			takenTestCount: takenTestCount || { count: 0, timestamp: 0 },
		}));
	},
	saveProgressToIndexedDB: () => {
		const examModeProgress = get().examModeProgress;
		const randomModeProgress = get().randomModeProgress;
		const takenTestCount = get().takenTestCount;
		return { examModeProgress, randomModeProgress, takenTestCount };
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
			takenTestCount: {
				count: 0,
				timestamp: 0,
			},
		}));
	},
}));
