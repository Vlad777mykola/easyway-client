import { useEffect, useState } from 'react';
import { getAllCollections } from '@/shared/services/fetch-collections/getCollectionsData';
import { DefaultCollectionType } from '@/shared/constants/collections/data';
import { ProgressStoreState } from '@/store/progress';
import { AddInfo } from './components/add-info/AddInfo';
import { CommonInfo } from './components/total-info/CommonInfo';
import { fetchProgressData } from './services/fetchProgressData';
import { calculateProgress } from './services/calculateProgress';

import styles from './progress.module.css';
import { StandardProgressBar } from '@/ui-components/CustomProgress/StandartProgressBar';

export type ProgressStore = {
	progressStore: {
		[key: string]: ProgressStoreState | number;
	};
};

type Exercise = DefaultCollectionType & {
	showAddInfo: boolean;
};

type TotalProgress = {
	errorProgress: string[];
	exam: number;
	random: {
		progress: number;
		resolved: number;
		unTouch: number;
	};
	total: number;
	takenTestCount: number;
};

type TotalExercise = {
	total: number;
	exam: number;
	randomProgress: number;
	randomResolved: number;
	randomUntouch: number;
};

export const Progress = () => {
	const [progressData, setProgressData] = useState<ProgressStore[]>([]);
	const [exercise, setExercise] = useState<Exercise[]>([]);
	const [total, setTotal] = useState<TotalExercise>({
		total: 0,
		exam: 0,
		randomProgress: 0,
		randomResolved: 0,
		randomUntouch: 0,
	});

	useEffect(() => {
		(async () => {
			try {
				const fetchedProgressData = await fetchProgressData();
				setProgressData(fetchedProgressData);

				const vocabularies: Exercise[] = getAllCollections('vocabularies').map((item) => ({
					...item,
					showAddInfo: false,
				}));
				const filteredExercise = filterData(vocabularies);
				setExercise(filteredExercise);
			} catch (err) {
				console.log('Error fetching progress data: ', err);
			}
		})();
		const totalProgress = calculateTotalProgress();
		setTotal(totalProgress);
	}, [progressData.length]);

	const filterData = (exercise: Exercise[]) => {
		const filteredData = progressData.filter((item) => {
			const progressStore = item.progressStore;
			return Object.keys(progressStore).some((key) => key.includes('vocabulary'));
		});

		const filteredStore = exercise
			.filter((item) => {
				const id = `${item.id}_vocabulary`;
				return filteredData.some((p) => Object.keys(p.progressStore).includes(id));
			})
			.map((item) => ({
				...item,
			}));

		return filteredStore;
	};

	const handleShowAddInfo = (id: string) => {
		const updateExercise = exercise.map((item) => {
			if (item.id === id) {
				return { ...item, showAddInfo: !item.showAddInfo };
			}
			return { ...item, showAddInfo: false };
		});
		setExercise(updateExercise);
	};

	const calculateTotalProgress = () => {
		let total = 0;
		let exam = 0;
		let randomProgress = 0;
		let randomResolved = 0;
		let count = 0;
		const calculatedProgress: TotalProgress[] = [];

		const data = progressData.filter((p) =>
			`${Object.keys(p.progressStore)}`.includes('vocabulary'),
		);

		data.forEach((item) => {
			const key = Object.keys(item.progressStore)[0];
			const store = item.progressStore[key];

			if (typeof store === 'object' && store !== null && 'takenTestCount' in store) {
				const result = calculateProgress(data, key);
				calculatedProgress.push({
					...result,
					takenTestCount: store.takenTestCount.count as number,
				});
			}
		});

		calculatedProgress.forEach((item) => {
			total += item.total;
			exam += item.exam;
			randomProgress += item.random.progress;
			randomResolved += item.random.resolved;
			count++;
		});

		return {
			total: Math.ceil(total / count) || 0,
			exam: Math.ceil(exam / count) || 0,
			randomProgress: Math.ceil(randomProgress / count) || 0,
			randomResolved: Math.ceil(randomResolved / count) || 0,
			randomUntouch: Math.ceil(100 - randomProgress - randomResolved) || 0,
		};
	};

	return (
		<div>
			<p className={styles.progressTitle}>Vocabularies</p>
			<div className={styles.progressTotalContainer}>
				<p className={styles.progressTitle}>Total Progress</p>
				<div className={styles.totalProgress}>
					<p className={styles.themeTitle}>Total</p>
					<StandardProgressBar progress={total.total} size="m" fullwidth />
				</div>
				<div className={styles.totalProgress}>
					<p className={styles.themeTitle}>Exam</p>
					<StandardProgressBar progress={total.exam} size="xs" fullwidth />
				</div>
				<div className={styles.totalProgress}>
					<p className={styles.themeTitle}>Random in resolved</p>
					<StandardProgressBar progress={total.randomResolved} size="xs" fullwidth />
				</div>
				<div className={styles.totalProgress}>
					<p className={styles.themeTitle}>Random in progress</p>
					<StandardProgressBar progress={total.randomProgress} size="xs" fullwidth />
				</div>
				<div className={styles.totalProgress}>
					<p className={styles.themeTitle}>Random in untouch</p>
					<StandardProgressBar progress={total.randomUntouch} size="xs" fullwidth />
				</div>
			</div>
			<div className={styles.progressThemes}>
				{exercise.map((item) => {
					const progressId = `${item.id}_vocabulary`;
					const { takenTestCount } =
						(progressData.find((p) => Object.keys(p.progressStore).includes(progressId))
							?.progressStore[progressId] as ProgressStoreState) || {};

					const path = `vocabularies/${item.id}`;

					return (
						<div key={item.id} className={styles.progressContainer}>
							<p className={styles.themeTitle}>{item.title}</p>
							<CommonInfo takenTestCount={takenTestCount} progressId={progressId} />
							<AddInfo
								progressId={progressId}
								path={path}
								id={item.id}
								showInfo={item.showAddInfo}
								handleShowAddInfo={handleShowAddInfo}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};
