export const debounce = <T extends unknown[]>(callback: (...args: T) => void, timeout: number) => {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	return (...args: T) => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			callback(...args);
		}, timeout);
	};
};
