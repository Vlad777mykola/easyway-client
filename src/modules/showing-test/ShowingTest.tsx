import { ReactNode, useEffect, useState } from 'react';
import { DEFAULT_TEST } from '@/constants/data';
import { fetchDefinition, getReadyQuestion } from './functions/fetchDefinition';
import { useSelectData } from './hooks/useSelectData';
import { useNavigate, useParams } from 'react-router-dom';
import { ShowingTestUI } from './ShowingTestUI';

export type Test = {
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

export type Id = {
	word: number;
};

export const ShowingTest = () => {
	const [test, setTest] = useState<Test[]>([]);

	const [id, setId] = useState<Id>({
		word: 0,
	});

	const [completeTest, setCompleteTest] = useState({
		question: { ...DEFAULT_TEST[0] },
		selectedAnswer: '',
	});

	const [answered, setAnswered] = useState<Answered>({
		isCorrectAnswer: 0,
		correctAnswers: completeTest.question.correctAnswer.split(' '),
		correctAnswer: completeTest.question.correctAnswer.split(' ')[0],
		answeredQuestions: 0,
	});

	console.log('COMPLETE TEST: ', completeTest);
	console.log('ANSWERED: ', answered);
	console.log('TEST: ', test);

	const { taskId } = useParams();

	const navigate = useNavigate();

	const data = useSelectData(answered.correctAnswers);

	console.log('DATA: ', data);

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

		setCompleteTest({
			...completeTest,
			selectedAnswer: `${completeTest.selectedAnswer} ${answer}`,
		});
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
		for (let i = 0; i < DEFAULT_TEST.length; i++) {
			if (DEFAULT_TEST[i].id === idSentence) {
				setCompleteTest({ ...completeTest, question: { ...DEFAULT_TEST[i] }, selectedAnswer: '' });
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

	useEffect(() => {
		fetchDefinition(answered.correctAnswer);
		const allQuestions = DEFAULT_TEST.map((item) => ({
			...item,
			isCompleted: false,
			isFault: false,
		}));
		setTest([...allQuestions]);
	}, []);

	useEffect(() => {
		showSentence(Number(taskId));
	}, [taskId]);

	useEffect(() => {
		if (Array.isArray(completeTest.answers) && completeTest.answers.length > 0) {
			console.log('USE EFFECT!!!!!!!: ', completeTest.answers[0]);
		} else {
			console.log('USE EFFECT UNDEFINED!!!!!');
		}
	}, [answered.correctAnswers]);

	useEffect(() => {
		console.log('ANSWERED USE EFFECT: ', answered);
	}, [answered]);

	return (
		<>
			<ShowingTestUI
				swapQuestion={swapQuestion}
				taskId={Number(taskId)}
				test={test}
				sentence={completeTest.question}
				chooseAnswer={completeTest.selectedAnswer}
				questions={data}
				id={id}
				onClick={onClick}
			/>
		</>
	);
};
