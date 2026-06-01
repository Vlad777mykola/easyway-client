import { ExerciseType, EXERCISE_FORMATE } from '@/store/dictionary';
import { Typography } from '@/ui-components/Typography';
import { classes } from '@/ui-design-atoms/classes';
import { Button } from '@/ui-components/Button';
import { speak } from '@/shared/utils/speak';
import { Icon } from '@/ui-components/Icon';

import { FormateType } from '../select-formate/types';
import styles from './exerciseContent.module.css';
import { useConfigStings } from '../../hooks/useConfigParamWithDefaultData';

export const ExerciseUI = ({ task, setTask, updateProgress, setIsAutoNavigate }: FormateType) => {
	const {
		variants,
		exercise,
		isComplete,
		// explanation,
		used = '',
		currentWord,
		exerciseAnswer,
		selectedAnswer,
		isCorrectAnswer,
	} = task;

	const { getFormate, getAutoPlay } = useConfigStings();
	const isAutoPlay = getAutoPlay();
	const isSelectingFormate = getFormate() === EXERCISE_FORMATE.Selecting;

	const onSelect = (answer: string) => {
		let word = answer;
		// if (currentWord === 0) {
		// 	word = answer.charAt(0).toUpperCase() + answer.slice(1);
		// }

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

		if (isAutoPlay) {
			speak(answer);
		}

		setTask((prev: ExerciseType) => {
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
			<Typography.Text type="secondary" className={styles.topic}>
				{used}
			</Typography.Text>
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

			{!isSelectingFormate && (
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
			)}
		</div>
	);
};
