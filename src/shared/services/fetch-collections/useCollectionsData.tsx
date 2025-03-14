import { useEffect } from 'react';
import { DefaultCollectionType } from '@/shared/constants/collections/data';
import { getAllCollections } from './getCollectionsData';
import { CollectionsType } from '@/shared/constants';

export const useCollectionsData = (
	func: (collections: DefaultCollectionType[]) => void,
	id: CollectionsType,
) => {
	useEffect(() => {
		const collections = getAllCollections(id);

		if (collections) {
			func(collections);
		}

		return () => {
			func([]);
		};
	}, [id]);
};
