import { useEffect, useMemo, useState } from 'react';
import { useSelectData } from './hooks/useSelectData';
import { useNavigate, useParams } from 'react-router-dom';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { ShowingTestUI } from './ShowingTestUI';
import { Pagination } from './Pagination';
import { getTaskById } from './services/getTaskById';
import styles from './showingTest.module.css';

export type TestType = {
	id: string;
	sentence: string;
	lessonTopic: string;
	correctAnswer: string[];
	selectedAnswer: string;
	currentWord: number;
	isComplete: boolean;
	isCorrectAnswer: boolean;
};

const DEFAULT_DATA_TEST = {
	id: '',
	sentence: '',
	lessonTopic: '',
	correctAnswer: [],
	selectedAnswer: '',
	currentWord: 0,
	isComplete: false,
	isCorrectAnswer: true,
};

export const ShowingTest = () => {
	const navigate = useNavigate();
	const { taskId, collectionsId } = useParams();
	const [task, setTask] = useState<TestType>(DEFAULT_DATA_TEST);
	const data = useSelectData(task.correctAnswer);
	const taskList = useMemo(() => getTaskById(collectionsId || ''), [collectionsId]);

	useEffect(() => {
		const foundTask = taskList && taskList.find((i) => i.id === taskId);
		if (foundTask) {
			setTask({
				...DEFAULT_DATA_TEST,
				...foundTask,
				correctAnswer: foundTask.correctAnswer.split(' '),
			});
		}
	}, [taskId, taskList]);

	return (
		<WrapperCard>
			<div className={styles.taskContainer}>
				{data && <ShowingTestUI key={taskId} task={task} setTask={setTask} variants={data} />}
				{taskList && (
					<Pagination
						currentId={`${taskId}`}
						ids={taskList.map((i) => ({ id: `${i.id}` }))}
						navigateTo={(id: string) => navigate(`/collections/${collectionsId}/task/${id}`)}
					/>
				)}
			</div>
		</WrapperCard>
	);
};
