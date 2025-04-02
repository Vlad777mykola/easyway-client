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
	console.log('SAVE DICTIONARY PROGRESS');
	const { examModeProgress, randomModeProgress, takenTestCount } = func() as {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: {
			progress: RandomTest[];
			resolved: ResolvedRandomTest[];
		};
		takenTestCount: { count: number; timestamp: number };
	};

	console.log('examModeProgress DICTIONARY: ', examModeProgress);
	console.log('randomModeProgress DICTIONARY: ', randomModeProgress);
	console.log('takenTestCount DICTIONARY: ', takenTestCount);

	await saveState(`${collectionId}`, {
		[`examModeProgress`]: examModeProgress,
		[`randomModeProgress`]: randomModeProgress,
		[`takenTestCount`]: takenTestCount,
	});
};
