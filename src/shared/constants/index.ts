import { DEFAULT_COLLECTIONS } from './collections/data';
import { DICTIONARY_COLLECTIONS } from './dictionary/collections';
import { DEFAULT_COLLECTIONS_VOCABULARY } from './vocabulary/collections';

export { DEFAULT_COLLECTIONS_VOCABULARY, ALL_VOCABULARIES_BY_ID } from './vocabulary/collections';
export { DICTIONARY_COLLECTIONS } from './dictionary/collections';
export { DEFAULT_COLLECTIONS } from './collections/data';

export const ALL_COLLECTIONS = {
	exercises: DEFAULT_COLLECTIONS,
	dictionaries: DICTIONARY_COLLECTIONS,
	vocabularies: DEFAULT_COLLECTIONS_VOCABULARY,
};

export type CollectionsType = keyof typeof ALL_COLLECTIONS;
