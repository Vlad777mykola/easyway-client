import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { Pagination } from '@/shared/components/pagination/Pagination';
import { ShowingTestUI } from './ShowingTestUI';
import { getTaskById } from './services/getTaskById';
import styles from './showingTest.module.css';
import {
	EXERCISE_MODE,
	ExerciseListType,
	useExerciseProgressStore,
} from '@/store/exercise-progress';
import { getReadyQuestion } from './functions/fetchDefinition';

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

export const ShowingTest = () => {
	const navigate = useNavigate();
	const { taskId, collectionsId } = useParams();
	const isRandomMode = useExerciseProgressStore(
		(store) => store.collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.RANDOM_MODE,
	);
	const totalExerciseCorrectResponse = useExerciseProgressStore(
		(store) => store.collectionsExerciseConfig.exerciseCorrectResponse,
	);
	const exerciseListId = useExerciseProgressStore((store) => store.exerciseListIds);
	const getExerciseById = useExerciseProgressStore((store) => store.getExerciseById);
	const setExerciseList = useExerciseProgressStore((store) => store.setExerciseList);
	const setExerciseListIds = useExerciseProgressStore((store) => store.setExerciseListIds);
	const getExerciseProgressById = useExerciseProgressStore(
		(store) => store.getExerciseProgressById,
	);
	const setExerciseListProgress = useExerciseProgressStore(
		(store) => store.setExerciseListProgress,
	);

	const [task, setTask] = useState<ExerciseListType>(DEFAULT_DATA_TEST);
	const taskList = getTaskById(collectionsId || '');

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
	}, [taskId]);

	useEffect(() => {
		if (taskList) {
			setExerciseListIds(taskList);
		}
	}, [taskList]);

	useEffect(() => {
		if (task.isComplete) {
			onNavigate(taskId || '');
		}
	}, [task.isComplete, onNavigate, taskId]);

	console.log();

	return (
		<WrapperCard>
			<div className={styles.taskContainer}>
				{task && (
					<ShowingTestUI
						key={taskId}
						task={task}
						setTask={setTask}
						updateProgress={setExerciseListProgress}
					/>
				)}
				{exerciseListId && (
					<Pagination
						currentId={`${taskId}`}
						isRandom={isRandomMode}
						ids={exerciseListId.map((i) => ({ id: `${i.id}` }))}
						navigateTo={(id: string) => onNavigate(id)}
						totalCountOfQuestions={totalExerciseCorrectResponse}
						correctQuestions={getExerciseProgressById(taskId || '')?.countCorrectAnswers || 0}
					/>
				)}
			</div>
		</WrapperCard>
	);
};
