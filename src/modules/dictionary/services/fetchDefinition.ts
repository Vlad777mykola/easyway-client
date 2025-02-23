import { detectPartOfSpeech } from './detectPartOfSpeech';
import { getNounsOrAdverbs, showVariants, getVerbs } from './showVariants';
import {
	ARTICLES,
	CONJUNCTIONS_CATEGORIES,
	MAX_VARIANTS,
	NEGATIONS,
	PREPOSITION_CATEGORIES,
	PRONOUN_CATEGORIES,
} from '../constants';

export type VariantsType = { [key: string]: string[] };

export const randomizeAddWord = (array: string[], word: string) => {
	const newArr = [...array];
	const isMoreThanMaxCountOfVariants = newArr.length > MAX_VARIANTS;
	const isWordAlreadyIncluded = array.includes(word);

	if (isMoreThanMaxCountOfVariants) {
		newArr.slice(0, MAX_VARIANTS);
	}

	if (!isWordAlreadyIncluded) {
		const randomNumber = Math.floor(Math.random() * (array.length - 0 + 1));
		newArr.splice(randomNumber, 0, word);
	}

	return newArr;
};

export const fetchDefinition = async (word: string) => {
	const {
		isAdjective,
		isArticle,
		isConjunction,
		isNoun,
		isPreposition,
		isVerb,
		isPronoun,
		isNegation,
	} = detectPartOfSpeech(word);

	let answers: string[] = [];

	if (isVerb) {
		answers = getVerbs(word);
	}
	if ((isNoun && !isPronoun) || isAdjective) {
		answers = await getNounsOrAdverbs(word);
	}
	if (isPronoun) {
		answers = showVariants(PRONOUN_CATEGORIES, word);
	}
	if (isPreposition) {
		answers = showVariants(PREPOSITION_CATEGORIES, word);
	}
	if (isArticle) {
		answers = ARTICLES;
	}
	if (isConjunction) {
		answers = showVariants(CONJUNCTIONS_CATEGORIES, word);
	}
	if (isNegation) {
		answers = NEGATIONS;
	}

	if (answers.length <= 1) {
		const additionalAnswers = await getNounsOrAdverbs(word);
		answers = [...answers, ...additionalAnswers];
	}

	return randomizeAddWord(answers, word);
};

export const getReadyQuestion = async (correctAnswers: string[]) => {
	const hourPattern = /(?:[01]?\d|2[0-3]):([0-5]?\d)?/;
	let readyAnswers: VariantsType = {};
	for (let i = 0; i < correctAnswers.length; i++) {
		const word = hourPattern.test(correctAnswers[i])
			? correctAnswers[i]
			: correctAnswers[i].replace(/[^a-zA-Z0-9]/g, '');
		const answers: string[] = await fetchDefinition(word);
		readyAnswers[correctAnswers[i]] = answers;
	}

	return readyAnswers;
};
