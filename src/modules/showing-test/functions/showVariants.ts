import { ReactNode } from 'react';
import nlp from 'compromise';
import { MAX_VARIANTS } from '../constants';

type VerbList = {
	[key: string]: string;
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

export type Variants = {
	[key: string]: string[];
};

export const showVerbs = (word: string) => {
	const doc = nlp(word);
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
	return answers;
};

export const showNounsOrAdverbs = async (word: string, maxNumbersOfAnswers: number) => {
	const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
	const data = await response.json();
	const dataArray = data.map((item: NounData) => item.word);

	let result: Answer[] = [];
	for (let i = 0; i <= maxNumbersOfAnswers - 1; i++) {
		if (i === maxNumbersOfAnswers - 1) {
			result = [...result, { id: i + 1, name: word.toLocaleLowerCase(), isCorrect: true }];
		} else {
			result = [
				...result,
				{
					id: i + 1,
					name: dataArray[i],
					isCorrect: false,
				},
			];
		}
	}

	return result;
};

export const showVariants = (variants: Variants, word: string) => {
	let answers: Answer[] = [];
	const correctWord = word !== 'I' ? word.toLocaleLowerCase() : word;
	for (let key in variants) {
		if (variants[key].includes(correctWord)) {
			answers = getGroup(shuffle([...variants[key]]), correctWord);
		}
	}

	return answers;
};

export const getGroup = (variants: string[], word: string) => {
	let result: Answer[] = [];
	for (let i = 0; i <= variants.length - 1; i++) {
		if (i === 0 && variants.length >= MAX_VARIANTS) {
			result = [...result, { id: i + 1, name: word, isCorrect: true }];
		} else if (variants[i] !== word) {
			result = [...result, { id: i + 1, name: variants[i], isCorrect: false }];
		} else if (variants.length < MAX_VARIANTS && variants[i] === word) {
			result = [...result, { id: i + 1, name: variants[i], isCorrect: true }];
		}

		if (result.length >= MAX_VARIANTS) {
			break;
		}
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
