import { useEffect, useMemo, useState } from 'react';
import { useSelectData } from './hooks/useSelectData';
import { useNavigate, useParams } from 'react-router-dom';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { ShowingTestUI } from './ShowingTestUI';
import { Pagination } from './Pagination';
import { getTaskById } from './services/getTaskById';
import styles from './showingTest.module.css';
import { EXERCISE_MODE, useExerciseProgressStore } from '@/store/exercise-progress';

export type TestType = {
	id: string;
	exercise: string;
	explanation: string;
	exerciseAnswer: string[];
	selectedAnswer: string;
	currentWord: number;
	isComplete: boolean;
	isCorrectAnswer: boolean;
};

const DEFAULT_DATA_TEST = {
	id: '',
	exercise: '',
	explanation: '',
	exerciseAnswer: [],
	selectedAnswer: '',
	currentWord: 0,
	isComplete: false,
	isCorrectAnswer: true,
};

export const ShowingTest = () => {
	const navigate = useNavigate();
	const { taskId, collectionsId } = useParams();
	const isRandomMode = useExerciseProgressStore(
		(store) => store.collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.RANDOM_MODE,
	);

	const [task, setTask] = useState<TestType>(DEFAULT_DATA_TEST);
	const data = useSelectData(task.exerciseAnswer);
	const taskList = useMemo(() => getTaskById(collectionsId || ''), [collectionsId]);

	const onNavigate = (id: string) => {
		navigate(`/collections/${collectionsId}/task/${id}`);
	};

	useEffect(() => {
		const foundTask = taskList && taskList.find((i) => i.id === taskId);
		if (foundTask) {
			setTask({
				...DEFAULT_DATA_TEST,
				...foundTask,
				exerciseAnswer: foundTask.exerciseAnswer.split(' '),
			});
		}
	}, [taskId, taskList]);

	useEffect(() => {
		if (task.isComplete) {
			onNavigate(taskId || '');
		}
	}, [task.isComplete, onNavigate, taskId]);

	return (
		<WrapperCard>
			<div className={styles.taskContainer}>
				{data && <ShowingTestUI key={taskId} task={task} setTask={setTask} variants={data} />}
				{taskList && (
					<Pagination
						currentId={`${taskId}`}
						isRandom={isRandomMode}
						ids={taskList.map((i) => ({ id: `${i.id}` }))}
						navigateTo={(id: string) => onNavigate(id)}
					/>
				)}
			</div>
		</WrapperCard>
	);
};
