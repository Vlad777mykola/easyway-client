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
	const saveProgressToLocalStore = useDictionaryStore.use.saveProgressToLocalStore();
	const getProgressFromLocalStore = useDictionaryStore.use.getProgressFromLocalStore();

	useExerciseListData(setExerciseListResponse, dictionaryId);
	useBeforeunload(() => saveProgressToLocalStore(dictionaryId));
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

		return () => saveProgressToLocalStore(dictionaryId);
	}, [wordId]);

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
						updateProgress={setExerciseListProgress}
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
