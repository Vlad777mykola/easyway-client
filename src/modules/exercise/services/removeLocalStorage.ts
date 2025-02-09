import { localstorage } from '@/shared/utils/local-storage/localstorage';

export const removeLocalStorage = (key: string) => {
	if (localstorage.getItem(key)) {
		localstorage.removeItem(key);
	}
};
