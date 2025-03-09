import { openDB, IDBPDatabase } from 'idb';
import type { ProgressStoreState } from '@/store/progress';
import { LatestTest } from '@/store/progress/useProgressStore';

const DB_NAME = 'easywayDB';
const PROGRESS_STORE = 'progressStore';
const TIME_LIMIT = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
///const TIME_LIMIT = 5 * 1000; // 5 seconds

// Define the database structure (generic object store)
type DBStructure = {
	progressStore: {
		data: ProgressStoreState;
		timestamp: number;
	};
};

async function getDB(): Promise<IDBPDatabase<DBStructure>> {
	return openDB<DBStructure>(DB_NAME, 19, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(PROGRESS_STORE)) {
				db.createObjectStore(PROGRESS_STORE);
			}
		},
	});
}

export async function saveState<T>(key: string, value: T): Promise<void> {
	const db = await getDB();
	const existingEntry = await db.get(PROGRESS_STORE, key);

	console.log('///// Existing entry:', existingEntry);

	const timestamp = Date.now();

	const updatedEntry = {
		progressStore: {
			[key]: { ...value }, // Update the specific field
			timestamp, // Add/update timestamp
		},
	};

	// Ensure only one object is saved with the given key
	await db.put(PROGRESS_STORE, updatedEntry, key);
	console.log('///// Saved entry:', updatedEntry);
}

export async function updateFieldIfNeeded<T>(key: string, field: string, value: T): Promise<void> {
	const db = await getDB();

	// Retrieve the existing entry from IndexedDB
	const existingEntry = await db.get(PROGRESS_STORE, key);

	if (existingEntry) {
		const { timestamp, data } = existingEntry.progressStore;

		if (Date.now() - timestamp >= TIME_LIMIT) {
			const updatedData = {
				...data,
				[field]: value,
			};

			const updatedEntry = {
				progressStore: {
					data: updatedData,
					timestamp: Date.now(),
				},
			};

			await db.put(PROGRESS_STORE, updatedEntry, key);
		} else {
			console.log('Less than 1 minute has passed, no update made');
		}
	} else {
		console.log(`No existing entry found for key "${key}"`);
	}
}

export async function updateLastTest(
	key: string,
	field: string,
	value: LatestTest[],
): Promise<void> {
	const updatedLastTest = value.filter((item) => Date.now() - item.timestamp <= TIME_LIMIT);
	await updateFieldIfNeeded(key, field, updatedLastTest);
}

export async function loadState(key: string): Promise<void> {
	const db = await getDB();

	// Retrieve the entry using the key
	const entry = await db.get(PROGRESS_STORE, key);

	console.log('///// Loaded entry:', entry);

	// If the entry exists, return the data field inside progressStore, otherwise return undefined
	console.log('///// RETURN: ', entry?.progressStore?.data);
	return entry?.progressStore?.data;
}

export async function deleteState(key: string): Promise<void> {
	const db = await getDB();
	await db.delete(PROGRESS_STORE, key);
}

export async function clearAllState(): Promise<void> {
	const db = await getDB();
	await db.clear(PROGRESS_STORE);
}
