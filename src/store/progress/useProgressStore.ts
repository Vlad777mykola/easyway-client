import { create } from 'zustand';
import { localstorage } from '@/shared/utils/local-storage/localstorage';

type ExamModeProgressType = {
	successProgress: string[];
	errorProgress: string[];
};

export type RandomTest = {
	id: string;
	correctCount: number;
};

type ProgressStoreState = {
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
	getExamProgressFromLocalStore: (collectionId: string) => void;
	saveProgressToLocalStore: (collectionId: string) => void;
};

export type ProgressStoreType = ProgressStoreState & ProgressStoreActions;

export const useProgressStoreBase = create<ProgressStoreType>()((set, get) => ({
	examModeProgress: {
		successProgress: [],
		errorProgress: [],
	},
	randomModeProgress: {
		isDone: false,
		progress: [],
	},
	setExamProgress: (id, isResolved) => {
		set((state) => {
			const successProgress = get().examModeProgress.successProgress;
			const errorProgress = get().examModeProgress.errorProgress;
			if (isResolved && !successProgress.includes(id)) {
				return {
					...state,
					examModeProgress: {
						...state.examModeProgress,
						successProgress: !successProgress.includes(id)
							? [...successProgress, id]
							: [...successProgress],
						errorProgress: errorProgress.includes(id)
							? [...errorProgress.filter((item) => item !== id)]
							: [...errorProgress],
					},
				};
			} else {
				return {
					...state,
					examModeProgress: {
						...state.examModeProgress,
						errorProgress: !errorProgress.includes(id)
							? [...errorProgress, id]
							: [...errorProgress],
					},
				};
			}
		});
	},
	setRandomProgress: (id, isResolved) => {
		let randomModeProgress = get().randomModeProgress.progress;

		const isConsistThatId = randomModeProgress.some((item) => item.id === id);

		if (!isConsistThatId && isResolved) {
			randomModeProgress.push({ id, correctCount: 1 });
		}

		if (isResolved && isConsistThatId) {
			set((state) => {
				return {
					...state,
					randomModeProgress: {
						...state.randomModeProgress,
						progress: randomModeProgress.map((item) =>
							item.id === id ? { ...item, correctCount: item.correctCount + 1 } : item,
						),
					},
				};
			});
		}
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
	getExamProgressFromLocalStore: (collectionId: string) => {
		const examProgressSuccess = get().examModeProgress.successProgress.length > 0;
		const examProgressError = get().examModeProgress.errorProgress.length > 0;

		if (examProgressSuccess || examProgressError) {
			return;
		}

		const {
			successProgress,
			errorProgress,
		}: {
			successProgress: string[];
			errorProgress: string[];
		} = localstorage.getItem(`${collectionId}_examModeProgress`) || {
			successProgress: [],
			errorProgress: [],
		};

		const {
			isDone,
			progress,
		}: {
			isDone: boolean;
			progress: RandomTest[];
		} = localstorage.getItem(`${collectionId}_randomModeProgress`) || {
			isDone: false,
			progress: [],
		};

		set((state) => ({
			...state,
			examModeProgress: {
				successProgress,
				errorProgress,
			},
			randomModeProgress: {
				isDone,
				progress,
			},
		}));
	},
	saveProgressToLocalStore: (collectionId) => {
		localstorage.removeItem(`${collectionId}_examModeProgress`);
		localstorage.removeItem(`${collectionId}_randomModeProgress`);
		const examModeProgress = get().examModeProgress;
		const randomModeProgress = get().randomModeProgress;
		localstorage.setItem(`${collectionId}_examModeProgress`, examModeProgress);
		localstorage.setItem(`${collectionId}_randomModeProgress`, randomModeProgress);
	},
}));
