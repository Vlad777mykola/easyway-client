import { getAllDataFromIndexedDB } from '@/db/indexedDB';

export const fetchProgressData = async () => {
	try {
		const data = await getAllDataFromIndexedDB();
		return data;
	} catch (error) {
		console.error('Failed to fetch data:', error);
		return [];
	}
};
