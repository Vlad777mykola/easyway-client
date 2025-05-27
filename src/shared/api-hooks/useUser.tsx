import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useUser = () => {
	return useQuery({
		queryKey: ['user'],
		queryFn: async () => {
			const response = await axios.get('http://localhost:3000/auth/me', {
				withCredentials: true, // important if using cookies
			});
			return response.data;
		},
		staleTime: 1000 * 60 * 5,
		retry: 1,
	});
};
