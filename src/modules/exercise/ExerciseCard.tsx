import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { Pagination } from '@/shared/components/pagination/Pagination';
import { useBeforeunload } from '@/shared/hooks/useBeforeunload';
import { ExerciseUI } from './components/ExerciseUI';
import { useExerciseListData } from './hooks/useExerciseListData';
import type { ExerciseType } from '@/store/exercise-progress';

import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';

import styles from './exerciseCard.module.css';
import { useExerciseProgressStore, DEFAULT_DATA_TEST } from '@/store/exercise-progress';
import { EXERCISE_FORMATE } from '@/store/exercise-progress/useExerciseProgressStore';
import { SelectingUI } from './components/selecting-formate-ui/SelectingUI';
import { useCommonStore } from '@/store/common';

export const ExerciseCard = () => {
	const navigate = useNavigate();
	const { taskId = '', collectionsId = '' } = useParams();
	const [isAutoNavigate, setIsAutoNavigate] = useState(false);
	const [task, setTask] = useState<ExerciseType>(DEFAULT_DATA_TEST);

	const fullExerciseScreen = useCommonStore.use.fullExerciseScreen();
	const exerciseListId = useExerciseProgressStore.use.exerciseListIds();
	const totalExerciseCorrectResponse =
		useExerciseProgressStore.use.collectionsExerciseConfig().exerciseCorrectResponse;
	const isDoneExercise = taskId === 'done' || exerciseListId.length === 0;
	const isSelectingFormate =
		useExerciseProgressStore.use.collectionsExerciseConfig().exerciseFormate ===
		EXERCISE_FORMATE.isSelecting;

	const setFullScreen = useCommonStore.use.setFullScreen();
	const getExerciseMode = useExerciseProgressStore.use.getExerciseMode();
	const getExerciseById = useExerciseProgressStore.use.getExerciseById();
	const setExerciseListResponse = useExerciseProgressStore.use.setExerciseListResponse();
	const getExerciseProgressById = useExerciseProgressStore.use.getExerciseProgressById();
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

		return () => {
			saveProgressToLocalStore(collectionsId);
			setFullScreen(false);
		};
	}, [taskId]);

	return (
		<WrapperCard fullScreen={fullExerciseScreen} setFullScreen={setFullScreen}>
			<div className={styles.taskContainer}>
				{isDoneExercise && (
					<Result
						icon={<SmileOutlined />}
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
					<Pagination
						ids={exerciseListId}
						exerciseMode={getExerciseMode()}
						currentId={`${taskId}`}
						isAutoNavigate={isAutoNavigate}
						navigateTo={(id: string) => onNavigate(id)}
						totalCount={totalExerciseCorrectResponse}
						filedCount={getExerciseProgressById(taskId)?.countCorrectAnswers || 0}
					/>
				)}
			</div>
		</WrapperCard>
	);
};
