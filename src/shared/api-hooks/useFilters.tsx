import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

export type FiltersRes = {
	level: string[];
	tenses: string[];
	topic: string[];
	category: string[];
};

export const useFilters = (): UseQueryResult<FiltersRes, Error> => {
	return useQuery<FiltersRes, Error>({
		queryKey: ['filters'],
		queryFn: async () => {
			const response = await axios.get('http://localhost:3000/filters', {
				withCredentials: true,
			});
			return response.data;
		},
	});
};
