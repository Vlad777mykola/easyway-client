import { ReactNode, useEffect, useState } from 'react';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { CircleButton } from '@/ui-components/CircleButton';
import { DEFAULT_TEST } from '@/constants/data';
import { fetchDefinition, getReadyQuestion } from './functions/fetchDefinition';
import styles from './showingTest.module.css';
import { useSelectData } from './hooks/useSelectData';
import { useNavigate, useParams } from 'react-router-dom';

type Test = {
	id: number;
	sentence: string;
	correctAnswer: string;
	isCompleted: boolean;
	isFault: boolean;
};

export type Answer = {
	id: number;
	name: ReactNode;
	isCorrect: boolean;
};

type SentenceQuestion = {
	id: number;
	questions: string[][];
	isCompleted: boolean;
};

type Answered = {
	isCorrectAnswer: number;
	correctAnswers: string[];
	correctAnswer: string;
	answeredQuestions: number;
};

type Id = {
	word: number;
};

export const ShowingTest = () => {
	const [test, setTest] = useState<Test[]>([]);
	const [chooseAnswer, setChooseAnswer] = useState<string>('');
	const [readyQuestion, setReadyQuestion] = useState<SentenceQuestion>();
	const [sentence, setSentence] = useState({ ...DEFAULT_TEST[0] });
	const [answered, setAnswered] = useState<Answered>({
		isCorrectAnswer: 0,
		correctAnswers: sentence.correctAnswer.split(' '),
		correctAnswer: sentence.correctAnswer.split(' ')[0],
		answeredQuestions: 0,
	});

	const [id, setId] = useState<Id>({
		word: 0,
	});

	const { taskId } = useParams();

	const navigate = useNavigate();

	const data = useSelectData(answered.correctAnswers);

	const onClick = (answer: string) => {
		const answeredQ = answered.answeredQuestions + 1;
		let correct = 0;
		setAnswered({ ...answered, answeredQuestions: answeredQ });

		if (answered.correctAnswer === answer.toLocaleLowerCase()) {
			correct = answered.isCorrectAnswer + 1;
			setAnswered({ ...answered, isCorrectAnswer: correct, answeredQuestions: answeredQ });
		}

		if (answeredQ !== answered.correctAnswers.length) {
			const word = id.word + 1;
			setId({ ...id, word: word });
			setAnswered({
				...answered,
				isCorrectAnswer: correct,
				answeredQuestions: answeredQ,
				correctAnswer: answered.correctAnswers[word]
					.replace(/[^a-zA-Z0-9]/g, '')
					.toLocaleLowerCase(),
			});
		}

		if (correct === answered.correctAnswers.length) {
			setTest([
				...test.map((q) => {
					if (q.id === Number(taskId)) {
						return { ...q, isCompleted: true };
					} else {
						return { ...q };
					}
				}),
			]);
		}

		if (
			answeredQ === answered.correctAnswers.length &&
			correct !== answered.correctAnswers.length
		) {
			setTest([
				...test.map((q) => {
					if (q.id === Number(taskId)) {
						return { ...q, isFault: true };
					} else {
						return { ...q };
					}
				}),
			]);
		}

		setChooseAnswer(chooseAnswer + ` ${answer}`);
	};

	const swapQuestion = (idTest: number) => {
		let questionId: number = 0;
		if (idTest <= test.length) {
			questionId = idTest;
			navigate(`/collections/${idTest}/task/${idTest}`);
			showSentence(idTest);
		}

		if (idTest > test.length) {
			questionId = 1;
			navigate(`/collections/${questionId}/task/${questionId}`);
			showSentence(questionId);
		}

		if (idTest < 1) {
			questionId = test.length;
			navigate(`/collections/${questionId}/task/${questionId}`);
			showSentence(questionId);
		}
	};

	const showSentence = (idSentence: number) => {
		setChooseAnswer('');
		for (let i = 0; i < DEFAULT_TEST.length; i++) {
			if (DEFAULT_TEST[i].id === idSentence) {
				setSentence({ ...DEFAULT_TEST[i] });
				fetchDefinition(DEFAULT_TEST[i].correctAnswer.split(' ')[0]);
				setId({ word: 0 });
				setAnswered({
					...answered,
					isCorrectAnswer: 0,
					correctAnswers: DEFAULT_TEST[i].correctAnswer.split(' '),
					correctAnswer: DEFAULT_TEST[i].correctAnswer
						.split(' ')[0]
						.replace(/[^a-zA-Z0-9]/g, '')
						.toLocaleLowerCase(),
					answeredQuestions: 0,
				});
			}
		}
	};

	const getQuestion = async () => {
		const answers: string[][] = await getReadyQuestion(answered.correctAnswers);
		setReadyQuestion([...answers]);
	};

	useEffect(() => {
		fetchDefinition(answered.correctAnswer);
		const allQuestions = DEFAULT_TEST.map((item) => ({
			...item,
			isCompleted: false,
			isFault: false,
		}));
		setTest([...allQuestions]);
		getQuestion();
	}, []);

	useEffect(() => {
		showSentence(Number(taskId));
	}, [taskId]);

	useEffect(() => {
		getQuestion();
		if (Array.isArray(readyQuestion) && readyQuestion.length > 0) {
			console.log('USE EFFECT!!!!!!!: ', readyQuestion[0]);
		} else {
			console.log('USE EFFECT UNDEFINED!!!!!');
		}
	}, [answered.correctAnswers]);

	useEffect(() => {
		console.log('ANSWERED USE EFFECT: ', answered);
	}, [answered]);

	return (
		<div className={styles.lessonPage}>
			<div className={styles.prevQuestion}>
				<CircleButton type="default" size="large" onClick={() => swapQuestion(Number(taskId) - 1)}>
					<Icon icon="left" variant="dark" />
				</CircleButton>
			</div>
			<div className={styles.nextQuestion}>
				<CircleButton type="default" size="large" onClick={() => swapQuestion(Number(taskId) + 1)}>
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
					{data &&
						data.length > 1 &&
						!test[Number(taskId) - 1]?.isCompleted &&
						!test[Number(taskId) - 1]?.isFault &&
						data[id.word].map((s, i) => (
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
