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

export const ShowingTest = () => {
	const [answers, setAnswers] = useState<Answer[]>([]);
	const [chooseAnswer, setChooseAnswer] = useState<string>('');

	const [isCorrect, setIsCorrect] = useState(false);
	const [isCorrectAnswer, setIsCorrectAnswer] = useState(0);

	const [test, setTest] = useState<Test[]>([]);
	const [sentence, setSentence] = useState({ ...DEFAULT_TEST[0] });
	const [correctAnswers, setCorrectAnswers] = useState<string[]>(sentence.correctAnswer.split(' '));
	const [answer, setAnswer] = useState(correctAnswers[0]);

	const [testId, setTestId] = useState<number>(1);
	const [wordId, setWordId] = useState(0);
	const [answeredQuestions, setAnsweredQuestions] = useState(0);

	const fetchDefinition = async (word: string) => {
		const { isAdjective, isArticle, isConjuction, isNoun, isPreposition, isVerb, isPronoun } =
			detectPartOfSpeech(word);

		if (isVerb) {
			const answers = showVerbs(word);
			setAnswers([...answers]);
		}

		if ((isNoun && !isPronoun) || isAdjective) {
			const result = await showNounsOrAdverbs(word, MAX_VARIANTS);
			setAnswers([...result]);
		}

		if (isPronoun) {
			const answers = showVariants(PRONOUN_CATEGORIES, word);
			setAnswers([...answers]);
		}

		if (isPreposition) {
			const answers = showVariants(PREPOSITION_CATEGORIES, word);
			setAnswers([...answers]);
		}

		if (isArticle) {
			const answers = getGroup(ARTICLES, word.toLocaleLowerCase());
			setAnswers([...answers]);
		}

		if (isConjuction) {
			const answers = showVariants(CONJUCTIONS_CATEGORIES, word);
			setAnswers([...answers]);
		}
	};

	const onClick = (answer: Answer) => {
		const answered = answeredQuestions + 1;
		let correct = 0;
		setAnsweredQuestions(answered);

		if (answer.isCorrect) {
			correct = isCorrectAnswer + 1;
			setIsCorrectAnswer(correct);
		}

		if (answered !== correctAnswers.length) {
			const word = wordId + 1;
			setWordId(word);
			setAnswer(correctAnswers[word].replace(/[^a-zA-Z0-9]/g, ''));
			fetchDefinition(correctAnswers[word].replace(/[^a-zA-Z0-9]/g, ''));
		}

		if (answered === correctAnswers.length) {
			setAnswers([]);
			if (correct === correctAnswers.length) {
				setIsCorrect(true);
			}

			if (correct !== correctAnswers.length) {
				setIsCorrect(false);
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
				setIsCorrect(false);
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
					{isCorrect && answeredQuestions === correctAnswers.length && (
						<div className={styles.correctAnswerContainer}>
							<p className={styles.answer}>{sentence.correctAnswer}</p>
							<p className={styles.answer}>You Complete Test.</p>
						</div>
					)}
					{!isCorrect && answeredQuestions === correctAnswers.length && (
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
					{answers.map((answer) => {
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
