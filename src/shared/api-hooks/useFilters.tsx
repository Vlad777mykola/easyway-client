import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFilters = () => {
	return useQuery({
		queryKey: ['filters'],
		queryFn: async () => {
			const response = await axios.get('http://localhost:3000/auth/me', {
				withCredentials: true,
			});
			return response.data;
		},
	});
};
