import { DEFAULT_COLLECTIONS } from './collections/data';
import { DICTIONARY_COLLECTIONS } from './dictionary/collections';

export { DEFAULT_COLLECTIONS_VOCABULARY, ALL_VOCABULARIES_BY_ID } from './vocabulary/collections';
export { DICTIONARY_COLLECTIONS } from './dictionary/collections';
export { DEFAULT_COLLECTIONS } from './collections/data';

export const ALL_COLLECTIONS = {
	collections: DEFAULT_COLLECTIONS,
	dictionaries: DICTIONARY_COLLECTIONS,
};

export type CollectionsType = keyof typeof ALL_COLLECTIONS;
