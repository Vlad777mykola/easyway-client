import { ExamModeProgressType, RandomTest, ResolvedRandomTest } from '@/store/progress';
import { saveState } from '@/utils/indexedDB';

export const saveExerciseProgress = async (
	func: () => {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: { progress: RandomTest[]; resolved: ResolvedRandomTest[] };
		takenTestCount: { count: number; timestamp: number };
	},
	collectionId?: string,
) => {
	console.log('SAVE EXERCISE PROGRESS');
	const { examModeProgress, randomModeProgress, takenTestCount } = func() as {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: {
			progress: RandomTest[];
			resolved: ResolvedRandomTest[];
		};
		takenTestCount: { count: number; timestamp: number };
	};

	console.log('examModeProgress EXERCISE: ', examModeProgress);
	console.log('randomModeProgress EXERCISE: ', randomModeProgress);
	console.log('takenTestCount EXERCISE: ', takenTestCount);

	await saveState(`${collectionId}`, {
		[`examModeProgress`]: examModeProgress,
		[`randomModeProgress`]: randomModeProgress,
		[`takenTestCount`]: takenTestCount,
	});
};
