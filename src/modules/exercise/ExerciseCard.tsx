import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@/ui-components/Icon';
import { Button } from '@/ui-components/Button';
import { Result } from '@/ui-components/Result';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { useBeforeunload } from '@/shared/hooks/use-before-unload/useBeforeunload';
import { ExerciseUI } from './components/exercise-content/ExerciseContent';
import { useExerciseListData } from './hooks/useExerciseListData';
import { useExerciseProgressStore, DEFAULT_DATA_TEST } from '@/store/exercise-progress';
import { EXERCISE_FORMATE } from '@/store/exercise-progress/useExerciseProgressStore';
import { SelectingUI } from './components/selecting-formate-ui/SelectingUI';
import type { ExerciseType } from '@/store/exercise-progress';
import styles from './exerciseCard.module.css';
import { PaginationExercise } from './components/pagination/Pagination';

export const ExerciseCard = () => {
	const navigate = useNavigate();
	const { taskId = '', collectionsId = '' } = useParams();
	const [isAutoNavigate, setIsAutoNavigate] = useState(false);
	const [task, setTask] = useState<ExerciseType>(DEFAULT_DATA_TEST);

	const exerciseListId = useExerciseProgressStore.use.exerciseListIds();
	const isDoneExercise = taskId === 'done' || exerciseListId.length === 0;
	const isSelectingFormate =
		useExerciseProgressStore.use.collectionsExerciseConfig().exerciseFormate ===
		EXERCISE_FORMATE.isSelecting;

	const getExerciseById = useExerciseProgressStore.use.getExerciseById();
	const setExerciseListResponse = useExerciseProgressStore.use.setExerciseListResponse();
	const setExerciseListProgress = useExerciseProgressStore.use.setExerciseListProgress();
	const saveProgressToLocalStore = useExerciseProgressStore.use.saveProgressToLocalStore();
	const getProgressFromLocalStore = useExerciseProgressStore.use.getProgressFromLocalStore();

	useExerciseListData(setExerciseListResponse, collectionsId);
	useBeforeunload(() => saveProgressToLocalStore(collectionsId));

	const onNavigate = useCallback(
		(id: string) => {
			navigate(`/collections/${collectionsId}/task/${id}`);
		},
		[navigate, collectionsId],
	);

	useEffect(() => {
		if (taskId) {
			(async () => {
				const exercise = await getExerciseById(taskId);
				if (exercise) setTask(exercise);
			})();
		}
	}, [taskId]);

	useEffect(() => {
		getProgressFromLocalStore(collectionsId);
		setIsAutoNavigate(false);

		return () => saveProgressToLocalStore(collectionsId);
	}, [taskId]);

	return (
		<WrapperCard id={taskId} goBack={() => navigate(`/collections/${collectionsId}`)}>
			<div className={styles.taskContainer}>
				{isDoneExercise && (
					<Result
						icon={<Icon icon="smile" size="xl" />}
						title="Great, you have done all the exercise!"
						extra={
							<Button onClick={() => navigate(`/collections/${collectionsId}`)} type="primary">
								Next
							</Button>
						}
					/>
				)}

				{!isDoneExercise && task && !isSelectingFormate && (
					<ExerciseUI
						key={taskId}
						task={task}
						setIsAutoNavigate={setIsAutoNavigate}
						setTask={setTask}
						updateProgress={setExerciseListProgress}
					/>
				)}
				{!isDoneExercise && task && isSelectingFormate && (
					<SelectingUI
						key={taskId}
						task={task}
						setIsAutoNavigate={setIsAutoNavigate}
						setTask={setTask}
						updateProgress={setExerciseListProgress}
					/>
				)}

				{!isDoneExercise && exerciseListId && (
					<PaginationExercise
						taskId={taskId}
						isAutoNavigate={isAutoNavigate}
						onNavigate={(id: string) => onNavigate(id)}
					/>
				)}
			</div>
		</WrapperCard>
	);
};
