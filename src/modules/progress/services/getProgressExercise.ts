import { ExamModeProgressType, RandomTest, ResolvedRandomTest } from '@/store/progress';
import { calculateCompletionPercentage, calculateTotalProgress } from '@/store/progress/service';

const COMPLETED_TEST = 100;

export const getProgressExercise = (
	examModeProgress: ExamModeProgressType,
	resolvedCount: number,
	radomModeProgress: {
		progress: RandomTest[];
		resolved: ResolvedRandomTest[];
	},
	count: number,
) => {
	const exam = calculateCompletionPercentage(examModeProgress?.successProgress.length, count);
	const resolved = calculateCompletionPercentage(resolvedCount, count);
	const progress = calculateCompletionPercentage(
		radomModeProgress?.progress.length - resolvedCount,
		count,
	);
	const unTouch = COMPLETED_TEST - progress - resolved;
	const total = calculateTotalProgress(exam, resolved);

	return {
		total,
		exam,
		random: {
			resolved,
			progress,
			unTouch,
		},
	};
};
