import { FiltersRes } from '@/shared/api-hooks/useFilters';
import { FiltersKeys, FiltersMap } from './types';

export const getModifyFilters = (filters: FiltersRes) => {
	const map: FiltersMap = new Map();
	Object.entries(filters).forEach(([key, values]) => {
		const arr = values.map((value: string) => ({
			action: 'existing',
			value,
		}));
		map.set(key as FiltersKeys, arr);
	});

	return map;
};

export const extractValues = (key: FiltersKeys, data: FiltersMap) =>
	data
		.get(key)
		?.filter((i) => i.action !== 'deleted')
		.map((i) => i.value) || [];

export const hasChanges = (data: FiltersMap): boolean => {
	for (const [_, items] of data.entries()) {
		if (items.some((i) => i.action === 'created' || i.action === 'deleted')) {
			return true;
		}
	}
	return false;
};
