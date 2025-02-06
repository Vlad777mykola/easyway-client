import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { ExerciseListType } from '@/store/exercise-progress';
import { classes } from '@/shared/utils/classes';

import styles from './exerciseUI.module.css';

export const ExerciseUI = ({
	task,
	setTask,
	updateProgress,
	setIsAutoNavigate,
}: {
	task: ExerciseListType;
	setTask: Dispatch<SetStateAction<ExerciseListType>>;
	setIsAutoNavigate: Dispatch<SetStateAction<boolean>>;
	updateProgress: (id: string, isCorrectWord: boolean) => void;
}) => {
	const {
		variants,
		exercise,
		isComplete,
		explanation,
		currentWord,
		exerciseAnswer,
		selectedAnswer,
		isCorrectAnswer,
	} = task;

	const onSelect = (answer: string) => {
		let word = answer;
		if (currentWord === 0) {
			word = answer.charAt(0).toUpperCase() + answer.slice(1);
		}

		const isCorrectWord =
			word.toLowerCase() ===
			exerciseAnswer[currentWord].replace(/[^a-zA-Z0-9\s]/g, '').toLocaleLowerCase();
		const isComplete = currentWord + 1 === exerciseAnswer.length;
		if (isComplete) {
			updateProgress(task.id, isCorrectWord);
		}
		if (isComplete && isCorrectAnswer && isCorrectWord) {
			setIsAutoNavigate(true);
		}
		// const utterance = new SpeechSynthesisUtterance(answer);
		// utterance.lang = 'en-US';
		// window.speechSynthesis.speak(utterance);

		setTask((prev: ExerciseListType) => {
			return {
				...prev,
				selectedAnswer: `${prev.selectedAnswer} ${word}`,
				currentWord: prev.currentWord + 1,
				isCorrectAnswer: prev.isCorrectAnswer && isCorrectWord,
				isComplete,
			};
		});
	};

	return (
		<div className={styles.testContainer}>
			<h1 className={styles.topic}>{explanation}</h1>
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
						{!isCorrectAnswer && <p className={styles.answer}>{exerciseAnswer.join(' ')}</p>}
					</>
				)}
			</div>

			<div className={styles.words}>
				{variants[task.exerciseAnswer[currentWord]] &&
					variants[task.exerciseAnswer[currentWord]].map((s, i) => (
						<div key={i} className={styles.word}>
							<Button size="large" type="default" onClick={() => onSelect(s)}>
								{s}
							</Button>
						</div>
					))}
			</div>
		</div>
	);
};
