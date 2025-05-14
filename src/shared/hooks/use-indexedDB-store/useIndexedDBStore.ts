import { openDB } from 'idb';

export function useIndexedDB(storeName: string, version = 2) {
	const getDB = () =>
		openDB('progressStore', version, {
			upgrade(db) {
				if (!db.objectStoreNames.contains(storeName)) {
					db.createObjectStore(storeName);
				}
			},
		});

	return {
		async get(key: string) {
			const db = await getDB();
			return db.get(storeName, key);
		},
		async set(key: string, value: unknown) {
			const db = await getDB();
			console.log('//////', key, value);
			await db.put(storeName, value, key);
		},
		async remove(key: string) {
			const db = await getDB();
			await db.delete(storeName, key);
		},
		async clear() {
			const db = await getDB();
			await db.clear(storeName);
		},
	};
}
