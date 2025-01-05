import { ReactNode, useEffect, useState } from 'react';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { CircleButton } from '@/ui-components/CircleButton';
import { DEFAULT_TEST } from '@/constants/data';
import { fetchDefinition, getReadyQuestion } from './functions/fetchDefinition';
import styles from './showingTest.module.css';
import { useSelectData } from './hooks/useSelectData';

type Test = {
	id: number;
	sentence: string;
	correctAnswer: string;
	isCompleted: boolean;
};

export type Answer = {
	id: number;
	name: ReactNode;
	isCorrect: boolean;
};

type Question = {
	id: number;
	correctAnswer: string;
	answers: Answer[];
	isCompleted: boolean;
};

type SentenceQuestion = {
	id: number;
	questions: string[][];
	isCompleted: boolean;
};

export const ShowingTest = () => {
	const [test, setTest] = useState<Test[]>([]); // 100%
	const [chooseAnswer, setChooseAnswer] = useState<string>(''); // 100%
	const [readyQuestion, setReadyQuestion] = useState<SentenceQuestion>(); // 100%
	const [isFault, setIsFault] = useState(false);

	const [isCorrectAnswer, setIsCorrectAnswer] = useState(0); // not sure

	const [sentence, setSentence] = useState({ ...DEFAULT_TEST[0] });

	const [correctAnswers, setCorrectAnswers] = useState<string[]>(sentence.correctAnswer.split(' '));
	const [correctAnswer, setCorrectAnswer] = useState(correctAnswers[0]);

	const [testId, setTestId] = useState<number>(1);
	const [wordId, setWordId] = useState(0);
	const [answeredQuestions, setAnsweredQuestions] = useState(0);

	const data = useSelectData(correctAnswers);

	console.log('///ANSWER: ', correctAnswer);

	const onClick = (answer: string) => {
		const answered = answeredQuestions + 1;
		let correct = 0;
		setAnsweredQuestions(answered);

		if (correctAnswer === answer.toLocaleLowerCase()) {
			console.log('///INCLUDES: ', correctAnswers.includes(answer));
			correct = isCorrectAnswer + 1;
			console.log('///CORRECT: ', correct);
			setIsCorrectAnswer(correct);
		} else {
			console.log('///IS NOT INCLUDE: ', correctAnswers.includes(answer));
		}

		if (answered !== correctAnswers.length) {
			const word = wordId + 1;
			setWordId(word);
			setCorrectAnswer(correctAnswers[word].replace(/[^a-zA-Z0-9]/g, '').toLocaleLowerCase());
		}

		if (correct === correctAnswers.length) {
			setTest([
				...test.map((q) => {
					if (q.id === testId) {
						return { ...q, isCompleted: true };
					} else {
						return { ...q };
					}
				}),
			]);
		}

		if (answered === correctAnswers.length && correct !== correctAnswers.length) {
			setIsFault(true);
		}

		setChooseAnswer(chooseAnswer + ` ${answer}`);
	};

	const swapQuestion = (id: number) => {
		let questionId: number = 0;
		if (id <= test.length) {
			questionId = id;
			setTestId(id);
			showSentence(id);
		}

		if (id > test.length) {
			questionId = 1;
			setTestId(questionId);
			showSentence(questionId);
		}

		if (id < 1) {
			questionId = test.length;
			setTestId(questionId);
			showSentence(questionId);
		}
	};

	const showSentence = (id: number) => {
		setChooseAnswer('');
		for (let i = 0; i < DEFAULT_TEST.length; i++) {
			if (DEFAULT_TEST[i].id === id) {
				setSentence({ ...DEFAULT_TEST[i] });
				setCorrectAnswers(DEFAULT_TEST[i].correctAnswer.split(' '));
				setCorrectAnswer(
					DEFAULT_TEST[i].correctAnswer
						.split(' ')[0]
						.replace(/[^a-zA-Z0-9]/g, '')
						.toLocaleLowerCase(),
				);
				fetchDefinition(DEFAULT_TEST[i].correctAnswer.split(' ')[0]);
				setWordId(0);
				setAnsweredQuestions(0);
				setIsCorrectAnswer(0);
			}
		}
	};

	const getQuestion = async () => {
		const answers: string[][] = await getReadyQuestion(correctAnswers);
		console.log('ANSWERS IN GET QUESTION: ', answers);
		setReadyQuestion([...answers]);
	};

	useEffect(() => {
		fetchDefinition(correctAnswer);
		const allQuestions = DEFAULT_TEST.map((item) => ({ ...item, isCompleted: false }));
		setTest([...allQuestions]);
		getQuestion();
	}, []);

	useEffect(() => {
		showSentence(testId);
	}, [testId]);

	useEffect(() => {
		getQuestion();
		if (Array.isArray(readyQuestion) && readyQuestion.length > 0) {
			console.log('USE EFFECT!!!!!!!: ', readyQuestion[0]);
		} else {
			console.log('USE EFFECT UNDEFINED!!!!!');
		}
	}, [correctAnswers]);
	console.log('///////: ', data);
	return (
		<div className={styles.lessonPage}>
			<div className={styles.prevQuestion}>
				<CircleButton type="default" size="large" onClick={() => swapQuestion(testId - 1)}>
					<Icon icon="left" variant="dark" />
				</CircleButton>
			</div>
			<div className={styles.nextQuestion}>
				<CircleButton type="default" size="large" onClick={() => swapQuestion(testId + 1)}>
					<Icon icon="right" variant="dark" />
				</CircleButton>
			</div>
			<div className={styles.testContainer}>
				<h1 className={styles.topic}>Lesson Topic</h1>
				<div className={styles.sentenceContainer}>
					<p className={styles.sentence}>{sentence.sentence}</p>
					{test[testId - 1]?.isCompleted && (
						<div className={styles.correctAnswerContainer}>
							<p className={styles.answer}>{sentence.correctAnswer}</p>
							<p className={styles.answer}>You Complete Test.</p>
						</div>
					)}
					{isFault && !test[testId - 1]?.isCompleted && (
						<div className={styles.uncorrectAnswerContainer}>
							<p className={styles.uncorrectAnswer}>{chooseAnswer}</p>
							<p className={styles.answer}>{sentence.correctAnswer}</p>
							<p className={styles.uncorrectAnswer}>Wrong Answer!</p>
						</div>
					)}
					{!test[testId - 1]?.isCompleted && !isFault && (
						<div className={styles.correctAnswerContainer}>
							<p className={styles.answer}>{chooseAnswer}</p>
						</div>
					)}
				</div>
				<div className={styles.words}>
					{data &&
						data.length > 1 &&
						!test[testId - 1]?.isCompleted &&
						!isFault &&
						data[wordId].map((s, i) => (
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
							setTestId(item.id);
						}}
					>
						{item.id}
					</Button>
				))}
			</div>
		</div>
	);
};
