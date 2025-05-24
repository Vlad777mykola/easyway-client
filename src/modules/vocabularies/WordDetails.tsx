import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
	EXERCISE_FORMATE,
	ExerciseModeType,
} from '@/store/exercise-progress/useExerciseProgressStore';
import { Statistics } from '@/shared/components/statistics/Statistics';
import { useVocabularyListData } from '@/modules/vocabularies/hooks/useVocabularyListData';
import { List } from '@/shared/components/list';
import { FieldsDataType, SIDE_BAR_COMPONENT_TYPE, Sidebar } from '@/shared/components/sidebar';
import { EXERCISE_MODE, useVocabularyStore, WORD_CONFIG } from '@/store/vocabulary-collection';
import { ContentContainer } from '@/ui-components/Content-Container';
import { EXERCISE_CONFIG_LABELS } from './constants';
import { EXERCISE_CONFIG } from '../exercise/constants';
import styles from './wordDetails.module.css';
import { useProgressStore } from '@/store/progress';

export const WordDetails = () => {
	const { vocabulariesId = '' } = useParams();
	const ID_VOCABULARY_EXERCISE = `${vocabulariesId}_vocabulary`;
	const filteredWordsVocabulary = useVocabularyStore.use.filteredWordsVocabulary();
	const exerciseMode = useVocabularyStore.use.collectionsExerciseConfig().exerciseMode;
	const words = useVocabularyStore.use.words();

	const exerciseListProgress = useVocabularyStore.use.exerciseListProgress();
	const exerciseListProgressStore = useProgressStore.use.exerciseListProgress();

	console.log('exerciseListProgress: ', exerciseListProgress);
	console.log('exerciseListProgressStore: ', exerciseListProgressStore);

	const getWordConfig = useVocabularyStore.use.getWordConfig();
	const setWordsListResponse = useVocabularyStore.use.setWordsListResponse();
	const setWordConfig = useVocabularyStore.use.setWordConfig();
	const setCollectionsExerciseConfig = useVocabularyStore.use.setCollectionsExerciseConfig();
	const setCleanWordConfig = useVocabularyStore.use.setCleanWordConfig();
	const setFilterWordOnSearch = useVocabularyStore.use.setFilterWordOnSearch();
	const getExerciseConfig = useVocabularyStore.use.getExerciseConfig();

	const setExerciseListProgress = useVocabularyStore.use.setExerciseListProgress();

	const navigate = useNavigate();

	const [mode, setMode] = useState<ExerciseModeType>(EXERCISE_MODE.isRandom);

	const fieldsDataWord = [
		{
			keyValue: WORD_CONFIG.wordConfig,
			getDefaultValue: () => getWordConfig() as string,
			label: WORD_CONFIG.wordConfig,
			componentType: SIDE_BAR_COMPONENT_TYPE.INPUT,
			placeholder: WORD_CONFIG.placeholder,
		},
	];

	const fieldsDataMode: FieldsDataType[] = [
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
			disabled: mode === EXERCISE_MODE.isExam,
		},
		{
			keyValue: EXERCISE_CONFIG.FORMATE,
			options: Object.values(EXERCISE_FORMATE),
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
	];

	useVocabularyListData(setWordsListResponse, vocabulariesId || '');

	useEffect(() => {
		const exerciseConfig = getExerciseConfig(EXERCISE_CONFIG.MODE);
		setMode(exerciseConfig as ExerciseModeType);
	}, [exerciseMode]);

	useEffect(() => {
		setExerciseListProgress('', false, exerciseListProgressStore);
	}, [exerciseListProgressStore]);

	const onChangeWord = (key: string, value: number[] | string | boolean | string[] | number) => {
		setWordConfig(key, value);
	};

	const onChangeMode = (key: string, value: number[] | string | boolean | string[] | number) => {
		if (value === EXERCISE_MODE.isExam) {
			setCollectionsExerciseConfig(EXERCISE_CONFIG.TOTAL_CORRECT_RESPONSE, 1);
		}
		if (value === EXERCISE_MODE.isRandom || value === EXERCISE_MODE.isInfinitive) {
			setCollectionsExerciseConfig(EXERCISE_CONFIG.TOTAL_CORRECT_RESPONSE, 15);
		}
		setCollectionsExerciseConfig(key, value);
	};

	const onSearch = () => {
		setFilterWordOnSearch();
	};

	const onClear = () => {
		setCleanWordConfig();
	};

	const onClick = (id: string) => {
		navigate(`/vocabularies/${vocabulariesId}/word/${id}`);
	};

	return (
		<ContentContainer>
			<ContentContainer.Header>
				<Statistics countWords={words.length} exercisesId={ID_VOCABULARY_EXERCISE} />
			</ContentContainer.Header>
			<ContentContainer.Sidebar>
				<div className={styles.sidebarContainer}>
					<div>
						<Sidebar
							title="Find Word / Знайди слово"
							fieldsData={fieldsDataWord}
							onChange={onChangeWord}
							onSearch={onSearch}
							onClear={onClear}
						/>
					</div>
					<div>
						<Sidebar title="Exercise Stings" fieldsData={fieldsDataMode} onChange={onChangeMode} />
					</div>
				</div>
			</ContentContainer.Sidebar>
			<ContentContainer.Content>
				{filteredWordsVocabulary && <List data={filteredWordsVocabulary} onClick={onClick} />}
			</ContentContainer.Content>
		</ContentContainer>
	);
};
