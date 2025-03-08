import { openDB, IDBPDatabase } from 'idb';
import type { ProgressStoreState } from '@/store/progress';

const DB_NAME = 'easywayDB';
const PROGRESS_STORE = 'progressStore';

// Define the database structure (generic object store)
type DBStructure = {
	progressStore: ProgressStoreState;
};

async function getDB(): Promise<IDBPDatabase<DBStructure>> {
	return openDB<DBStructure>(DB_NAME, 14, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(PROGRESS_STORE)) {
				db.createObjectStore(PROGRESS_STORE);
			}
		},
	});
}

export async function saveState<T>(key: string, value: T): Promise<void> {
	const db = await getDB();
	await db.put(PROGRESS_STORE, value, key);
	console.log('////SAVE TO INDEXED DB WORKS indexedDB: ', await db.get(PROGRESS_STORE, key));
}

export async function loadState<T>(key: string): Promise<T | undefined> {
	try {
		const db = await getDB();
		console.log(
			'//USE INDEXED DB WORKS indexedDB',
			await db.getAllKeys(PROGRESS_STORE).then(console.log),
		);
		return db.get(PROGRESS_STORE, key);
	} catch (error) {
		console.error(error);
	}
}

export async function deleteState(key: string): Promise<void> {
	console.log('DELETE FROM INDEXED DB WORKS indexedDB');
	const db = await getDB();
	await db.delete(PROGRESS_STORE, key);
}

export async function clearAllState(): Promise<void> {
	console.log('CLEAR ALL FROM INDEXED DB WORKS indexedDB');
	const db = await getDB();
	await db.clear(PROGRESS_STORE);
}
