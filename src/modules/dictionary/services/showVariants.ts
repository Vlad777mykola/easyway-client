import { ReactNode } from 'react';
import nlp from 'compromise';

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

export const getVerbs = (word: string): string[] => {
	const doc = nlp(word);
	const verbList = doc.verbs().conjugate()[0] as VerbList;

	return Object.keys(verbList).map((key) => verbList[key]);
};

export const getNounsOrAdverbs = async (word: string): Promise<string[]> => {
	const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
	const data = await response.json();

	return data.map((item: NounData) => item.word);
};

export const showVariants = (variants: Variants, word: string): string[] => {
	let answers: string[] = [];

	const correctWord = word !== 'I' ? word.toLocaleLowerCase() : word;

	for (let key in variants) {
		if (variants[key].includes(correctWord)) {
			answers = [...variants[key]];
		}
	}

	return answers;
};
