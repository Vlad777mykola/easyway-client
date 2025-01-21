import { ALL_COLLECTIONS_TASKS_BY_ID } from '@/shared/constants/data';

export const getCollectionById = (id: string) => {
	return ALL_COLLECTIONS_TASKS_BY_ID.get(id);
};
