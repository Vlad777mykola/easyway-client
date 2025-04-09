import { useEffect, useState } from 'react';
import { getAllDataFromIndexedDB } from '@/utils/indexedDB';
import { getAllCollections } from '@/shared/services/fetch-collections/getCollectionsData';
import { DefaultCollectionType } from '@/shared/constants/collections/data';

import styles from './progress.module.css';
import { calculateCompletionPercentage, calculateTotalProgress } from '@/store/progress/service';
import { useDictionaryStore } from '@/store/dictionary';
import { getWordsByVocabulary } from '@/shared/services/fetch-words-vocabulary/getWordsByVocabulary';

const COMPLETED_TEST = 100;

export const Progress = () => {
	const [progressData, setProgressData] = useState([]);
	const vocabularies: DefaultCollectionType[] = getAllCollections('vocabularies');
	const exerciseListResponse = useDictionaryStore.use.exerciseListResponse();
	const setExerciseListResponse = useDictionaryStore.use.setExerciseListResponse();
	console.log('VOCABULARIES: ', vocabularies);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const data = await getAllDataFromIndexedDB();
			setProgressData(data);
		} catch (error) {
			console.error('Failed to fetch data:', error);
		}
	};

	const getProgressTheme = (examModeProgress, resolvedCount, radomModeProgress, count) => {
		const exam = calculateCompletionPercentage(examModeProgress?.successProgress.length, count);
		const resolved = calculateCompletionPercentage(resolvedCount, count);
		const progress = calculateCompletionPercentage(
			radomModeProgress?.progress.length - resolvedCount,
			count,
		);
		const unTouch = COMPLETED_TEST - progress - resolved;
		const total = calculateTotalProgress(exam, resolved);

		return {
			total,
			exam,
			random: {
				resolved,
				progress,
				unTouch,
			},
		};
	};

	console.log('PROGRESS DATA', progressData);

	return (
		<div>
			<p>Vocabularies</p>
			<div className={styles.progressThemes}>
				{vocabularies.map((item) => {
					const exercise = getWordsByVocabulary(item.id).length || [];
					const id = `${item.id}_vocabulary`;
					const { examModeProgress, randomModeProgress, takenTestCount } =
						progressData.find((p) => Object.keys(p.progressStore).includes(id))?.progressStore[
							id
						] || {};

					const resolvedCount =
						randomModeProgress?.resolved.filter((resolvedItem) => resolvedItem.isDone).length || 0;

					const { total, exam, random } = getProgressTheme(
						examModeProgress,
						resolvedCount,
						randomModeProgress,
						exercise,
					);

					console.log('TOTAL: ', total, exam, random);
					return (
						<div key={item.id} className={styles.progressContainer}>
							<p>{item.title}</p>
							<p>Total: {total}</p>
							<p>Exam: {exam}</p>
							<p>Resolved: {random.resolved}</p>
							<p>Progress: {random.progress}</p>
							<p>unTouch: {random.unTouch}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
