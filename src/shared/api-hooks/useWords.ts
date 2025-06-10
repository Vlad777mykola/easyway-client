import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useWords = (word: string) => {
	return useQuery({
		queryKey: ['words'],
		queryFn: async () => {
			const response = await axios.get(`http://localhost:3000/words/${word}`, {
				withCredentials: true,
			});
			return response.data;
		},
		enabled: !!word,
	});
};
