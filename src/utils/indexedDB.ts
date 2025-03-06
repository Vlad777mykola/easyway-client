import { openDB, IDBPDatabase } from 'idb';
import type { ProgressStoreState } from '@/store/progress';

const DB_NAME = 'easywayDB';
const PROGRESS_STORE = 'progressStore';

// Define the database structure (generic object store)
interface DBStructure {
	progressStore: ProgressStoreState;
}

async function getDB(): Promise<IDBPDatabase<DBStructure>> {
	return openDB<DBStructure>(DB_NAME, 3, {
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
}

export async function loadState<T>(key: string): Promise<T | undefined> {
	const db = await getDB();
	return db.get(PROGRESS_STORE, key);
}

export async function deleteState(key: string): Promise<void> {
	const db = await getDB();
	await db.delete(PROGRESS_STORE, key);
}

export async function clearAllState(): Promise<void> {
	const db = await getDB();
	await db.clear(PROGRESS_STORE);
}
