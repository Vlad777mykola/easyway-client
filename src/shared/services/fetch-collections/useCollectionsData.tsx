import { useEffect } from 'react';
import { DefaultCollectionType } from '@/shared/constants/collections/data';
// import { getAllCollections } from './getCollectionsData';
import { CollectionsType } from '@/shared/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCollectionsData = (
	func: (collections: DefaultCollectionType[]) => void,
	id: CollectionsType,
) => {
	const { data } = useQuery({
		queryKey: ['collections'],
		queryFn: async () => {
			const response = await axios.get('http://localhost:3000/collections', {
				withCredentials: true,
			});
			return response.data;
		},
	});

	useEffect(() => {
		// const collections = getAllCollections(id);
		console.log(data);

		if (data) {
			func(data);
		}

		return () => {
			func([]);
		};
	}, [id, data]);
};
