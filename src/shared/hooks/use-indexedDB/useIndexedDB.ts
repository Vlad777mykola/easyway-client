import { useEffect } from 'react';
import { loadState, updateLastTest } from '@/utils/indexedDB';
import {
	type ExamModeProgressType,
	type RandomTest,
	type ResolvedRandomTest,
	type LatestTest,
} from '@/store/progress';

const DATA_FIELD = 'vocabulary';

export const useIndexedDB = (
	func: (
		examModeProgress: ExamModeProgressType,
		randomModeProgress: { progress: RandomTest[]; resolved: ResolvedRandomTest[] },
		latestTets: LatestTest,
	) => void,
	collectionId: string,
) => {
	useEffect(() => {
		(async () => {
			try {
				console.log('/// LOAD VOCABULARIES ID: ', collectionId);
				const loadedData = await loadState(`${collectionId}_vocabulary`);
				console.log('LOADED DATA: ', loadedData);
				await updateLastTest(`${collectionId}_${DATA_FIELD}`, `${collectionId}_latestTests`, {
					count: 0,
					timestamp: 0,
				});
				await func(
					loadedData?.[`${collectionId}_examModeProgress`] || {
						successProgress: [],
						errorProgress: [],
					},
					loadedData?.[`${collectionId}_randomModeProgress`] || {
						progress: [],
						resolved: [],
					},
					loadedData?.[`${collectionId}_latestTests`] || { count: 0, timestamp: 0 },
				);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
};
