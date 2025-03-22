import { ExamModeProgressType, RandomTest, ResolvedRandomTest } from '@/store/progress';
import { saveState } from '@/utils/indexedDB';

const DATA_FIELD = 'vocabulary';

export const saveVocabularyProgress = async (
	func: () => {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: { progress: RandomTest[]; resolved: ResolvedRandomTest[] };
		takenTestCount: { count: number; timestamp: number };
	},
	collectionId?: string,
) => {
	const { examModeProgress, randomModeProgress, takenTestCount } = func() as {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: {
			progress: RandomTest[];
			resolved: ResolvedRandomTest[];
		};
		takenTestCount: { count: number; timestamp: number };
	};

	await saveState(`${collectionId}_${DATA_FIELD}`, {
		[`examModeProgress`]: examModeProgress,
		[`randomModeProgress`]: randomModeProgress,
		[`takenTestCount`]: takenTestCount,
	});
};
