import { ReactNode } from 'react';
import nlp from 'compromise';
import { MAX_VARIANTS } from '../constants';

type VerbList = {
	[key: string]: string;
};

export type Answer = {
	id: string;
	name: ReactNode;
	isCorrect: boolean;
};

type NounData = {
	word: string;
	score: number;
};

export type Variants = {
	[key: string]: string[];
};

export const showVerbs = async (word: string) => {
	const doc = nlp(word);
	const verbList = doc.verbs().conjugate()[0] as VerbList;
	console.log('VERB LIST: ', verbList);
	let answers = Object.keys(verbList).map((key) => verbList[key]);
	console.log('ANSWERS VERBS: ', word, ' ', answers);
	console.log('INCLUDES VERBS: ', word, ' ', answers.includes(word));
	if (!answers.includes(word)) {
		answers = [...answers, word];
	}

	return answers;
};

export const showNounsOrAdverbs = async (word: string, maxNumbersOfAnswers: number) => {
	const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
	const data = await response.json();
	const dataArray = data.map((item: NounData) => item.word);

	let result: string[] = [];
	const numbersOfAnswers =
		dataArray.length < maxNumbersOfAnswers ? dataArray.length + 1 : maxNumbersOfAnswers;
	for (let i = 0; i <= numbersOfAnswers - 1; i++) {
		if (i === numbersOfAnswers - 1) {
			result = [...result, word.toLocaleLowerCase()];
		} else if (dataArray[i] !== word.toLocaleLowerCase()) {
			result = [...result, dataArray[i]];
		}
	}

	return result;
};

export const showVariants = (variants: Variants, word: string) => {
	let answers: string[] = [];
	const correctWord = word !== 'I' ? word.toLocaleLowerCase() : word;
	for (let key in variants) {
		if (variants[key].includes(correctWord)) {
			answers = getGroup(shuffle([...variants[key]]), correctWord);
		}
	}

	return answers;
};

export const getGroup = (variants: string[], word: string) => {
	let result: string[] = [];
	console.log('GET GROUP WORD: ', word);
	for (let i = 0; i <= variants.length - 1; i++) {
		if (i === 0 && variants.length >= MAX_VARIANTS) {
			result = [...result, word];
		} else if (variants[i] !== word) {
			result = [...result, variants[i]];
		} else if (variants.length < MAX_VARIANTS && variants[i] === word) {
			result = [...result, variants[i]];
		}

		if (result.length >= MAX_VARIANTS) {
			break;
		}
	}

	if (result.length < MAX_VARIANTS && !result.includes(word)) {
		result = [...result, word];
	}

	return result;
};

export const shuffle = (array: string[]) => {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};
