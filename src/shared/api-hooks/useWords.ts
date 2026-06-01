import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type WordsType = {
	id: string;
	name: string;
	transcription: string;
	translate: string;
	type: string;
	useCase: string;
	variants: string[];
};

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
