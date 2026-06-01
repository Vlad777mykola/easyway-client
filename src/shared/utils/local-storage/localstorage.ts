export const localstorage = {
	setItem: (key: string, value: unknown) => {
		try {
			const serializedValue = JSON.stringify(value);
			localStorage.setItem(key, serializedValue);
		} catch (error) {
			console.error('Error saving to localStorage', error);
		}
	},

	getItem: (key: string) => {
		try {
			const serializedValue = localStorage.getItem(key);
			return serializedValue ? JSON.parse(serializedValue) : null;
		} catch (error) {
			console.error('Error reading from localStorage', error);
			return null;
		}
	},

	removeItem: (key: string) => {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error('Error removing from localStorage', error);
		}
	},
};
