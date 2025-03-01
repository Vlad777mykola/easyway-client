import { create } from 'zustand';
import { localstorage } from '@/shared/utils/local-storage/localstorage';

type ExamModeProgressType = {
	successProgress: string[];
	errorProgress: string[];
};

type RandomWord = {
	id: string;
	correctCount: number;
	uncorrectCount: number;
};

type ProgressStoreState = {
	examModeProgress: ExamModeProgressType;
	randomModeProgress: RandomWord[];
};

type ProgressStoreActions = {
	setExamProgress: (id: string, isResolved: boolean) => void;
	setRandomProgress: (id: string, isResolved: boolean) => void;
	getExamProgressFromLocalStore: (collectionId: string) => void;
	saveProgressToLocalStore: (collectionId: string) => void;
};

export type ProgressStoreType = ProgressStoreState & ProgressStoreActions;

export const useProgressStoreBase = create<ProgressStoreType>()((set, get) => ({
	examModeProgress: {
		successProgress: [],
		errorProgress: [],
	},
	randomModeProgress: [],
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
		console.log('//ID: ', id);
		console.log('//IS RESOLVED: ', isResolved);
		let randomModeProgress = get().randomModeProgress;

		console.log('// RANDOM PROGRESS STORE: ', randomModeProgress);

		const isConsistThatId = randomModeProgress.some((item) => item.id === id);
		console.log('//IS CONSIST THAT ID: ', isConsistThatId);

		if (!isConsistThatId && isResolved) {
			randomModeProgress.push({ id, correctCount: 1, uncorrectCount: 0 });
		}

		if (!isConsistThatId && !isResolved) {
			randomModeProgress.push({ id, correctCount: 0, uncorrectCount: 1 });
		}

		if (isResolved && isConsistThatId) {
			set((state) => {
				return {
					...state,
					randomModeProgress: randomModeProgress.map((item) =>
						item.id === id ? { ...item, correctCount: item.correctCount + 1 } : item,
					),
				};
			});
		}

		if (!isResolved && isConsistThatId) {
			set((state) => {
				return {
					...state,
					randomModeProgress: randomModeProgress.map((item) =>
						item.id === id ? { ...item, uncorrectCount: item.uncorrectCount + 1 } : item,
					),
				};
			});
		}
	},
	getExamProgressFromLocalStore: (collectionId: string) => {
		console.log('COLLECTION ID: ', collectionId);
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

		set((state) => ({
			...state,
			examModeProgress: {
				successProgress,
				errorProgress,
			},
		}));
	},
	saveProgressToLocalStore: (collectionId) => {
		localstorage.removeItem(`${collectionId}_examModeProgress`);
		const examModeProgress = get().examModeProgress;
		localstorage.setItem(`${collectionId}_examModeProgress`, examModeProgress);
	},
}));
