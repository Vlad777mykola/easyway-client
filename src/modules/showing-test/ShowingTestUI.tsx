import { Button } from '@/ui-components/Button';
import { Dispatch, SetStateAction } from 'react';
import type { TestType } from './ShowingTest';
import { classes } from '@/shared/utils/classes';

import styles from './showingTestUI.module.css';
import { VariantsType } from './functions/fetchDefinition';

export const ShowingTestUI = ({
	task,
	setTask,
	variants,
}: {
	task: TestType;
	setTask: Dispatch<SetStateAction<TestType>>;
	variants: VariantsType;
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

	const onSelect = (answer: string) => {
		let word = answer;
		if (currentWord === 0) {
			word = answer.charAt(0).toUpperCase() + answer.slice(1);
		}

		const utterance = new SpeechSynthesisUtterance(answer);
		utterance.lang = 'en-US';
		window.speechSynthesis.speak(utterance);

		console.log('ANSWER: ', answer);

		setTask((prev: TestType) => ({
			...prev,
			selectedAnswer: `${prev.selectedAnswer} ${word}`,
			currentWord: prev.currentWord + 1,
			isComplete: prev.currentWord + 1 === prev.exerciseAnswer.length,
			isCorrectAnswer:
				prev.isCorrectAnswer &&
				word === prev.exerciseAnswer[prev.currentWord].replace(/[^a-zA-Z0-9\s]/g, ''),
		}));
	};

	console.log('SENTENCE: ', explanation);

	return (
		<div className={styles.testContainer}>
			<h1 className={styles.topic}>{explanation}</h1>
			<p className={styles.exercise}>{exercise}</p>
			<div className={styles.correctAnswerContainer}>
				<p
					className={classes(styles.answer, {
						[styles.unconnectAnswer]: isComplete && !isCorrectAnswer,
					})}
				>
					{selectedAnswer}
				</p>
				{isComplete && (
					<>
						{/* {isCorrectAnswer && <p className={styles.correctAnswer}>You Complete Test.</p>} */}
						{!isCorrectAnswer && <p className={styles.answer}>{exerciseAnswer.join(' ')}</p>}
						{/* {!isCorrectAnswer && <p className={styles.uncorrectAnswer}>Wrong Answer!</p>} */}
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
