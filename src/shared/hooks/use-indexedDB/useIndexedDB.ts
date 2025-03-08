import React, { useEffect } from 'react';
import { clearAllState, deleteState, loadState, saveState } from '@/utils/indexedDB';
import { type ExamModeProgressType, type RandomTest } from '@/store/progress';

type Action = 'save' | 'load' | 'delete' | 'clearAll';

export const useIndexedDB = (
	func: (
		firstArgument?: unknown,
		secondArgument?: unknown,
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
					const { examModeProgress, randomModeProgress } = func() as {
						examModeProgress: ExamModeProgressType;
						randomModeProgress: { isDone: boolean; progress: RandomTest[] };
					};
					await saveState(`${collectionId}_examModeProgress`, examModeProgress);
					await saveState(`${collectionId}_randomModeProgress`, randomModeProgress);
				}

				if (action === 'load') {
					console.log('USE INDEXED DB WORKS');
					const examM = await loadState<ExamModeProgressType>(`${collectionId}_examModeProgress`);
					const randomM = await loadState<{
						isDone: boolean;
						progress: RandomTest[];
					}>(`${collectionId}_randomModeProgress`);
					await func(examM, randomM);
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
