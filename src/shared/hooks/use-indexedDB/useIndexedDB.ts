import React, { useEffect } from 'react';
import {
	clearAllState,
	deleteState,
	loadState,
	saveState,
	updateLastTest,
} from '@/utils/indexedDB';
import {
	type ExamModeProgressType,
	type RandomTest,
	type ResolvedRandomTest,
	type LatestTest,
} from '@/store/progress';

type Action = 'save' | 'load' | 'delete' | 'clearAll';

const DATA_FIELD = 'data';

export const useIndexedDB = (
	func: (
		firstArgument?: unknown,
		secondArgument?: unknown,
		latestTets?: LatestTest[],
	) => {
		examModeProgress: ExamModeProgressType;
		randomModeProgress: { progress: RandomTest[]; resolved: ResolvedRandomTest[] };
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
					const { examModeProgress, randomModeProgress, latestTests } = func() as {
						examModeProgress: ExamModeProgressType;
						randomModeProgress: {
							progress: RandomTest[];
							resolved: ResolvedRandomTest[];
						};
						latestTests: { count: number; timestamp: number };
					};

					await saveState(DATA_FIELD, {
						[`${collectionId}_examModeProgress`]: examModeProgress,
						[`${collectionId}_randomModeProgress`]: randomModeProgress,
						[`${collectionId}_latestTests`]: latestTests,
					});
				}

				if (action === 'load') {
					const loadedData = await loadState('data');
					await updateLastTest(DATA_FIELD, `${collectionId}_latestTests`, {
						count: 0,
						timestamp: 0,
					});
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
				// never delete all database !!!!!
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
