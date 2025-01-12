import { Button } from '@/ui-components/Button';
import { Dispatch, SetStateAction } from 'react';
import type { TestType } from './ShowingTest';
import { classes } from '@/utils/classes/classes';

import styles from './showingTestUI.module.module.css';

export const ShowingTestUI = ({
	task,
	setTask,
	variants,
}: {
	task: TestType;
	setTask: Dispatch<SetStateAction<TestType>>;
	variants: { [key: string]: [] };
}) => {
	const {
		sentence,
		isComplete,
		lessonTopic,
		currentWord,
		correctAnswer,
		selectedAnswer,
		isCorrectAnswer,
	} = task;

	const onSelect = (answer: string) => {
		let word = answer;
		if (currentWord === 0) {
			word = answer.charAt(0).toUpperCase() + answer.slice(1);
		}

		setTask((prev: TestType) => ({
			...prev,
			selectedAnswer: `${prev.selectedAnswer} ${word}`,
			currentWord: prev.currentWord + 1,
			isComplete: prev.currentWord + 1 === prev.correctAnswer.length,
			isCorrectAnswer:
				prev.isCorrectAnswer &&
				word === prev.correctAnswer[prev.currentWord].replace(/[^a-zA-Z0-9\s]/g, ''),
		}));
	};

	return (
		<div className={styles.testContainer}>
			<h1 className={styles.topic}>{lessonTopic}</h1>
			<p className={styles.sentence}>{sentence}</p>
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
						{!isCorrectAnswer && <p className={styles.answer}>{correctAnswer.join(' ')}</p>}
						{/* {!isCorrectAnswer && <p className={styles.uncorrectAnswer}>Wrong Answer!</p>} */}
					</>
				)}
			</div>

			<div className={styles.words}>
				{variants[task.correctAnswer[currentWord]] &&
					variants[task.correctAnswer[currentWord]].map((s, i) => (
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
