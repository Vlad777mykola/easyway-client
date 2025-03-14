import { ALL_COLLECTIONS, CollectionsType } from '@/shared/constants';

export const getAllCollections = (id: CollectionsType) => {
	return ALL_COLLECTIONS[id];
};
