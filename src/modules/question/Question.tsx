import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { WrapperCard } from '@/features/wrap-card';
import { DoneCard } from '@/features/done-card';
import { Pagination } from '@/features/pagination-by-mode';
import { ALL_QUESTIONS_BY_ID } from '@/shared/constants/questions/collections';
import { SelectingUI } from './components/selecting-ui/SelectingUI';

import styles from './question.module.css';

const Question = () => {
	const { questionsId = '', id = '' } = useParams();
	const navigate = useNavigate();

	const [testIsDone, setTestIsDone] = useState<boolean>(false);
	const [task, setTask] = useState(
		ALL_QUESTIONS_BY_ID.get(questionsId)?.find((question) => question.id === id),
	);
	const [isAutoNavigate, setIsAutoNavigate] = useState(false);

	const ids = Array.from({ length: ALL_QUESTIONS_BY_ID.get(questionsId)?.length || 0 }, (_, i) =>
		String(i + 1),
	);
	const isSelectingFormate = 'selectingFormate';
	const isAutoPlay = true;

	console.log('QUESTION ID: ', questionsId);
	console.log('ID: ', id);
	console.log('TASK: ', task);
	console.log('IDS: ', ids);

	const navigateToDictionary = useCallback(() => navigate(`/questions/${id}`), [navigate, id]);

	const setModesProgress = () => {
		console.log('SET MODES PROGRESS');
	};

	const onNavigate = useCallback(
		(id: string) => {
			navigate(`/questions/${questionsId}/word/${id}`);
			setTask(ALL_QUESTIONS_BY_ID.get(questionsId)?.find((question) => question.id === id));
		},
		[navigate, questionsId],
	);

	return (
		<WrapperCard id={id} goBack={() => navigateToDictionary()}>
			<div className={styles.taskContainer}>
				{testIsDone && <DoneCard onClick={() => navigateToDictionary()} />}
				<SelectingUI task={task} setTask={setTask} />
				<Pagination
					ids={ids}
					exerciseMode={'infinitiveMode'}
					currentId={id}
					isAutoNavigate={isAutoNavigate}
					navigateTo={(id: string) => onNavigate(id)}
				/>
			</div>
		</WrapperCard>
	);
};

export default Question;
