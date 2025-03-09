import React, { useEffect } from 'react';
import {
	clearAllState,
	deleteState,
	loadState,
	saveState,
	updateLastTest,
} from '@/utils/indexedDB';
import { type ExamModeProgressType, type RandomTest, type LatestTest } from '@/store/progress';

type Action = 'save' | 'load' | 'delete' | 'clearAll';

export const useIndexedDB = (
	func: (
		firstArgument?: unknown,
		secondArgument?: unknown,
		latestTets?: LatestTest[],
	) => {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: { isDone: boolean; progress: RandomTest[] };
	} | void,
	action: Action,
	collectionId?: string,
	wordId?: string,
	nameProgress?: string,
	clear?: boolean,
	setClear?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	useEffect(() => {
		(async () => {
			try {
				if (action === 'save') {
					console.log('SAVE TO INDEXED DB WORKS');
					const { examModeProgress, randomModeProgress, latestTests } = func() as {
						examModeProgress: ExamModeProgressType;
						randomModeProgress: { isDone: boolean; progress: RandomTest[] };
						latestTests: string[];
					};

					await saveState('data', {
						[`${collectionId}_examModeProgress`]: examModeProgress,
						[`${collectionId}_randomModeProgress`]: randomModeProgress,
						[`${collectionId}_latestTests`]: latestTests,
					});
				}

				if (action === 'load') {
					const loadedData = await loadState('data');
					await updateLastTest('data', `${collectionId}_latestTests`, []);
					await func(
						loadedData?.[`${collectionId}_examModeProgress`],
						loadedData?.[`${collectionId}_randomModeProgress`],
						loadedData?.[`${collectionId}_latestTests`],
					);
				}

				if (action === 'delete') {
					await deleteState(`${collectionId}_${nameProgress}`);
					func(nameProgress);
				}

				if (action === 'clearAll') {
					if (clear) {
						await clearAllState();
						func();
						setClear?.(false);
					}
				}
			} catch (error) {
				console.error(error);
			}
		})();
	}, [collectionId, clear, wordId, action]);
};
