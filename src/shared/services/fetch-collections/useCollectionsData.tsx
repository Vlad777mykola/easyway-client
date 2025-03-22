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

		console.log('COLLECTIONS: ', collections);

		if (collections) {
			func(collections as DefaultCollectionType[]);
		}

		return () => {
			func([]);
		};
	}, [id]);
};
