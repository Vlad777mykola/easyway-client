export const removeLocalStorage = (key: string) => {
	if (localStorage.getItem(key)) {
		localStorage.removeItem(key);
	}
};
