import { ReactNode, useEffect, useState } from 'react';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { CircleButton } from '@/ui-components/CircleButton';
import { DEFAULT_TEST } from '@/constants/data';
import styles from './showingTest.module.css';
import {
	ARTICLES,
	PRONOUN_CATEGORIES,
	CONJUCTIONS_CATEGORIES,
	PREPOSITION_CATEGORIES,
	MAX_VARIANTS,
} from './constants';
import { detectPartOfSpeech } from './functions/detectPartOfSpeech';
import { showNounsOrAdverbs, showVariants, showVerbs, getGroup } from './functions/showVariants';

type Test = {
	id: number;
	sentence: string;
	correctAnswer: string;
	isCompleted: boolean;
};

type Answer = {
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
	questions: Question[];
	isCompleted: boolean;
};

export const ShowingTest = () => {
	const [test, setTest] = useState<Test[]>([]); // 100%
	const [chooseAnswer, setChooseAnswer] = useState<string>(''); // 100%
	const [readyQuestion, setReadyQuestion] = useState<SentenceQuestion>(); // 100%

	const [isCorrectAnswer, setIsCorrectAnswer] = useState(0); // not sure

	const [sentence, setSentence] = useState({ ...DEFAULT_TEST[0] });

	const [correctAnswers, setCorrectAnswers] = useState<string[]>(sentence.correctAnswer.split(' '));
	const [answer, setAnswer] = useState(correctAnswers[0]);

	const [testId, setTestId] = useState<number>(1);
	const [wordId, setWordId] = useState(0);
	const [answeredQuestions, setAnsweredQuestions] = useState(0);

	/* console.log('SENTENCE: ', sentence);
	console.log('CORRECT ANSWERS: ', correctAnswers); */
	console.log('READY QUESTION: ', readyQuestion);
	/* console.log('IS CORRECT ANSWER: ', isCorrectAnswer); */

	const fetchDefinition = async (word: string) => {
		const { isAdjective, isArticle, isConjuction, isNoun, isPreposition, isVerb, isPronoun } =
			detectPartOfSpeech(word);

		let answers: Answer[] = [];

		if (isVerb) {
			answers = showVerbs(word);
		} else if ((isNoun && !isPronoun) || isAdjective) {
			answers = await showNounsOrAdverbs(word, MAX_VARIANTS);
		} else if (isPronoun) {
			answers = showVariants(PRONOUN_CATEGORIES, word);
		} else if (isPreposition) {
			answers = showVariants(PREPOSITION_CATEGORIES, word);
		} else if (isArticle) {
			answers = getGroup(ARTICLES, word.toLocaleLowerCase());
		} else if (isConjuction) {
			answers = showVariants(CONJUCTIONS_CATEGORIES, word);
		}

		return answers;
	};

	const getReadyQuestion = async (correctAnswers: string[]) => {
		let readyAnswers: Question[] = [];
		for (let i = 0; i < correctAnswers.length; i++) {
			const answers = await fetchDefinition(correctAnswers[i].replace(/[^a-zA-Z0-9]/g, ''));
			readyAnswers = [
				...readyAnswers,
				{ id: i + 1, correctAnswer: correctAnswers[i], answers: answers, isCompleted: false },
			];
		}
		setReadyQuestion({ id: testId, questions: [...readyAnswers], isCompleted: false });
	};

	const onClick = (answer: Answer) => {
		const answered = answeredQuestions + 1;
		let correct = 0;
		setAnsweredQuestions(answered);

		if (answer.isCorrect) {
			correct = isCorrectAnswer + 1;
			setIsCorrectAnswer(correct);
			// write correct
			/* setReadyQuestion({
				...(readyQuestion || { questions: [] }),
				questions: (readyQuestion?.questions || []).map((question) =>
					answer.id === question.id ? { ...question, isCompleted: true } : { ...question },
				),
			} as SentenceQuestion); */
			setReadyQuestion({
				...readyQuestion,
				questions: [
					...readyQuestion.questions.map((question) => {
						if (
							(question.correctAnswer
								.toLocaleLowerCase()
								.replace(/[^a-zA-Z0-9]/g, '') as string) ===
							(answer.name.toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, '') as string)
						) {
							console.log(
								'QUESTION CORRECT ANSWER: ',
								answer.name.toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, '') as string,
							);
							console.log(
								'EQUAL: ',
								(question.correctAnswer
									.toLocaleLowerCase()
									.replace(/[^a-zA-Z0-9]/g, '') as string) ===
									(answer.name.toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, '') as string),
							);
							const equal =
								(question.correctAnswer
									.toLocaleLowerCase()
									.replace(/[^a-zA-Z0-9]/g, '') as string) ===
								(answer.name.toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, '') as string);
							return {
								...question,
								isCompleted: equal,
							};
						} else {
							return { ...question };
						}
					}),
				],
			} as SentenceQuestion);
		}

		if (answered !== correctAnswers.length) {
			const word = wordId + 1;
			setWordId(word);
			setAnswer(correctAnswers[word].replace(/[^a-zA-Z0-9]/g, ''));
		}

		if (answered === correctAnswers.length) {
			console.log(
				'EVERY: ',
				readyQuestion?.questions.every((question) => question.isCompleted),
			);
			if (correct === correctAnswers.length) {
				setReadyQuestion({ ...readyQuestion, isCompleted: true } as SentenceQuestion);
			}

			if (correct !== correctAnswers.length) {
				setReadyQuestion({ ...readyQuestion, isCompleted: false } as SentenceQuestion);
			}
		}

		setChooseAnswer(chooseAnswer + ` ${answer.name}`);
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
				setAnswer(DEFAULT_TEST[i].correctAnswer.split(' ')[0]);
				fetchDefinition(DEFAULT_TEST[i].correctAnswer.split(' ')[0]);
				setWordId(0);
				setAnsweredQuestions(0);
				setIsCorrectAnswer(0);
			}
		}
	};

	useEffect(() => {
		fetchDefinition(answer);
		const allQuestions = DEFAULT_TEST.map((item) => ({ ...item, isCompleted: false }));
		setTest([...allQuestions]);
	}, []);

	useEffect(() => {
		showSentence(testId);
	}, [testId]);

	useEffect(() => {
		getReadyQuestion(correctAnswers);
	}, [correctAnswers]);

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
					{readyQuestion?.isCompleted && answeredQuestions === correctAnswers.length && (
						<div className={styles.correctAnswerContainer}>
							<p className={styles.answer}>{sentence.correctAnswer}</p>
							<p className={styles.answer}>You Complete Test.</p>
						</div>
					)}
					{!readyQuestion?.isCompleted && answeredQuestions === correctAnswers.length && (
						<div className={styles.uncorrectAnswerContainer}>
							<p className={styles.uncorrectAnswer}>{chooseAnswer}</p>
							<p className={styles.answer}>{sentence.correctAnswer}</p>
							<p className={styles.uncorrectAnswer}>Wrong Answer!</p>
						</div>
					)}
					{answeredQuestions !== correctAnswers.length && (
						<div className={styles.correctAnswerContainer}>
							<p className={styles.answer}>{chooseAnswer}</p>
						</div>
					)}
				</div>
				<div className={styles.words}>
					{!readyQuestion?.isCompleted &&
						readyQuestion?.questions[wordId]?.answers.map((answer) => {
							return (
								<div key={answer.id} className={styles.word}>
									<Button
										size="large"
										type="default"
										onClick={() => {
											onClick(answer);
										}}
									>
										{answer.name}
									</Button>
								</div>
							);
						})}
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
