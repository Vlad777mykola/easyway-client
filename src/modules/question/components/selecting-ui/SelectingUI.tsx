import { useNavigate, useParams } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { classes } from '@/ui-design-atoms/classes';
import { ALL_QUESTIONS_BY_ID } from '@/shared/constants/questions/collections';

import styles from './selectingUI.module.css';

type Task = {
	id: string;
	exercise: string;
	exerciseAnswer: string;
	explanation: string;
	explanationAnswer: string;
	explanationVariants: string[];
};

export const SelectingUI = ({
	task,
	setTask,
}: {
	task: Task;
	setTask: Dispatch<SetStateAction<Task>>;
}) => {
	const { exercise, explanationAnswer, explanationVariants } = task;

	const { questionsId = '', id = '' } = useParams();
	const navigate = useNavigate();
	const [error, setError] = useState<string>('');
	const [selectVariants, setSelectVariants] = useState<string[]>([]);
	const [selectedAnswer, setSelectedAnswer] = useState<string>('');
	const [isCorrect, setIsCorrect] = useState<boolean>(false);

	useEffect(() => {
		setSelectVariants(explanationVariants);

		return () => {
			setError('');
		};
	}, [explanationVariants]);

	useEffect(() => {
		setSelectedAnswer('');
	}, [id]);

	const onSelect = (answer: string) => {
		let word = answer;

		setSelectedAnswer(answer);

		const isCorrectWord = word.toLowerCase() === explanationAnswer.toLocaleLowerCase();

		if (!isCorrectWord) {
			setError(word);
			setIsCorrect(false);
			return;
		} else {
			setError('');
			setIsCorrect(true);
		}

		const filtered = selectVariants.filter((v) => v !== word);

		setTimeout(async () => {
			navigate(`/questions/${questionsId}/word/${Number(id) + 1}`);
			setTask((prev) => {
				const questionList = ALL_QUESTIONS_BY_ID.get(questionsId);

				const question =
					questionList?.find((q) => q.id === `${Number(prev.id) + 1}`) ??
					questionList?.find((q) => q.id === '1');

				if (isTask(question)) {
					return question;
				}

				return prev;
			});
		}, 3000);

		setSelectVariants(filtered);
	};

	const isTask = (value: unknown): value is Task => {
		return (
			typeof value === 'object' &&
			value !== null &&
			typeof (value as Task).id === 'string' &&
			typeof (value as Task).exercise === 'string'
		);
	};
	console.log('SELECTED ANSWER: ', selectedAnswer);

	return (
		<div className={styles.testContainer}>
			<div className={styles.exercise}>{exercise}</div>
			<div className={styles.correctAnswerContainer}>
				<div
					className={classes(styles.answer, {
						[styles.unconnectAnswer]: !isCorrect,
					})}
				>
					{selectedAnswer}
				</div>
			</div>

			<div className={styles.words}>
				{selectVariants.map((s, i) => (
					<div key={`${i}${s}`} className={styles.word}>
						<div
							className={classes(styles.variant, {
								[styles.defaultVariant]: error !== s,
								[styles.errorVariant]: error === s,
							})}
							onClick={() => onSelect(s)}
						>
							{s}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
