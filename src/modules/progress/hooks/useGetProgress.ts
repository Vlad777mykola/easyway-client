import { useEffect, useState } from 'react';
import { calculateProgress } from '../services/calculateProgress';
import { fetchProgressData } from '../services/fetchProgressData';
import { ProgressStore } from '../Progress';

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

export const useGetProgress = (progressId: string) => {
	const [data, setData] = useState<ProgressData>({
		total: 0,
		exam: 0,
		random: {
			resolved: 0,
			progress: 0,
			unTouch: 0,
		},
		errorProgress: [],
	});

	useEffect(() => {
		(async () => {
			try {
				const progress: ProgressStore[] = await fetchProgressData();
				const calculatedProgress = await calculateProgress(progress, progressId);
				setData(calculatedProgress);
			} catch (err) {
				console.log('Error fetching progress data: ', err);
			}
		})();
	}, [progressId]);

	return data;
};
