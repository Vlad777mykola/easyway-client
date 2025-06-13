import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export const useCollectionsMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: (data: unknown) =>
			axios.post('http://localhost:3000/collections', data, {
				withCredentials: true,
			}),
		onSuccess: () => {
			onSuccess?.();
		},
	});
};
