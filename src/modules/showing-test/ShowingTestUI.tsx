import { useNavigate } from 'react-router-dom';
import { Button } from '@/ui-components/Button';
import { CircleButton } from '@/ui-components/CircleButton';
import { Icon } from '@/ui-components/Icon';
import styles from './showingTest.module.css';
import type { Id, Test } from './ShowingTest';

type Sentence = {
	id: number;
	sentence: string;
	correctAnswer: string;
};

type Props = {
	swapQuestion: (idTest: number) => void;
	taskId: number;
	test: Test[];
	sentence: Sentence;
	chooseAnswer: string;
	questions?: string[][] | null;
	id: Id;
	onClick: (answer: string) => void;
};

export const ShowingTestUI = ({
	swapQuestion,
	taskId,
	test,
	sentence,
	chooseAnswer,
	questions,
	id,
	onClick,
}: Props) => {
	const navigate = useNavigate();

	return (
		<div className={styles.lessonPage}>
			<div className={styles.prevQuestion}>
				<CircleButton type="default" size="large" onClick={() => swapQuestion(taskId - 1)}>
					<Icon icon="left" variant="dark" />
				</CircleButton>
			</div>
			<div className={styles.nextQuestion}>
				<CircleButton type="default" size="large" onClick={() => swapQuestion(taskId + 1)}>
					<Icon icon="right" variant="dark" />
				</CircleButton>
			</div>
			<div className={styles.testContainer}>
				<h1 className={styles.topic}>Lesson Topic</h1>
				<div className={styles.sentenceContainer}>
					<p className={styles.sentence}>{sentence.sentence}</p>
					{test[Number(taskId) - 1]?.isCompleted && (
						<div className={styles.correctAnswerContainer}>
							<p className={styles.answer}>{sentence.correctAnswer}</p>
							<p className={styles.answer}>You Complete Test.</p>
						</div>
					)}
					{test[Number(taskId) - 1]?.isFault && !test[Number(taskId) - 1]?.isCompleted && (
						<div className={styles.uncorrectAnswerContainer}>
							<p className={styles.uncorrectAnswer}>{chooseAnswer}</p>
							<p className={styles.answer}>{sentence.correctAnswer}</p>
							<p className={styles.uncorrectAnswer}>Wrong Answer!</p>
						</div>
					)}
					{!test[Number(taskId) - 1]?.isCompleted && !test[Number(taskId) - 1]?.isFault && (
						<div className={styles.correctAnswerContainer}>
							<p className={styles.answer}>{chooseAnswer}</p>
						</div>
					)}
				</div>
				<div className={styles.words}>
					{questions &&
						questions.length > 1 &&
						!test[Number(taskId) - 1]?.isCompleted &&
						!test[Number(taskId) - 1]?.isFault &&
						questions[id.word].map((s, i) => (
							<div key={i} className={styles.word}>
								<Button
									size="large"
									type="default"
									onClick={() => {
										onClick(s);
									}}
								>
									{s}
								</Button>
							</div>
						))}
				</div>
			</div>
			<div className={styles.pagination}>
				{test.map((item) => (
					<Button
						key={item.id}
						size="small"
						color={item.isCompleted ? 'primary' : 'danger'}
						type="default"
						onClick={() => {
							navigate(`/collections/${item.id}/task/${item.id}`);
						}}
					>
						{item.id}
					</Button>
				))}
			</div>
		</div>
	);
};
