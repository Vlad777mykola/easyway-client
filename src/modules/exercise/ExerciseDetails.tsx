import { ReactNode, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { List } from '@/shared/components/list/List';
import { EXERCISE_CONFIG } from '@/store/exercise-progress/useExerciseProgressStore';
import { useExerciseProgressStore, EXERCISE_MODE } from '@/store/exercise-progress';
import { getCollectionById } from '../collections/services/getCollectionById';
import { FieldsDataType, SIDE_BAR_COMPONENT_TYPE, Sidebar } from '../../shared/components/sidebar';
import { EXERCISE_CONFIG_LABELS } from './constants';
import styles from './exerciseDetails.module.css';
import { Progress } from '@/ui-components/Progress';
import { Wrapper } from '@/ui-components/Wrapper';

const WRONG_CORRECT = {
	wrong: 30,
	correct: 40,
};
const INPROGRESS_RESOLVED = {
	resolved: 30,
	inProgress: 40,
};

export const ExerciseDetails = (): ReactNode => {
	const { collectionsId } = useParams();
	const setCollectionsExerciseConfig = useExerciseProgressStore(
		(store) => store.setCollectionsExerciseConfig,
	);
	const exersiceStore = useExerciseProgressStore((store) => store);
	const getExerciseConfig = useExerciseProgressStore((store) => store.getExerciseConfig);
	const data = useMemo(() => getCollectionById(collectionsId || ''), [collectionsId]);

	console.log('exersiceStore', exersiceStore);

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

	const onChange = (key: string, value: number[] | string | boolean | string[] | number) => {
		setCollectionsExerciseConfig(key, value);
	};

	return (
		<div className={styles.collectionsContainer}>
			<Wrapper>
				<div className={styles.progress}>
					<h1 className={styles.collectionTitle}>Collection Progress</h1>
					<div className={styles.statistics}>
						<div className={styles.modeContainer}>
							<h2 className={styles.modeTitle}>Random Mode</h2>
							<Progress
								success={{ percent: WRONG_CORRECT.correct }}
								type="circle"
								percent={WRONG_CORRECT.correct + WRONG_CORRECT.wrong}
								strokeColor={'rgb(211, 47, 47)'}
								format={() => `${WRONG_CORRECT.correct}%`}
							/>
						</div>
						<div className={styles.modeContainer}>
							<h2 className={styles.modeTitle}>Exam Mode</h2>
							<Progress
								type="circle"
								success={{ percent: INPROGRESS_RESOLVED.resolved }}
								percent={INPROGRESS_RESOLVED.resolved + INPROGRESS_RESOLVED.inProgress}
								format={() => `${INPROGRESS_RESOLVED.resolved}%`}
							/>
						</div>
					</div>
				</div>
			</Wrapper>
			<div className={styles.contentCollection}>
				<div className={styles.sidebarContainer}>
					<Sidebar title="Collection options" fieldsData={fieldsData} onChange={onChange} />
				</div>
				<div className={styles.listContainer}>{data && <List data={data} />}</div>
			</div>
		</div>
	);
};
