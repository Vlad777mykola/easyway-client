import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { List } from '@/shared/components/list';
import { useNavigate } from '@/shared/hooks/use-navigate';
import { useQueryParam } from '@/shared/hooks/use-query-params';
import { ContentContainer } from '@/ui-components/Content-Container';
import { Statistics } from '@/shared/components/statistics/Statistics';
import { FieldsDataType, SIDE_BAR_COMPONENT_TYPE, Sidebar } from '@/shared/components/sidebar';
import {
	useDictionaryStore,
	EXERCISE_MODE,
	EXERCISE_CONFIG,
	EXERCISE_FORMATE,
} from '@/store/dictionary';

import { formatNavigate } from '../../utils';
import { EXERCISE_CONFIG_LABELS } from '../../constants';
import { useExerciseListData } from '../../hooks/useExerciseListData';
import { useConfigStings } from '../../hooks/useConfigParamWithDefaultData';

export const DictionaryExerciseDetails = (): ReactNode => {
	const { navWithQueryParams } = useNavigate();
	const { dictionaryId = '' } = useParams();
	const { addParam, addAllParams } = useQueryParam();
	const { getMode, getTotalCorrectResponse, getFormate, getAutoPlay } = useConfigStings();
	const ID_DICTIONARY_EXERCISE = `${dictionaryId}_dictionary`;

	const collectionId = useDictionaryStore.use.commonData().collectionId;
	const exerciseListResponse = useDictionaryStore.use.exerciseListResponse();
	const setExerciseListResponse = useDictionaryStore.use.setExerciseListResponse();

	useExerciseListData(setExerciseListResponse, dictionaryId, dictionaryId === collectionId);

	const fieldsData: FieldsDataType[] = [
		{
			keyValue: EXERCISE_CONFIG.MODE,
			options: Object.entries(EXERCISE_MODE).map((v) => {
				return { value: v[1], label: v[0] };
			}),
			getDefaultValue: () => getMode() as string,
			label: EXERCISE_CONFIG_LABELS.MODE,
			componentType: SIDE_BAR_COMPONENT_TYPE.SELECT,
		},
		{
			keyValue: EXERCISE_CONFIG.TOTAL_CORRECT_RESPONSE,
			options: [{ value: 5 }, { value: 10 }, { value: 15 }],
			getDefaultValue: () => getTotalCorrectResponse() as number,
			label: EXERCISE_CONFIG_LABELS.CORRECT_RESPONSE,
			componentType: SIDE_BAR_COMPONENT_TYPE.SELECT,
		},
		{
			keyValue: EXERCISE_CONFIG.FORMATE,
			options: Object.entries(EXERCISE_FORMATE).map((v) => {
				return { value: v[1], label: v[0] };
			}),
			getDefaultValue: () => getFormate() as string,
			label: EXERCISE_CONFIG_LABELS.FORMAT,
			componentType: SIDE_BAR_COMPONENT_TYPE.SELECT,
		},
		{
			keyValue: EXERCISE_CONFIG.AUTO_PLAY,
			getDefaultValue: () => getAutoPlay() as boolean,
			label: EXERCISE_CONFIG_LABELS.AUTO_PLAY,
			componentType: SIDE_BAR_COMPONENT_TYPE.CHECKBOX,
			showTooltip: true,
		},
	] as const;

	const navigateToExercise = (id: string) => {
		addAllParams({
			[EXERCISE_CONFIG.MODE]: getMode(),
			[EXERCISE_CONFIG.TOTAL_CORRECT_RESPONSE]: getTotalCorrectResponse(),
			[EXERCISE_CONFIG.FORMATE]: getFormate(),
			[EXERCISE_CONFIG.AUTO_PLAY]: getAutoPlay(),
		});
		navWithQueryParams(formatNavigate.dictionariesWord(dictionaryId, id));
	};
	return (
		<ContentContainer>
			<ContentContainer.Header>
				<Statistics countWords={exerciseListResponse.length} exercisesId={ID_DICTIONARY_EXERCISE} />
			</ContentContainer.Header>
			<ContentContainer.Sidebar>
				<Sidebar
					title="Exercise Stings"
					fieldsData={fieldsData}
					onChange={(key: string, value: unknown) => addParam(key, value)}
				/>
			</ContentContainer.Sidebar>
			<ContentContainer.Content>
				{exerciseListResponse && <List data={exerciseListResponse} onClick={navigateToExercise} />}
			</ContentContainer.Content>
		</ContentContainer>
	);
};
