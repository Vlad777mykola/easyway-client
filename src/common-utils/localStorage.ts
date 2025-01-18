export const setItem = (key: string, value: string) => {
	try {
		const serializedValue = JSON.stringify(value);
		localStorage.setItem(key, serializedValue);
	} catch (error) {
		console.error('Error saving to localStorage', error);
	}
};

export const getItem = (key: string) => {
	try {
		const serializedValue = localStorage.getItem(key);
		return serializedValue ? JSON.parse(serializedValue) : null;
	} catch (error) {
		console.error('Error reading from localStorage', error);
		return null;
	}
};

export const removeItem = (key: string) => {
	try {
		localStorage.removeItem(key);
	} catch (error) {
		console.error('Error removing from localStorage', error);
	}
};

export const clear = () => {
	try {
		localStorage.clear();
	} catch (error) {
		console.error('Error clearing localStorage', error);
	}
};
