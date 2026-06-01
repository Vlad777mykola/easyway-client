import { useEffect, useState } from 'react';
import { fetchProgressData } from '../services/fetchProgressData';
import { calculateProgress } from '../services/calculateProgress';

type ProgressData = {
	total: number;
	exam: number;
	random: {
		resolved: number;
		progress: number;
		unTouch: number;
	};
	errorProgress: string[];
};

export const useMultipleProgress = (progressIds: string[]) => {
	const [data, setData] = useState<Record<string, ProgressData>>({});

	useEffect(() => {
		(async () => {
			try {
				const allProgress = await fetchProgressData();
				const result: Record<string, ProgressData> = {};
				for (const id of progressIds) {
					result[id] = await calculateProgress(allProgress, id);
				}
				setData(result);
			} catch (err) {
				console.error('Error fetching multiple progress: ', err);
			}
		})();
	}, [progressIds]);

	return data; // object like { id1: data1, id2: data2, ... }
};
