import { useEffect } from 'react';
import { loadState, updateLastTest } from '@/utils/indexedDB';
import {
	type ExamModeProgressType,
	type RandomTest,
	type ResolvedRandomTest,
	type TakenTestCount,
	type ListProgress,
} from '@/store/progress';

export const useIndexedDB = (
	func: (
		examModeProgress: ExamModeProgressType,
		randomModeProgress: { progress: RandomTest[]; resolved: ResolvedRandomTest[] },
		takenTestCount: TakenTestCount,
		exerciseListProgress: ListProgress[],
	) => void,
	collectionId: string,
) => {
	useEffect(() => {
		(async () => {
			try {
				const loadedData = await loadState(collectionId);

				await updateLastTest(collectionId, `takenTestCount`, {
					count: 0,
					timestamp: 0,
				});
				await func(
					loadedData?.[`examModeProgress`] || {
						successProgress: [],
						errorProgress: [],
					},
					loadedData?.[`randomModeProgress`] || {
						progress: [],
						resolved: [],
					},
					loadedData?.[`takenTestCount`] || { count: 0, timestamp: 0 },
					loadedData?.[`exerciseListProgress`] || [],
				);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
};
