import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { FiltersRes } from '@/shared/api-hooks/useFilters';

export const useFiltersMutation = (onSuccess?: () => void) => {
	return useMutation({
		mutationFn: (data: FiltersRes) =>
			axios.patch('http://localhost:3000/filters', data, {
				withCredentials: true,
			}),
		onSuccess: () => {
			onSuccess?.();
		},
	});
};
