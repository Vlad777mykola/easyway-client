import { Button } from '@/ui-components/Button';
import { Dispatch, SetStateAction } from 'react';
import type { TestType } from './ShowingTest';
import { classes } from '@/shared/utils/classes';

import styles from './showingTestUI.module.css';
import { VariantsType } from './functions/fetchDefinition';
import { Icon } from '@/ui-components/Icon';
import { useExerciseProgressStore } from '@/store/exercise-progress';

export const ShowingTestUI = ({
	task,
	setTask,
	variants,
	// updateProgress,
}: {
	task: TestType;
	setTask: Dispatch<SetStateAction<TestType>>;
	variants: VariantsType;
	// updateProgress: (id: string, isCorrectWord: boolean) => void;
}) => {
	const {
		exercise,
		isComplete,
		explanation,
		currentWord,
		exerciseAnswer,
		selectedAnswer,
		isCorrectAnswer,
	} = task;

	const setExerciseListProgress = useExerciseProgressStore(
		(store) => store.setExerciseListProgress,
	);

	const onSelect = (answer: string) => {
		let word = answer;
		if (currentWord === 0) {
			word = answer.charAt(0).toUpperCase() + answer.slice(1);
		}

		const utterance = new SpeechSynthesisUtterance(answer);
		utterance.lang = 'en-US';
		window.speechSynthesis.speak(utterance);

		console.log('ANSWER: ', answer);

		setTask((prev: TestType) => {
			const isCorrectWord =
				word.toLowerCase() ===
				prev.exerciseAnswer[prev.currentWord].replace(/[^a-zA-Z0-9\s]/g, '').toLocaleLowerCase();
			const isComplete = prev.currentWord + 1 === prev.exerciseAnswer.length;

			if (isComplete) {
				setExerciseListProgress(task.id, isCorrectWord);
			}

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
