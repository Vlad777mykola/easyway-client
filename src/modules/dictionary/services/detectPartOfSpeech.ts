import nlp from 'compromise';
import { ARTICLES, PRONOUN_CATEGORIES } from '../constants';

const detectPartOfSpeech = (word: string) => {
	const doc = nlp(word.toLocaleLowerCase());
	const isVerb = doc.verbs().out('array').length > 0;
	const isNoun = doc.nouns().out('array').length > 0;
	const isPreposition = doc.prepositions().out('array').length > 0;
	const isArticle = ARTICLES.includes(word.toLocaleLowerCase());
	const isAdjective = doc.adjectives().out('array').length > 0;
	const isConjunction = doc.conjunctions().out('array').length > 0;
	const isNegation = doc.match('#Negative').out('array');
	let isPronoun = false;

	for (let key in PRONOUN_CATEGORIES) {
		if (PRONOUN_CATEGORIES[key].includes(word != 'I' ? word.toLocaleLowerCase() : word)) {
			isPronoun = true;
			break;
		}
	}

	return {
		isAdjective,
		isArticle,
		isConjunction,
		isNoun,
		isPreposition,
		isVerb,
		isPronoun,
		isNegation,
	};
};

export { detectPartOfSpeech };
