import { detectPartOfSpeech } from './detectPartOfSpeech';
import { getGroup, showNounsOrAdverbs, showVariants, showVerbs } from './showVariants';
import {
	ARTICLES,
	CONJUCTIONS_CATEGORIES,
	MAX_VARIANTS,
	PREPOSITION_CATEGORIES,
	PRONOUN_CATEGORIES,
} from '../constants';
import { Answer } from '../ShowingTest';

type Question = {
	id: number;
	correctAnswer: string;
	answers: Answer[];
	isCompleted: boolean;
};

export const fetchDefinition = async (word: string) => {
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

export const getReadyQuestion = async (correctAnswers: string[]) => {
	let readyAnswers: string[][] = [];
	for (let i = 0; i < correctAnswers.length; i++) {
		const answers = await fetchDefinition(correctAnswers[i].replace(/[^a-zA-Z0-9]/g, ''));
		readyAnswers = [...readyAnswers, [...answers]];
	}

	return readyAnswers;
};
