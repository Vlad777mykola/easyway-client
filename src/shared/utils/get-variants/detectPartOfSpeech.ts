import nlp from 'compromise';
import { Variants } from './showVariants';

export const PRONOUN_CATEGORIES: Variants = {
	subject: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
	object: ['me', 'you', 'him', 'her', 'it', 'us', 'them'],
	indefinite: ['some', 'any', 'no', 'little', 'few', 'many', 'much'],
	interrogative: ['who', 'what', 'which', 'whose', 'whom'],
	relative: ['who', 'what', 'which', 'whose', 'whom'],
	possessive: ['my', 'your', 'his', 'her', 'its', 'our', 'their'],
	reflexive: ['myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'themselves'],
};

export const ARTICLES: string[] = ['a', 'an', 'the'];

export const NEGATIONS: string[] = ['not', 'never', 'without', 'nor'];

const detectPartOfSpeech = (word: string) => {
	const doc = nlp(word.toLocaleLowerCase());
	const isVerb = doc.verbs().out('array').length > 0;
	const isNoun = doc.nouns().out('array').length > 0;
	const isPreposition = doc.prepositions().out('array').length > 0;
	const isArticle = ARTICLES.includes(word.toLocaleLowerCase());
	const isAdjective = doc.adjectives().out('array').length > 0;
	const isConjunction = doc.conjunctions().out('array').length > 0;
	const isNegation = doc.match('#Negative').out('array').length > 0;
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
