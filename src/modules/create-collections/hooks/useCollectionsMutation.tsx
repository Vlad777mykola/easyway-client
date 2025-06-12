import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { FiltersRes } from '@/shared/api-hooks/useFilters';

export const useCollectionsMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: (data: FiltersRes) =>
			axios.post('http://localhost:3000/collections', data, {
				withCredentials: true,
			}),
		onSuccess: () => {
			onSuccess?.();
		},
	});
};
