import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ExerciseType } from '@/store/dictionary';
import { DoneCard } from '@/shared/components/done-card';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { useBeforeunload } from '@/shared/hooks/use-before-unload/useBeforeunload';
import { useDictionaryStore, DEFAULT_DATA_TEST, EXERCISE_FORMATE } from '@/store/dictionary';

import { PaginationExercise } from './components/pagination/Pagination';
import { SelectFormate } from './components/select-formate/SelectFormate';
import { useExerciseListData } from './hooks/useExerciseListData';

import styles from './exerciseCard.module.css';
import { saveExerciseProgress } from './utils/saveDictionaryProgress';
import { useProgressStore } from '@/store/progress';
import { EXERCISE_MODE } from '@/store/exercise-progress';

export const DictionaryExerciseCard = () => {
	const navigate = useNavigate();
	const { wordId = '', dictionaryId = '' } = useParams();
	const [isAutoNavigate, setIsAutoNavigate] = useState(false);
	const [task, setTask] = useState<ExerciseType>(DEFAULT_DATA_TEST);

	const exerciseListId = useDictionaryStore.use.exerciseListIds();
	const isDoneExercise = wordId === 'done' || exerciseListId.length === 0;
	const isSelectingFormate =
		useDictionaryStore.use.collectionsExerciseConfig().exerciseFormate ===
		EXERCISE_FORMATE.Selecting;

	const getExerciseById = useDictionaryStore.use.getExerciseById();
	const setExerciseListResponse = useDictionaryStore.use.setExerciseListResponse();
	const setExerciseListProgress = useDictionaryStore.use.setExerciseListProgress();
	const getProgressFromLocalStore = useDictionaryStore.use.getProgressFromLocalStore();

	const saveProgressToIndexedDB = useProgressStore.use.saveProgressToIndexedDB();

	const setExamProgress = useProgressStore.use.setExamProgress();
	const setRandomProgress = useProgressStore.use.setRandomProgress();
	const setTakenTestCount = useProgressStore.use.setTakenTestCount();

	const collectionsExerciseConfig = useDictionaryStore((state) => state.collectionsExerciseConfig);

	useExerciseListData(setExerciseListResponse, dictionaryId);
	useBeforeunload(() =>
		saveExerciseProgress(saveProgressToIndexedDB, `${dictionaryId}_dictionary`),
	);
	const onNavigate = useCallback(
		(id: string) => {
			navigate(`/dictionaries/${dictionaryId}/word/${id}`);
		},
		[navigate, dictionaryId],
	);
	const navigateToDictionary = useCallback(
		() => navigate(`/dictionaries/${dictionaryId}`),
		[navigate, dictionaryId],
	);

	useEffect(() => {
		if (wordId) {
			(async () => {
				const exercise = await getExerciseById(wordId);
				if (exercise) setTask(exercise);
			})();
		}
	}, [wordId]);

	useEffect(() => {
		getProgressFromLocalStore(dictionaryId);
		setIsAutoNavigate(false);

		return () => {
			saveExerciseProgress(saveProgressToIndexedDB, `${dictionaryId}_dictionary`);
		};
	}, [wordId]);

	const setModesProgress = async (id: string, isResolved: boolean) => {
		if (collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isExam) {
			setExamProgress(id, isResolved);
		}
		if (collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isRandom) {
			setRandomProgress(id, isResolved, collectionsExerciseConfig.exerciseCorrectResponse);
		}
		setExerciseListProgress(id, isResolved);
		setTakenTestCount();
	};

	return (
		<WrapperCard id={wordId} goBack={() => navigateToDictionary()}>
			<div className={styles.taskContainer}>
				{isDoneExercise && <DoneCard onClick={() => navigateToDictionary()} />}

				{!isDoneExercise && task && (
					<SelectFormate
						isSelectingFormate={isSelectingFormate}
						key={wordId}
						task={task}
						setTask={setTask}
						setIsAutoNavigate={setIsAutoNavigate}
						updateProgress={setModesProgress}
					/>
				)}

				{!isDoneExercise && exerciseListId && (
					<PaginationExercise
						taskId={wordId}
						isAutoNavigate={isAutoNavigate}
						onNavigate={(id: string) => onNavigate(id)}
					/>
				)}
			</div>
		</WrapperCard>
	);
};
