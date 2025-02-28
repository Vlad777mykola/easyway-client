import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@/ui-components/Icon';
import { Button } from '@/ui-components/Button';
import { Result } from '@/ui-components/Result';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { useBeforeunload } from '@/shared/hooks/useBeforeunload';
import { ExerciseUI } from './components/exercise-content/ExerciseContent';
import { useExerciseListData } from './hooks/useExerciseListData';
import { useCommonStore } from '@/store/common';
import { useDictionaryStore, DEFAULT_DATA_TEST, EXERCISE_FORMATE } from '@/store/dictionary';
import type { ExerciseType } from '@/store/dictionary';
import { SelectingUI } from './components/selecting-formate-ui/SelectingUI';
import { PaginationExercise } from './components/pagination/Pagination';

import styles from './exerciseCard.module.css';

export const DictionaryExerciseCard = () => {
	const navigate = useNavigate();
	const { wordId = '', dictionaryId = '' } = useParams();
	const [isAutoNavigate, setIsAutoNavigate] = useState(false);
	const [task, setTask] = useState<ExerciseType>(DEFAULT_DATA_TEST);

	const fullExerciseScreen = useCommonStore.use.fullExerciseScreen();
	const exerciseListId = useDictionaryStore.use.exerciseListIds();
	const isDoneExercise = wordId === 'done' || exerciseListId.length === 0;
	const isSelectingFormate =
		useDictionaryStore.use.collectionsExerciseConfig().exerciseFormate ===
		EXERCISE_FORMATE.isSelecting;

	const setFullScreen = useCommonStore.use.setFullScreen();
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
		<WrapperCard fullScreen={fullExerciseScreen} setFullScreen={setFullScreen}>
			<div className={styles.taskContainer}>
				{isDoneExercise && (
					<Result
						icon={<Icon icon="smile" size="xl" />}
						title="Great, you have done all the exercise!"
						extra={
							<Button onClick={() => navigate(`/collections/${dictionaryId}`)} type="primary">
								Next
							</Button>
						}
					/>
				)}

				{!isDoneExercise && task && !isSelectingFormate && (
					<ExerciseUI
						key={wordId}
						task={task}
						setIsAutoNavigate={setIsAutoNavigate}
						setTask={setTask}
						updateProgress={setExerciseListProgress}
					/>
				)}
				{!isDoneExercise && task && isSelectingFormate && (
					<SelectingUI
						key={wordId}
						task={task}
						setIsAutoNavigate={setIsAutoNavigate}
						setTask={setTask}
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
