import { useNavigate, useParams } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { ExerciseType } from '@/store/dictionary';
import { classes } from '@/ui-design-atoms/classes';
import { speak } from '@/shared/utils/speak';

import styles from './selectingUI.module.css';
import { ALL_QUESTIONS_BY_ID } from '@/shared/constants/questions/collections';

export const SelectingUI = ({
	task,
	setTask,
	updateProgress,
	setIsAutoNavigate,
}: {
	task: ExerciseType;
	setTask: Dispatch<SetStateAction<ExerciseType>>;
	setIsAutoNavigate: Dispatch<SetStateAction<boolean>>;
	updateProgress: (id: string, isCorrectWord: boolean) => void;
}) => {
	const {
		exercise,
		isComplete,
		currentWord,
		explanationAnswer,
		selectedAnswer,
		isCorrectAnswer,
		explanation,
		explanationVariants,
	} = task;

	const { questionsId = '', id = '' } = useParams();
	const navigate = useNavigate();
	const [error, setError] = useState<string>('');
	const [selectVariants, setSelectVariants] = useState<string[]>([]);

	console.log('EXPLANATION ANSWER: ', explanationAnswer);

	useEffect(() => {
		setSelectVariants(explanationVariants);

		return () => {
			setError('');
		};
	}, [explanationVariants]);

	const onSelect = (answer: string) => {
		console.log('ANSWER: ', answer);
		console.log('explanationAnswer[currentWord]: ', explanationAnswer);
		let word = answer;

		const isCorrectWord = word.toLowerCase() === explanationAnswer.toLocaleLowerCase();

		if (!isCorrectWord) {
			setError(word);
			return;
		} else {
			setError('');
		}

		const filtered = selectVariants.filter((v) => v !== word);

		// if (currentWord === 0) {
		// 	word = answer.charAt(0).toUpperCase() + answer.slice(1);
		// }
		const isComplete = currentWord + 1 === explanationAnswer.length;
		if (isComplete) {
			updateProgress(task.id, isCorrectWord);
		}
		if (isComplete && isCorrectAnswer && isCorrectWord) {
			setIsAutoNavigate(true);
		}

		speak(word);

		setTask((prev) => {
			console.log('PREV: ', prev);

			let question = ALL_QUESTIONS_BY_ID.get(questionsId)?.find(
				(question) => question.id === `${Number(prev.id) + 1}`,
			);

			if (!question) {
				question = ALL_QUESTIONS_BY_ID.get(questionsId)?.find((question) => question.id === `1`);
			}

			navigate(`/questions/${questionsId}/word/${question?.id}`);

			return question;
		});

		setSelectVariants(filtered);
	};

	return (
		<div className={styles.testContainer}>
			<div className={styles.exercise}>{exercise}</div>
			<div className={styles.correctAnswerContainer}>
				<div
					className={classes(styles.answer, {
						[styles.unconnectAnswer]: isComplete && !isCorrectAnswer,
					})}
				>
					{selectedAnswer}
				</div>
				{isComplete && (
					<>
						{isCorrectAnswer && (
							<div className={styles.correctAnswer}>
								<Icon icon="check" variant="success" size="xl" />
							</div>
						)}
						{!isCorrectAnswer && <p className={styles.answer}>{explanation}</p>}
					</>
				)}
			</div>

			<div className={styles.words}>
				{selectVariants.map((s, i) => (
					<div key={`${i}${s}`} className={styles.word}>
						<Button
							size="large"
							color={error === s ? 'danger' : 'default'}
							variant="outlined"
							onClick={() => onSelect(s)}
						>
							{s}
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};
