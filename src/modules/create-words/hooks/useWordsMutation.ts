import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export const useWordsMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: (data: unknown) =>
			axios.post('http://localhost:3000/words', data, {
				withCredentials: true,
			}),
		onSuccess: () => {
			onSuccess?.();
		},
	});
};
