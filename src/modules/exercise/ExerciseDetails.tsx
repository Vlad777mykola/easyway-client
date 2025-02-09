import { ReactNode, useEffect, useMemo } from 'react';
import { Statistics } from './components/Statistics';
import { useParams } from 'react-router-dom';
import { Container } from '@/shared/components/container';
import { List } from '@/shared/components/list/List';
import { EXERCISE_CONFIG } from '@/store/exercise-progress/useExerciseProgressStore';
import { useExerciseProgressStore, EXERCISE_MODE } from '@/store/exercise-progress';
import { getCollectionById } from '../collections/services/getCollectionById';
import { FieldsDataType, SIDE_BAR_COMPONENT_TYPE, Sidebar } from '../../shared/components/sidebar';
import { EXERCISE_CONFIG_LABELS } from './constants';
import styles from './exerciseDetails.module.css';

export const ExerciseDetails = (): ReactNode => {
	const { collectionsId } = useParams();
	const setCollectionsExerciseConfig = useExerciseProgressStore(
		(store) => store.setCollectionsExerciseConfig,
	);
	const exersiceStore = useExerciseProgressStore((store) => store);
	const getExerciseConfig = useExerciseProgressStore((store) => store.getExerciseConfig);
	const setProgressFromLocalStore = useExerciseProgressStore(
		(store) => store.setProgressFromLocalStore,
	);
	const data = useMemo(() => getCollectionById(collectionsId || ''), [collectionsId]);

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
			options: [5, 10],
			getDefaultValue: () => getExerciseConfig(EXERCISE_CONFIG.TOTAL_CORRECT_RESPONSE),
			label: EXERCISE_CONFIG_LABELS.CORRECT_RESPONSE,
			componentType: SIDE_BAR_COMPONENT_TYPE.SELECT,
		},
	] as const;

	useEffect(() => {
		setProgressFromLocalStore(collectionsId || '');
	}, []);

	const onChange = (key: string, value: number[] | string | boolean | string[] | number) => {
		setCollectionsExerciseConfig(key, value);
	};

	return (
		<div className={styles.collectionsContainer}>
			<div className={styles.header}>
				<Container.Header>
					<Statistics
						exerciseListProgress={exersiceStore.exerciseListProgress}
						collectionsId={collectionsId || ''}
					/>
				</Container.Header>
			</div>
			<div className={styles.sidebar}>
				<Container.Nav>
					<Sidebar title="Collection options" fieldsData={fieldsData} onChange={onChange} />
				</Container.Nav>
			</div>
			<div className={styles.content}>
				<Container.Content>{data && <List data={data} />}</Container.Content>
			</div>
		</div>
	);
};
