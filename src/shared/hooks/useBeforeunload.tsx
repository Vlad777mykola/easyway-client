import { useEffect } from 'react';

export const useBeforeunload = (handler: () => void) => {
	useEffect(() => {
		window.addEventListener('beforeunload', handler);
		return () => {
			window.removeEventListener('beforeunload', handler);
		};
	}, [handler]);
};
