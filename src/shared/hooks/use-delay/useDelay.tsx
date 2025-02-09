import { useCallback, useRef } from 'react';

export const useDelay = <T extends unknown[]>(callback: (...args: T) => void, delay: number) => {
	const timeoutRef = useRef<number | null>(null);

	const delayedFunction = useCallback(
		(...args: T) => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = window.setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay],
	);

	return delayedFunction;
};
