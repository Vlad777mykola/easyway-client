import { ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { List } from '@/shared/components/list/List';
import { EXERCISE_CONFIG } from '@/store/exercise-progress/useExerciseProgressStore';
import { useExerciseProgressStore, EXERCISE_MODE } from '@/store/exercise-progress';
import { FieldsDataType, SIDE_BAR_COMPONENT_TYPE, Sidebar } from '../../shared/components/sidebar';
import { EXERCISE_CONFIG_LABELS } from './constants';
import styles from './exerciseDetails.module.css';
import { Statistics } from './components/Statistics';
import { useExerciseListData } from './hooks/useExerciseListData';

export const ExerciseDetails = (): ReactNode => {
	const { collectionsId = '' } = useParams();
	const exerciseListResponse = useExerciseProgressStore.use.exerciseListResponse();
	const getExerciseConfig = useExerciseProgressStore.use.getExerciseConfig();
	const setExerciseListResponse = useExerciseProgressStore.use.setExerciseListResponse();
	const getProgressFromLocalStore = useExerciseProgressStore.use.getProgressFromLocalStore();
	const setCollectionsExerciseConfig = useExerciseProgressStore.use.setCollectionsExerciseConfig();

	useExerciseListData(setExerciseListResponse, collectionsId);

	const fieldsData: FieldsDataType[] = [
		{
			keyValue: EXERCISE_CONFIG.MODE,
			options: Object.values(EXERCISE_MODE),
			getDefaultValue: () => getExerciseConfig(EXERCISE_CONFIG.MODE),
			label: EXERCISE_CONFIG_LABELS.MODE,
			componentType: SIDE_BAR_COMPONENT_TYPE.SELECT,
		},
		{
			keyValue: EXERCISE_CONFIG.TOTAL_CORRECT_RESPONSE,
			options: [5, 10, 15],
			getDefaultValue: () => getExerciseConfig(EXERCISE_CONFIG.TOTAL_CORRECT_RESPONSE),
			label: EXERCISE_CONFIG_LABELS.CORRECT_RESPONSE,
			componentType: SIDE_BAR_COMPONENT_TYPE.SELECT,
		},
	] as const;

	useEffect(() => {
		getProgressFromLocalStore(collectionsId || '');
	}, []);

	const onChange = (key: string, value: number[] | string | boolean | string[] | number) => {
		setCollectionsExerciseConfig(key, value);
	};

	console.log(exerciseListResponse);

	return (
		<div className={styles.collectionsContainer}>
			<Statistics collectionsId={collectionsId || ''} />
			<div className={styles.contentCollection}>
				<div className={styles.sidebarContainer}>
					<Sidebar title="Collection options" fieldsData={fieldsData} onChange={onChange} />
				</div>
				<div className={styles.listContainer}>
					{exerciseListResponse && <List data={exerciseListResponse} />}
				</div>
			</div>
		</div>
	);
};
