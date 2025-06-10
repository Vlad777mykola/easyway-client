import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProgressStore } from '@/store/progress';
import { EXERCISE_CONFIG } from '@/store/exercise-progress';
import type { ExerciseType } from '@/store/dictionary';
// import { DoneCard } from '@/shared/components/done-card';
import { WrapperCard } from '@/ui-components/Wrapper-card';
// import { useBeforeunload } from '@/shared/hooks/use-before-unload/useBeforeunload';
import { useDictionaryStore, DEFAULT_DATA_TEST, EXERCISE_FORMATE } from '@/store/dictionary';
import { useIndexDB } from '@/shared/hooks/use-index-db';

import { PaginationExercise } from './components/pagination/Pagination';
import { SelectFormate } from './components/select-formate/SelectFormate';
import { useExerciseListData } from './hooks/useExerciseListData';
import { formatNavigate } from './utils';

import styles from './exerciseCard.module.css';
import { useQueryParam } from '@/shared/hooks/use-query-params';
import { useNavigate } from '@/shared/hooks/use-navigate';

export const DictionaryExerciseCard = () => {
	const { navWithQueryParams } = useNavigate();
	const { getParam } = useQueryParam();
	const { wordId = '', dictionaryId = '' } = useParams();
	const ID_DICTIONARY_EXERCISE = `dictionary_${dictionaryId}`;
	const [isAutoNavigate, setIsAutoNavigate] = useState(false);
	const [task, setTask] = useState<ExerciseType>(DEFAULT_DATA_TEST);

	// const isDoneExercise = wordId === 'done' || exerciseListId.length === 0;
	const isSelectingFormate = getParam(EXERCISE_CONFIG.FORMATE) === EXERCISE_FORMATE.Selecting;

	const getExerciseById = useDictionaryStore.use.getExerciseById();
	const setExerciseListResponse = useDictionaryStore.use.setExerciseListResponse();

	const saveProgressToIndexedDB = useProgressStore.use.saveProgressToIndexedDB();

	// const collectionsExerciseConfig = useDictionaryStore.use.collectionsExerciseConfig();
	// const setExamProgress = useProgressStore.use.setExamProgress();
	// const setRandomProgress = useProgressStore.use.setRandomProgress();
	// const setTakenTestCount = useProgressStore.use.setTakenTestCount();

	const progressDB = useIndexDB({});
	const collectionId = useDictionaryStore.use.commonData().collectionId;

	useExerciseListData(setExerciseListResponse, dictionaryId, dictionaryId === collectionId);
	// useBeforeunload(() => saveProgress(saveProgressToIndexedDB, ID_DICTIONARY_EXERCISE));

	const onNavigate = useCallback(
		(id: string) => {
			navWithQueryParams(formatNavigate.dictionariesWord(dictionaryId, id));
		},
		[navWithQueryParams, dictionaryId],
	);
	const navigateToDictionary = useCallback(
		() => navWithQueryParams(formatNavigate.dictionaries(dictionaryId)),
		[navWithQueryParams, dictionaryId],
	);

	useEffect(() => {
		if (wordId) {
			(async () => {
				const exercise = await getExerciseById(wordId);
				if (exercise) setTask(exercise);
			})();
		}
	}, [wordId, getExerciseById]);

	useEffect(() => {
		setIsAutoNavigate(false);

		progressDB.set(ID_DICTIONARY_EXERCISE, saveProgressToIndexedDB());
	}, [wordId, getExerciseById, ID_DICTIONARY_EXERCISE, progressDB, saveProgressToIndexedDB]);

	// const setModesProgress = async (id: string, isResolved: boolean) => {
	// 	if (collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isExam) {
	// 		setExamProgress(id, isResolved);
	// 	}
	// 	if (collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isRandom) {
	// 		setRandomProgress(id, isResolved, collectionsExerciseConfig.exerciseCorrectResponse);
	// 	}
	// 	// setExerciseListProgress(id, isResolved);
	// 	setTakenTestCount();
	// };

	const setProgress = (id: string, isResolved: boolean) => {
		console.log(id, isResolved);
	};

	return (
		<WrapperCard id={wordId} goBack={() => navigateToDictionary()}>
			<div className={styles.taskContainer}>
				{/* {isDoneExercise && <DoneCard onClick={() => navigateToDictionary()} />} */}

				{task && (
					<SelectFormate
						isSelectingFormate={isSelectingFormate}
						key={wordId}
						task={task}
						setTask={setTask}
						setIsAutoNavigate={setIsAutoNavigate}
						updateProgress={setProgress}
					/>
				)}

				<PaginationExercise
					taskId={wordId}
					isAutoNavigate={isAutoNavigate}
					onNavigate={(id: string) => onNavigate(id)}
				/>
			</div>
		</WrapperCard>
	);
};
