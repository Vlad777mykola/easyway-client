import { detectPartOfSpeech } from './detectPartOfSpeech';
import { getGroup, showNounsOrAdverbs, showVariants, showVerbs } from './showVariants';
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
	let readyAnswers: VariantsType = {};
	for (let i = 0; i < correctAnswers.length; i++) {
		const answers: string[] = await fetchDefinition(correctAnswers[i].replace(/[^a-zA-Z0-9]/g, ''));
		readyAnswers[correctAnswers[i]] = answers;
	}

	return readyAnswers;
};
