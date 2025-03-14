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
	return openDB<DBStructure>(DB_NAME, 20, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(PROGRESS_STORE)) {
				db.createObjectStore(PROGRESS_STORE);
			}
		},
	});
}

export async function saveState<T>(key: string, value: T): Promise<void> {
	const db = await getDB();

	const timestamp = Date.now();

	const updatedEntry = {
		progressStore: {
			[key]: { ...value }, // Update the specific field
			timestamp, // Add/update timestamp
		},
	};

	// Ensure only one object is saved with the given key
	await db.put(PROGRESS_STORE, updatedEntry, key);
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

export async function updateLastTest(key: string, field: string, value: LatestTest): Promise<void> {
	if (Date.now() - value.timestamp > TIME_LIMIT) {
		await updateFieldIfNeeded(key, field, 0);
	}
}

export async function loadState(key: string): Promise<void> {
	const db = await getDB();

	const tx = db.transaction(PROGRESS_STORE, 'readonly');
	const store = tx.objectStore(PROGRESS_STORE);

	console.log('LOADED STATE: ', key);

	// Retrieve all data from the store
	const allData = await store.getAll();
	console.log('All IndexedDB Data:', allData);

	// Retrieve the entry using the key
	const entry = await db.get(PROGRESS_STORE, key);
	console.log('ENTRY: ', entry);
	return entry?.progressStore[key];
}

export async function deleteState(key: string): Promise<void> {
	const db = await getDB();
	const tx = db.transaction(PROGRESS_STORE, 'readwrite');
	const store = tx.objectStore(PROGRESS_STORE);
	console.log('STORE: ', store);
	const data = await store.get(key);
	if (!data) {
		console.warn(`No entry found for key: ${key}`);
		return;
	}

	console.log('Before deletion:', data);

	if (data.progressStore && key in data.progressStore) {
		delete data.progressStore[key];

		await store.put(data, key);
		console.log(`Field "${key}" deleted from progressStore for key "${key}".`);
	} else {
		console.warn(`Field "${key}" not found in progressStore.`);
	}
}

export async function clearAllState(): Promise<void> {
	const db = await getDB();
	await db.clear(PROGRESS_STORE);
}
