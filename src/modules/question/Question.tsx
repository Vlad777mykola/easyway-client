import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { WrapperCard } from '@/features/wrap-card';
import { Pagination } from '@/features/pagination-by-mode';
import { ALL_QUESTIONS_BY_ID } from '@/shared/constants/questions/collections';
import { SelectingUI } from './components/selecting-ui/SelectingUI';

import styles from './question.module.css';

type Task = {
	id: string;
	exercise: string;
	exerciseAnswer: string;
	explanation: string;
	explanationAnswer: string;
	explanationVariants: string[];
};

const Question = () => {
	const { questionsId = '', id = '' } = useParams();
	const navigate = useNavigate();

	const initialTask = ALL_QUESTIONS_BY_ID.get(questionsId)?.find((q) => q.id === id);
	const [task, setTask] = useState<Task>(
		initialTask ?? {
			id: '',
			exercise: '',
			exerciseAnswer: '',
			explanation: '',
			explanationVariants: [],
			explanationAnswer: '',
		},
	);

	const ids = Array.from({ length: ALL_QUESTIONS_BY_ID.get(questionsId)?.length || 0 }, (_, i) =>
		String(i + 1),
	);

	const navigateToDictionary = useCallback(() => navigate(`/questions/${id}`), [navigate, id]);

	const onNavigate = useCallback(
		(id: string) => {
			navigate(`/questions/${questionsId}/word/${id}`);
			setTask((prev) => {
				const question = ALL_QUESTIONS_BY_ID.get(questionsId)?.find(
					(question) => question.id === id,
				);

				return question ?? prev;
			});
		},
		[navigate, questionsId],
	);

	console.log('TASK: ', task);

	return (
		<WrapperCard id={id} goBack={() => navigateToDictionary()}>
			<div className={styles.taskContainer}>
				<SelectingUI task={task} setTask={setTask} />
				<Pagination
					ids={ids}
					exerciseMode={'infinitiveMode'}
					currentId={id}
					isAutoNavigate={false}
					navigateTo={(id: string) => onNavigate(id)}
				/>
			</div>
		</WrapperCard>
	);
};

export default Question;
