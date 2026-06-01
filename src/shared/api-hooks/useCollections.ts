import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

export type CollectionsRes = {
	id: string;
	title: string;
	description: string;
	topic: string[];
	category: string[];
	level: string[];
	tenses: string[];
};

export const useCollections = (): UseQueryResult<CollectionsRes, Error> => {
	return useQuery<CollectionsRes, Error>({
		queryKey: ['collections'],
		queryFn: async () => {
			const response = await axios.get('http://localhost:3000/collections', {
				withCredentials: true,
			});
			return response.data;
		},
	});
};
