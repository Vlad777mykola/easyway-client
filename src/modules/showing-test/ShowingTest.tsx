import { ReactNode, useEffect, useState } from 'react';
import nlp from 'compromise';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { CircleButton } from '@/ui-components/CircleButton';
import styles from './showingTest.module.css';

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

type NounData = {
	word: string;
	score: number;
};

type VerbList = {
	[key: string]: string;
};

const startTest = [
	{
		id: 1,
		sentence: 'Ти покажеш?',
		correctAnswer: 'Will you show?',
	},
	{
		id: 2,
		sentence: 'Вона почала?',
		correctAnswer: 'Did she start?',
	},
	{
		id: 3,
		sentence: 'Я розумію.',
		correctAnswer: 'I understand.',
	},
	{
		id: 4,
		sentence: 'Кіт сів на килимок.',
		correctAnswer: 'The Cat sat on the mat.',
	},
	{
		id: 5,
		sentence: 'Гарний сад сповнений барвистих квітів.',
		correctAnswer: 'The beautiful garden is full of colorful flowers.',
	},
	{
		id: 6,
		sentence: 'Незважаючи на втому, вона продовжувала працювати.',
		correctAnswer: 'Although she was tired, she kept working.',
	},
];

const pronounCategories = {
	subject: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
	object: ['me', 'you', 'him', 'her', 'it', 'us', 'them'],
	indefinite: ['some', 'any', 'no', 'little', 'few', 'many', 'much'],
	interrogative: ['who', 'what', 'which', 'whose', 'whom'],
	relative: ['who', 'what', 'which', 'whose', 'whom'],
	possessive: ['my', 'your', 'his', 'her', 'its', 'our', 'their'],
	reflexive: ['myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'themselves'],
};

const prepositionCategories = {
	simple: [
		'about',
		'above',
		'across',
		'after',
		'against',
		'along',
		'among',
		'around',
		'at',
		'before',
		'behind',
		'below',
		'beneath',
		'beside',
		'between',
		'beyond',
		'by',
		'down',
		'during',
		'except',
		'for',
		'from',
		'in',
		'into',
		'near',
		'of',
		'off',
		'on',
		'out',
		'over',
		'past',
		'since',
		'through',
		'to',
		'toward',
		'under',
		'until',
		'up',
		'with',
		'within',
		'without',
	],
	compound: [
		'according to',
		'ahead of',
		'apart from',
		'as for',
		'as per',
		'as to',
		'because of',
		'by means of',
		'in accordance with',
		'in addition to',
		'in case of',
		'in front of',
		'in lieu of',
		'in place of',
		'in spite of',
		'instead of',
		'on account of',
		'on behalf of',
		'on top of',
		'out of',
		'prior to',
		'with regard to',
		'with respect to',
	],
	phrasal: [
		'along with',
		'away from',
		'close to',
		'due to',
		'except for',
		'far from',
		'next to',
		'owing to',
		'rather than',
		'thanks to',
	],
	place: ['on', 'in', 'under', 'between', 'next to'],
	direction: ['to', 'from', 'out of', 'into', 'onto', 'towards'],
	time: ['at', 'in', 'before', 'after', 'by', 'during'],
	reasons: ['because of', 'due to', 'for', 'to', 'in order to'],
};

const conjustionsCategories = {
	coordinating: ['for', 'and', 'nor', 'but', 'or', 'yet', 'so'],
	time: [
		'after',
		'as',
		'as soon as',
		'before',
		'once',
		'since',
		'till',
		'until',
		'when',
		'whenever',
		'while',
	],
	reason: ['because', 'as', 'since', 'so that', 'in order that'],
	condition: ['if', 'unless', 'even if', 'provided that'],
	contrast: ['although', 'though', 'even though', 'whereas', 'while'],
	comparison: ['as', 'than'],
	conjuctive: [
		'accordingly',
		'also',
		'besides',
		'consequently',
		'finally',
		'furthermore',
		'hence',
		'however',
		'indeed',
		'instead',
		'likewise',
		'moreover',
		'nevertheless',
		'nonetheless',
		'otherwise',
		'similarly',
		'still',
		'then',
		'therefore',
		'thus',
	],
};

const articles = ['a', 'an', 'the'];

export const ShowingTest = () => {
	const maxNumbersOfAnswers = 8;
	const [answers, setAnswers] = useState<Answer[]>([]);
	const [chooseAnswer, setChooseAnswer] = useState<string>('');

	const [isCorrect, setIsCorrect] = useState(false);
	const [isCorrectAnswer, setIsCorrectAnswer] = useState(0);

	const [test, setTest] = useState<Test[]>([]);
	const [sentence, setSentence] = useState({ ...startTest[0] });
	const [correctAnswers, setCorrectAnswers] = useState<string[]>(sentence.correctAnswer.split(' '));
	const [answer, setAnswer] = useState(correctAnswers[0]);

	const [testId, setTestId] = useState<number>(1);
	const [wordId, setWordId] = useState(0);
	const [answeredQuestions, setAnsweredQuestions] = useState(0);

	const fetchDefinition = async (word: string) => {
		const doc = nlp(word);
		const isVerb = doc.verbs().out('array').length > 0;
		const isPronouns = doc.pronouns().out('array').length > 0;
		const isNoun = doc.nouns().out('array').length > 0;
		const isPreposition = doc.prepositions().out('array').length > 0;
		const isArticle = articles.includes(word.toLocaleLowerCase());
		const isAdjective = doc.adjectives().out('array').length > 0;
		const isConjuction = doc.conjunctions().out('array').length > 0;

		if (isVerb) {
			const verbList = doc.verbs().conjugate()[0] as VerbList;
			const answers = Object.keys(verbList)
				.map((key) => verbList[key])
				.map((item, index) => {
					if (item.toLowerCase() === word.toLowerCase()) {
						return { id: index + 1, name: item, isCorrect: true };
					} else {
						return { id: index + 1, name: item, isCorrect: false };
					}
				});
			setAnswers(shuffle([...answers]));
		} else if (
			(isNoun &&
				!pronounCategories.object.includes(word) &&
				!pronounCategories.possessive.includes(word) &&
				!pronounCategories.reflexive.includes(word) &&
				!pronounCategories.subject.includes(word) &&
				!pronounCategories.relative.includes(word) &&
				!pronounCategories.interrogative.includes(word)) ||
			isAdjective
		) {
			const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
			const data = await response.json();
			const dataArray = data.map((item: NounData) => item.word);
			const result = makeMaxAllowedAnswers(dataArray, word);

			setAnswers(shuffle([...result]));
		} else if (isPronouns) {
			if (pronounCategories.object.includes(word)) {
				const answers = getGroup(pronounCategories.object, word);
				setAnswers(shuffle([...answers]));
			}

			if (pronounCategories.possessive.includes(word)) {
				const answers = getGroup(pronounCategories.possessive, word);
				setAnswers(shuffle([...answers]));
			}

			if (pronounCategories.reflexive.includes(word)) {
				const answers = getGroup(pronounCategories.reflexive, word);
				setAnswers(shuffle([...answers]));
			}

			if (pronounCategories.subject.includes(word)) {
				const answers = getGroup(pronounCategories.subject, word);
				setAnswers(shuffle([...answers]));
			}

			if (pronounCategories.relative.includes(word)) {
				const answers = getGroup(pronounCategories.relative, word);
				setAnswers(shuffle([...answers]));
			}

			if (pronounCategories.interrogative.includes(word)) {
				const answers = getGroup(pronounCategories.interrogative, word);
				setAnswers(shuffle([...answers]));
			}
		} else if (isPreposition) {
			if (prepositionCategories.direction.includes(word)) {
				const answers = makeMaxAllowedAnswers(prepositionCategories.direction, word);
				setAnswers(shuffle([...answers]));
			}

			if (prepositionCategories.place.includes(word)) {
				const answers = getGroup(prepositionCategories.place, word);
				setAnswers(shuffle([...answers]));
			}

			if (prepositionCategories.reasons.includes(word)) {
				const answers = makeMaxAllowedAnswers(prepositionCategories.reasons, word);
				setAnswers(shuffle([...answers]));
			}

			if (prepositionCategories.time.includes(word)) {
				const answers = makeMaxAllowedAnswers(prepositionCategories.time, word);
				setAnswers(shuffle([...answers]));
			}

			if (prepositionCategories.simple.includes(word)) {
				const result = makeMaxAllowedAnswers(prepositionCategories.simple, word);
				setAnswers(shuffle([...result]));
			}
		} else if (isArticle) {
			const answers = getGroup(articles, word);
			setAnswers(shuffle([...answers]));
		} else if (isConjuction) {
			if (conjustionsCategories.contrast) {
				const answers = getGroup(conjustionsCategories.contrast, word);
				setAnswers(shuffle([...answers]));
			} else if (conjustionsCategories.coordinating.includes(word)) {
				const answers = getGroup(conjustionsCategories.coordinating, word);
				setAnswers(shuffle([...answers]));
			} else if (conjustionsCategories.conjuctive.includes(word)) {
				const answers = getGroup(conjustionsCategories.conjuctive, word);
				setAnswers(shuffle([...answers]));
			} else if (conjustionsCategories.comparison) {
				const answers = getGroup(conjustionsCategories.comparison, word);
				setAnswers(shuffle([...answers]));
			} else if (conjustionsCategories.condition) {
				const answers = getGroup(conjustionsCategories.condition, word);
				setAnswers(shuffle([...answers]));
			} else if (conjustionsCategories.reason) {
				const answers = getGroup(conjustionsCategories.reason, word);
				setAnswers(shuffle([...answers]));
			} else if (conjustionsCategories.time) {
				const answers = getGroup(conjustionsCategories.time, word);
				setAnswers(shuffle([...answers]));
			}
		}
	};

	const shuffle = (array: Answer[]) => {
		const newArray = [...array];
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
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

	const getGroup = (variants: string[], word: string) => {
		const answers = variants.map((item, index) => {
			if (item.toLocaleLowerCase() === word.toLocaleLowerCase()) {
				return { id: index + 1, name: item, isCorrect: true };
			} else {
				return { id: index + 1, name: item, isCorrect: false };
			}
		});

		return answers;
	};

	const makeMaxAllowedAnswers = (variants: string[], correctAnswer: string) => {
		let result: Answer[] = [];
		for (let i = 0; i <= maxNumbersOfAnswers - 1; i++) {
			if (i === maxNumbersOfAnswers - 1) {
				result = [
					...result,
					{ id: i + 1, name: correctAnswer.toLocaleLowerCase(), isCorrect: true },
				];
			} else {
				result = [
					...result,
					{
						id: i + 1,
						name: variants[i],
						isCorrect: false,
					},
				];
			}
		}

		return result;
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
		for (let i = 0; i < startTest.length; i++) {
			if (startTest[i].id === id) {
				setSentence({ ...startTest[i] });
				setCorrectAnswers(startTest[i].correctAnswer.split(' '));
				setAnswer(startTest[i].correctAnswer.split(' ')[0]);
				fetchDefinition(startTest[i].correctAnswer.split(' ')[0]);
				setWordId(0);
				setAnsweredQuestions(0);
				setIsCorrect(false);
				setIsCorrectAnswer(0);
			}
		}
	};

	useEffect(() => {
		fetchDefinition(answer);
		const allQuestions = startTest.map((item) => ({ ...item, isCompleted: false }));
		setTest([...allQuestions]);
	}, []);

	useEffect(() => {
		showSentence(testId);
	}, [testId]);

	return (
		<div className={styles.lessonPage}>
			<div className={styles.prevQuestion}>
				<CircleButton type="primary" size="large" onClick={() => swapQuestion(testId - 1)}>
					<Icon icon="left" variant="default" />
				</CircleButton>
			</div>
			<div className={styles.nextQuestion}>
				<CircleButton type="primary" size="large" onClick={() => swapQuestion(testId + 1)}>
					<Icon icon="right" variant="default" />
				</CircleButton>
			</div>
			<h1 className={styles.topic}>Lesson Topic</h1>
			<div className={styles.sentenceContainer}>
				<p className={styles.sentence}>{sentence.sentence}</p>
				<div className={styles.answerContainer}>
					{answeredQuestions !== correctAnswers.length && (
						<div className={styles.correctAnswerContainer}>
							<p className={styles.answer}>{chooseAnswer}</p>
						</div>
					)}
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
				</div>
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
			<div className={styles.pagination}>
				{test.map((item) => (
					<Button
						key={item.id}
						size="small"
						color={item.isCompleted ? 'primary' : 'danger'}
						type="primary"
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
