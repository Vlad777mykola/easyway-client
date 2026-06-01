import {
	ExamModeProgressType,
	RandomTest,
	ResolvedRandomTest,
	TakenTestCount,
} from '@/store/progress';
import { ProgressStore } from '../Progress';
import { getWordsByVocabulary } from '@/shared/services/fetch-words-vocabulary/getWordsByVocabulary';
import { getProgressExercise } from './getProgressExercise';

type ProgressState = {
	examModeProgress: ExamModeProgressType;
	randomModeProgress: {
		progress: RandomTest[];
		resolved: ResolvedRandomTest[];
	};
	takenTestCount: TakenTestCount;
};

export const calculateProgress = (progress: ProgressStore[], progressId: string) => {
	const foundItem = progress.find((item) => Object.keys(item.progressStore).includes(progressId));

	const rawState = foundItem?.progressStore[progressId];
	const progressState =
		typeof rawState === 'object' && rawState !== null && 'examModeProgress' in rawState
			? (rawState as ProgressState)
			: undefined;

	if (progressState) {
		const examModeProgress = progressState?.examModeProgress;
		const randomModeProgress = progressState?.randomModeProgress;
		const errorProgress = examModeProgress?.errorProgress || [];

		const exercise = getWordsByVocabulary(progressId.charAt(0))?.length || 0;
		const resolvedCount =
			randomModeProgress?.resolved.filter((resolvedItem) => resolvedItem.isDone).length || 0;
		const { total, exam, random } = getProgressExercise(
			examModeProgress,
			resolvedCount,
			randomModeProgress,
			exercise,
		);

		return {
			total,
			exam,
			random,
			errorProgress,
		};
	}

	return {
		total: 0,
		exam: 0,
		random: {
			resolved: 0,
			progress: 0,
			unTouch: 0,
		},
		errorProgress: [],
	};
};
