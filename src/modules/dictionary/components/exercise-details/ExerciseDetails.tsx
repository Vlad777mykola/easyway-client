import { ReactNode, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContentContainer } from '@/ui-components/Content-Container';
import { List } from '@/shared/components/list';
import { FieldsDataType, SIDE_BAR_COMPONENT_TYPE, Sidebar } from '@/shared/components/sidebar';
import { EXERCISE_CONFIG_LABELS } from '../../constants';
import { useExerciseListData } from '../../hooks/useExerciseListData';
import {
	useDictionaryStore,
	EXERCISE_MODE,
	EXERCISE_CONFIG,
	EXERCISE_FORMATE,
} from '@/store/dictionary';
import { Statistics } from '@/shared/components/statistics/Statistics';

export const DictionaryExerciseDetails = (): ReactNode => {
	const navigate = useNavigate();
	const { dictionaryId = '' } = useParams();
	const ID_DICTIONARY_EXERCISE = `${dictionaryId}_dictionary`;
	const exerciseListResponse = useDictionaryStore.use.exerciseListResponse();
	const getExerciseConfig = useDictionaryStore.use.getExerciseConfig();
	const setExerciseListResponse = useDictionaryStore.use.setExerciseListResponse();
	const getProgressFromLocalStore = useDictionaryStore.use.getProgressFromLocalStore();
	const setCollectionsExerciseConfig = useDictionaryStore.use.setCollectionsExerciseConfig();

	useExerciseListData(setExerciseListResponse, dictionaryId);

	const fieldsData: FieldsDataType[] = [
		{
			keyValue: EXERCISE_CONFIG.MODE,
			options: Object.entries(EXERCISE_MODE).map((v) => {
				return { value: v[1], label: v[0] };
			}),
			getDefaultValue: () => getExerciseConfig(EXERCISE_CONFIG.MODE),
			label: EXERCISE_CONFIG_LABELS.MODE,
			componentType: SIDE_BAR_COMPONENT_TYPE.SELECT,
		},
		{
			keyValue: EXERCISE_CONFIG.TOTAL_CORRECT_RESPONSE,
			options: [{ value: 5 }, { value: 10 }, { value: 15 }],
			getDefaultValue: () => getExerciseConfig(EXERCISE_CONFIG.TOTAL_CORRECT_RESPONSE),
			label: EXERCISE_CONFIG_LABELS.CORRECT_RESPONSE,
			componentType: SIDE_BAR_COMPONENT_TYPE.SELECT,
		},
		{
			keyValue: EXERCISE_CONFIG.FORMATE,
			options: Object.entries(EXERCISE_FORMATE).map((v) => {
				return { value: v[1], label: v[0] };
			}),
			getDefaultValue: () => getExerciseConfig(EXERCISE_CONFIG.FORMATE),
			label: EXERCISE_CONFIG_LABELS.FORMAT,
			componentType: SIDE_BAR_COMPONENT_TYPE.SELECT,
		},
		{
			keyValue: EXERCISE_CONFIG.AUTO_PLAY,
			getDefaultValue: () => getExerciseConfig(EXERCISE_CONFIG.AUTO_PLAY),
			label: EXERCISE_CONFIG_LABELS.AUTO_PLAY,
			componentType: SIDE_BAR_COMPONENT_TYPE.CHECKBOX,
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
				<Statistics countWords={exerciseListResponse.length} exercisesId={ID_DICTIONARY_EXERCISE} />
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
