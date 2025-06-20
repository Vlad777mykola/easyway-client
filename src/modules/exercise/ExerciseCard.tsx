import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@/ui-components/Icon';
import { Button } from '@/ui-components/Button';
import { Result } from '@/ui-components/Result';
import { WrapperCard } from '@/features/wrap-card';
import { useBeforeunload } from '@/shared/hooks/use-before-unload/useBeforeunload';
import { ExerciseUI } from './components/exercise-content/ExerciseContent';
import { useExerciseListData } from './hooks/useExerciseListData';
import { useExerciseProgressStore, DEFAULT_DATA_TEST } from '@/store/exercise-progress';
import {
	EXERCISE_FORMATE,
	EXERCISE_MODE,
} from '@/store/exercise-progress/useExerciseProgressStore';
import { SelectingUI } from './components/selecting-formate-ui/SelectingUI';
import type { ExerciseType } from '@/store/exercise-progress';
import { PaginationExercise } from './components/pagination/Pagination';
import { useProgressStore } from '@/store/progress';
import { saveProgress } from '@/shared/utils/progress/saveProgress';
import styles from './exerciseCard.module.css';

export const ExerciseCard = () => {
	const navigate = useNavigate();
	const { taskId = '', exercisesId = '' } = useParams();
	const ID_EXERCISE = `${exercisesId}_exercise`;
	const [isAutoNavigate, setIsAutoNavigate] = useState(false);
	const [task, setTask] = useState<ExerciseType>(DEFAULT_DATA_TEST);

	const exerciseListId = useExerciseProgressStore.use.exerciseListIds();
	const isDoneExercise = taskId === 'done' || exerciseListId.length === 0;
	const isSelectingFormate =
		useExerciseProgressStore.use.collectionsExerciseConfig().exerciseFormate ===
		EXERCISE_FORMATE.isSelecting;

	const collectionsExerciseConfig = useExerciseProgressStore.use.collectionsExerciseConfig();
	const exerciseCorrectResponse =
		useExerciseProgressStore.use.collectionsExerciseConfig().exerciseCorrectResponse;

	const getExerciseById = useExerciseProgressStore.use.getExerciseById();
	const setExerciseListResponse = useExerciseProgressStore.use.setExerciseListResponse();
	const setExerciseListProgress = useExerciseProgressStore.use.setExerciseListProgress();
	const getProgressFromLocalStore = useExerciseProgressStore.use.getProgressFromLocalStore();

	const saveProgressToIndexedDB = useProgressStore.use.saveProgressToIndexedDB();

	const setExamProgress = useProgressStore.use.setExamProgress();
	const setRandomProgress = useProgressStore.use.setRandomProgress();
	const setTakenTestCount = useProgressStore.use.setTakenTestCount();

	useExerciseListData(setExerciseListResponse, exercisesId);
	useBeforeunload(() => saveProgress(saveProgressToIndexedDB, ID_EXERCISE));

	const onNavigate = useCallback(
		(id: string) => {
			navigate(`/exercises/${exercisesId}/word/${id}`);
		},
		[navigate, exercisesId],
	);

	useEffect(() => {
		if (taskId) {
			(async () => {
				const exercise = await getExerciseById(taskId);
				if (exercise) setTask(exercise);
			})();
		}
	}, [taskId, getExerciseById]);

	useEffect(() => {
		getProgressFromLocalStore(exercisesId);
		setIsAutoNavigate(false);

		return () => {
			saveProgress(saveProgressToIndexedDB, ID_EXERCISE);
		};
	}, [taskId, ID_EXERCISE, exercisesId, getProgressFromLocalStore, saveProgressToIndexedDB]);

	const setModesProgress = async (id: string, isResolved: boolean) => {
		if (collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isExam) {
			setExamProgress(id, isResolved);
		}
		if (collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isRandom) {
			setRandomProgress(id, isResolved, exerciseCorrectResponse);
		}
		setExerciseListProgress(id, isResolved);
		setTakenTestCount();
	};

	return (
		<WrapperCard id={taskId} goBack={() => navigate(`/exercises/${exercisesId}`)}>
			<div className={styles.taskContainer}>
				{isDoneExercise && (
					<Result
						icon={<Icon icon="smile" size="xl" />}
						title="Great, you have done all the exercise!"
						extra={
							<Button onClick={() => navigate(`/exercises/${exercisesId}`)} type="primary">
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
						updateProgress={setModesProgress}
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
