import { detectPartOfSpeech } from './detectPartOfSpeech';
import { getGroup, showNounsOrAdverbs, showVariants, showVerbs } from '../services/showVariants';
import {
	ARTICLES,
	CONJUCTIONS_CATEGORIES,
	MAX_VARIANTS,
	NEGATIONS,
	PREPOSITION_CATEGORIES,
	PRONOUN_CATEGORIES,
} from '../constants';

export type VariantsType = { [key: string]: string[] };

export const fetchDefinition = async (word: string) => {
	const {
		isAdjective,
		isArticle,
		isConjuction,
		isNoun,
		isPreposition,
		isVerb,
		isPronoun,
		isNegation,
	} = detectPartOfSpeech(word);

	let answers: string[] = [];

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
	} else if (isNegation) {
		answers = getGroup(NEGATIONS, word.toLocaleLowerCase());
	}

	return answers.length != 0 ? answers : await showNounsOrAdverbs(word, MAX_VARIANTS);
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
