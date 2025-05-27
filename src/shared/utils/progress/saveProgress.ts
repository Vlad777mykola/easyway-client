import {
	ExamModeProgressType,
	RandomTest,
	ResolvedRandomTest,
	ListProgress,
} from '@/store/progress';
import { saveState } from '@/db/indexedDB';

export const saveProgress = async (
	func: () => {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: { progress: RandomTest[]; resolved: ResolvedRandomTest[] };
		takenTestCount: { count: number; timestamp: number };
	},
	collectionId: string = '',
	exerciseListProgress: ListProgress[] = [],
) => {
	const { examModeProgress, randomModeProgress, takenTestCount } = func() as {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: {
			progress: RandomTest[];
			resolved: ResolvedRandomTest[];
		};
		takenTestCount: { count: number; timestamp: number };
		exerciseListProgress: ListProgress[];
	};

	console.log('SAVE PROGRESS exerciseListProgress: ', exerciseListProgress);

	await saveState(collectionId, {
		[`examModeProgress`]: examModeProgress,
		[`randomModeProgress`]: randomModeProgress,
		[`takenTestCount`]: takenTestCount,
		[`exerciseListProgress`]: exerciseListProgress,
	});
};
