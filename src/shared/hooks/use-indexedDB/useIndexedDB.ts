import { useEffect } from 'react';
import { loadState, updateLastTest } from '@/utils/indexedDB';
import {
	type ExamModeProgressType,
	type RandomTest,
	type ResolvedRandomTest,
	type TakenTestCount,
} from '@/store/progress';

const DATA_FIELD = 'vocabulary';

export const useIndexedDB = (
	func: (
		examModeProgress: ExamModeProgressType,
		randomModeProgress: { progress: RandomTest[]; resolved: ResolvedRandomTest[] },
		takenTestCount: TakenTestCount,
	) => void,
	collectionId: string,
) => {
	useEffect(() => {
		(async () => {
			try {
				const loadedData = await loadState(`${collectionId}_vocabulary`);
				await updateLastTest(`${collectionId}_${DATA_FIELD}`, `takenTestCount`, {
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
				);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
};
