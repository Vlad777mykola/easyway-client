import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { Pagination } from '@/shared/components/pagination/Pagination';
import { ExerciseUI } from './ExerciseUI';
import { getTaskById } from './services/getTaskById';
import styles from './exerciseCard.module.css';
import { getReadyQuestion } from './services/fetchDefinition';
import {
	EXERCISE_MODE,
	ExerciseListType,
	useExerciseProgressStore,
} from '@/store/exercise-progress';
import { useBeforeunload } from '@/shared/hooks/useBeforeunload';

const DEFAULT_DATA_TEST = {
	id: '',
	exercise: '',
	explanation: '',
	exerciseAnswer: [],
	selectedAnswer: '',
	currentWord: 0,
	isComplete: false,
	isCorrectAnswer: true,
	variants: {},
};

export const ExerciseCard = () => {
	const navigate = useNavigate();
	const { taskId = '', collectionsId = '' } = useParams();
	const [isAutoNavigate, setIsAutoNavigate] = useState(false);
	const [task, setTask] = useState<ExerciseListType>(DEFAULT_DATA_TEST);
	const taskList = getTaskById(collectionsId);

	const exerciseListId = useExerciseProgressStore((store) => store.exerciseListIds);
	const isRandomMode = useExerciseProgressStore(
		(store) => store.collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.RANDOM_MODE,
	);
	const totalExerciseCorrectResponse = useExerciseProgressStore(
		(store) => store.collectionsExerciseConfig.exerciseCorrectResponse,
	);

	const getExerciseById = useExerciseProgressStore((store) => store.getExerciseById);
	const setExerciseList = useExerciseProgressStore((store) => store.setExerciseList);
	const setExerciseListIds = useExerciseProgressStore((store) => store.setExerciseListIds);
	const getExerciseProgressById = useExerciseProgressStore(
		(store) => store.getExerciseProgressById,
	);
	const setExerciseListProgress = useExerciseProgressStore(
		(store) => store.setExerciseListProgress,
	);
	const saveProgressToLocalStore = useExerciseProgressStore(
		(store) => store.saveProgressToLocalStore,
	);
	const setProgressFromLocalStore = useExerciseProgressStore(
		(store) => store.setProgressFromLocalStore,
	);

	useBeforeunload(() => saveProgressToLocalStore(collectionsId));

	const onNavigate = useCallback(
		(id: string) => {
			navigate(`/collections/${collectionsId}/task/${id}`);
		},
		[navigate, collectionsId],
	);

	useEffect(() => {
		const storedExercise = taskId && getExerciseById(taskId);
		const exercise = !storedExercise && taskList && taskList.find((i) => i.id === taskId);

		if (storedExercise) {
			setTask(storedExercise);
		}
		if (exercise && !storedExercise) {
			(async () => {
				const exerciseAnswer = exercise.exerciseAnswer.split(' ');
				const variants = await getReadyQuestion(exerciseAnswer);
				const newTask = {
					...DEFAULT_DATA_TEST,
					...exercise,
					exerciseAnswer,
					variants,
				};
				setTask(newTask);
				if (!storedExercise) {
					setExerciseList(newTask);
				}
			})();
		}
		setProgressFromLocalStore(collectionsId);
		setIsAutoNavigate(false);
	}, [taskId, taskList]);

	useEffect(() => {
		if (taskList) {
			setExerciseListIds(taskList);
		}
		return () => {
			saveProgressToLocalStore(collectionsId);
		};
	}, [taskList]);

	return (
		<WrapperCard>
			<div className={styles.taskContainer}>
				{task && (
					<ExerciseUI
						key={taskId}
						task={task}
						setIsAutoNavigate={setIsAutoNavigate}
						setTask={setTask}
						updateProgress={setExerciseListProgress}
					/>
				)}
				{exerciseListId && (
					<Pagination
						ids={exerciseListId}
						currentId={`${taskId}`}
						isRandom={isRandomMode}
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
