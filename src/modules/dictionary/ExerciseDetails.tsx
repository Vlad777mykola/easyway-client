import { ReactNode, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContentContainer } from '@/ui-components/Content-Container';
import { List } from '@/shared/components/list/List';
import { useExerciseProgressStore, EXERCISE_MODE } from '@/store/exercise-progress';
import { FieldsDataType, SIDE_BAR_COMPONENT_TYPE, Sidebar } from '../../shared/components/sidebar';
import { EXERCISE_CONFIG_LABELS } from './constants';
import { Statistics } from './components/statistics/Statistics';
import { useExerciseListData } from './hooks/useExerciseListData';

import {
	EXERCISE_CONFIG,
	EXERCISE_FORMATE,
} from '@/store/exercise-progress/useExerciseProgressStore';

export const DictionaryExerciseDetails = (): ReactNode => {
	const navigate = useNavigate();
	const { dictionaryId = '' } = useParams();
	const exerciseListResponse = useExerciseProgressStore.use.exerciseListResponse();
	const getExerciseConfig = useExerciseProgressStore.use.getExerciseConfig();
	const setExerciseListResponse = useExerciseProgressStore.use.setExerciseListResponse();
	const getProgressFromLocalStore = useExerciseProgressStore.use.getProgressFromLocalStore();
	const setCollectionsExerciseConfig = useExerciseProgressStore.use.setCollectionsExerciseConfig();

	useExerciseListData(setExerciseListResponse, dictionaryId);

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
		{
			keyValue: EXERCISE_CONFIG.FORMATE,
			options: Object.values(EXERCISE_FORMATE),
			getDefaultValue: () => getExerciseConfig(EXERCISE_CONFIG.FORMATE),
			label: EXERCISE_CONFIG_LABELS.FORMAT,
			componentType: SIDE_BAR_COMPONENT_TYPE.SELECT,
		},
	] as const;

	useEffect(() => {
		getProgressFromLocalStore(dictionaryId || '');
	}, []);

	const onChange = (key: string, value: number[] | string | boolean | string[] | number) => {
		setCollectionsExerciseConfig(key, value);
	};

	const onClick = (id: string) => {
		navigate(`/dictionaries/${dictionaryId}/word/${id}`);
	};

	return (
		<ContentContainer>
			<ContentContainer.Header>
				<Statistics collectionsId={dictionaryId || ''} />
			</ContentContainer.Header>
			<ContentContainer.Sidebar>
				<Sidebar title="Exercise Stings" fieldsData={fieldsData} onChange={onChange} />
			</ContentContainer.Sidebar>
			<ContentContainer.Content>
				{exerciseListResponse && <List data={exerciseListResponse} onClick={onClick} />}
			</ContentContainer.Content>
		</ContentContainer>
	);
};
