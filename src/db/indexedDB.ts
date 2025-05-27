import { openDB, IDBPDatabase } from 'idb';
import type { ProgressStoreState } from '@/store/progress';
import { TakenTestCount } from '@/store/progress/useProgressStore';

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

export async function getAllDataFromIndexedDB(): Promise<DBStructure[]> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, 22);

		request.onerror = () => {
			reject('Error opening IndexedDB');
		};

		request.onsuccess = () => {
			const db = request.result;
			const transaction = db.transaction(PROGRESS_STORE, 'readonly');
			const objectStore = transaction.objectStore(PROGRESS_STORE);

			const getAllRequest = objectStore.getAll();

			getAllRequest.onsuccess = () => {
				resolve(getAllRequest.result as DBStructure[]);
			};

			getAllRequest.onerror = () => {
				reject('Error getting all data');
			};
		};
	});
}

async function getDB(): Promise<IDBPDatabase<DBStructure>> {
	return openDB<DBStructure>(DB_NAME, 22, {
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

// export async function saveDataToIdb<T>(key: string, value: T): Promise<void> {
// 	const db = await getDB();

// 	const timestamp = Date.now();

// 	const updatedEntry = {
// 		progressStore: {
// 			[key]: { ...value }, // Update the specific field
// 			timestamp, // Add/update timestamp
// 		},
// 	};

// 	// Ensure only one object is saved with the given key
// 	await db.put(PROGRESS_STORE, updatedEntry, key);
// }

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
		}
	} else {
		console.log(`No existing entry found for key "${key}"`);
	}
}

export async function updateLastTest(
	key: string,
	field: string,
	value: TakenTestCount,
): Promise<void> {
	if (Date.now() - value.timestamp > TIME_LIMIT) {
		await updateFieldIfNeeded(key, field, 0);
	}
}

export async function loadState(key: string): Promise<void> {
	const db = await getDB();

	// Retrieve the entry using the key
	const entry = await db.get(PROGRESS_STORE, key);
	return entry?.progressStore[key];
}

export async function deleteState(key: string): Promise<void> {
	const db = await getDB();
	const tx = db.transaction(PROGRESS_STORE, 'readwrite');
	const store = tx.objectStore(PROGRESS_STORE);
	const data = await store.get(key);
	if (!data) {
		console.warn(`No entry found for key: ${key}`);
		return;
	}

	if (data.progressStore && key in data.progressStore) {
		delete data.progressStore[key];

		await store.put(data, key);
	} else {
		console.warn(`Field "${key}" not found in progressStore.`);
	}
}

export async function clearAllState(): Promise<void> {
	const db = await getDB();
	await db.clear(PROGRESS_STORE);
}
