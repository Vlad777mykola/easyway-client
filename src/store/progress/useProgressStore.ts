import { create } from 'zustand';
import { calculateCompletionPercentage, calculateTotalProgress } from './service';

const COMPLETED_TEST = 100;

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

export type ListProgress = {
	id: string;
	countCorrectAnswers: number;
};

export type ProgressStoreState = {
	examModeProgress: ExamModeProgressType;
	randomModeProgress: {
		progress: RandomTest[];
		resolved: ResolvedRandomTest[];
	};
	takenTestCount: TakenTestCount;
	progressPercentage: {
		total: number;
		exam: number;
		random: {
			resolved: number;
			progress: number;
			unTouch: number;
		};
	};
	exerciseListProgress: ListProgress[];
};

type ProgressStoreActions = {
	setExamProgress: (id: string, isResolved: boolean) => void;
	setRandomProgress: (id: string, isResolved: boolean, totalCorrectResponse: number) => void;
	setTakenTestCount: () => void;
	setProgressPercentage: (count: number) => void;
	getProgressFromIndexedDB: (
		examModeProgress: ExamModeProgressType,
		randomModeProgress: {
			progress: RandomTest[];
			resolved: ResolvedRandomTest[];
		},
		takenTestCount: TakenTestCount,
		exerciseListProgress: ListProgress[],
	) => void;
	saveProgressToIndexedDB: () => {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: { progress: RandomTest[]; resolved: ResolvedRandomTest[] };
		takenTestCount: TakenTestCount;
		exerciseListProgress: ListProgress[];
	};
	resetItemProgress: (collectionId: string, nameProgress: string) => void;
	clearAll: () => void;
};

export type ProgressStoreType = ProgressStoreState & ProgressStoreActions;

const DEFAULT_STATE = {
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
	progressPercentage: {
		total: 0,
		exam: 0,
		random: {
			resolved: 0,
			progress: 0,
			unTouch: 0,
		},
	},
};

export const useProgressStoreBase = create<ProgressStoreType>()((set, get) => ({
	...DEFAULT_STATE,
	exerciseListProgress: [],
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

			const updatedProgress = existingItem
				? progress.map((item) =>
						item.id === id && item.correctCount < totalCorrectResponse
							? { ...item, correctCount: item.correctCount + (isResolved ? 1 : 0) }
							: item,
					)
				: isResolved
					? [...progress, { id, correctCount: 1 }]
					: progress;

			const updatedResolved = existingResolved
				? resolved.map((resolvedItem) => {
						if (resolvedItem.id !== id) return resolvedItem;

						const progressItem = updatedProgress.find((item) => item.id === id);
						const isNowDone = progressItem?.correctCount === totalCorrectResponse && isResolved;
						return { ...resolvedItem, isDone: isNowDone };
					})
				: [...resolved, { id, isDone: false }];

			return {
				...state,
				randomModeProgress: {
					...state.randomModeProgress,
					progress: updatedProgress,
					resolved: updatedResolved,
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
	setProgressPercentage: (count) => {
		const examModeProgress = get().examModeProgress;
		const radomModeProgress = get().randomModeProgress;

		let resolvedCount = 0;

		radomModeProgress.resolved.forEach((resolvedItem) => {
			if (resolvedItem.isDone) {
				resolvedCount += 1;
			}
		});

		const exam = calculateCompletionPercentage(examModeProgress.successProgress.length, count);
		const resolved = calculateCompletionPercentage(resolvedCount, count);
		const progress = calculateCompletionPercentage(
			radomModeProgress.progress.length - resolvedCount,
			count,
		);
		const unTouch = COMPLETED_TEST - progress - resolved;
		const total = calculateTotalProgress(exam, resolved);

		set((state) => ({
			...state,
			progressPercentage: {
				total,
				exam,
				random: {
					resolved,
					progress,
					unTouch,
				},
			},
		}));
	},
	getProgressFromIndexedDB: (data) => {
		set((state) => ({
			...state,
			...data,
		}));
	},
	saveProgressToIndexedDB: () => {
		const examModeProgress = get().examModeProgress;
		const randomModeProgress = get().randomModeProgress;
		const takenTestCount = get().takenTestCount;
		const exerciseListProgress = get().exerciseListProgress;

		return { examModeProgress, randomModeProgress, takenTestCount, exerciseListProgress };
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
			...DEFAULT_STATE,
		}));
	},
}));
