import { ExamModeProgressType, RandomTest, ResolvedRandomTest } from '@/store/progress';
import { saveState } from '@/utils/indexedDB';

export const saveProgress = async (
	func: () => {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: { progress: RandomTest[]; resolved: ResolvedRandomTest[] };
		takenTestCount: { count: number; timestamp: number };
	},
	collectionId: string = '',
) => {
	const { examModeProgress, randomModeProgress, takenTestCount } = func() as {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: {
			progress: RandomTest[];
			resolved: ResolvedRandomTest[];
		};
		takenTestCount: { count: number; timestamp: number };
	};

	await saveState(collectionId, {
		[`examModeProgress`]: examModeProgress,
		[`randomModeProgress`]: randomModeProgress,
		[`takenTestCount`]: takenTestCount,
	});
};
