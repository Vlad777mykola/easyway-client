import nlp from 'compromise';
import { ARTICLES, PRONOUN_CATEGORIES } from '../constants';

const detectPartOfSpeech = (word: string) => {
	const doc = nlp(word);
	const isVerb = doc.verbs().out('array').length > 0;
	const isNoun = doc.nouns().out('array').length > 0;
	const isPreposition = doc.prepositions().out('array').length > 0;
	const isArticle = ARTICLES.includes(word.toLocaleLowerCase());
	const isAdjective = doc.adjectives().out('array').length > 0;
	const isConjuction = doc.conjunctions().out('array').length > 0;
	let isPronoun = false;

	for (let key in PRONOUN_CATEGORIES) {
		if (PRONOUN_CATEGORIES[key].includes(word)) {
			isPronoun = true;
			break;
		}
	}

	return {
		isAdjective,
		isArticle,
		isConjuction,
		isNoun,
		isPreposition,
		isVerb,
		isPronoun,
	};
};

export { detectPartOfSpeech };
