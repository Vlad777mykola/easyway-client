import { openDB } from 'idb';

export function useIndexDB({
	dbName = 'progressDB',
	storeName = 'progressStore',
	version = 1,
}: {
	dbName?: string;
	storeName?: string;
	version?: number;
}) {
	const getDB = () =>
		openDB(dbName, version, {
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
