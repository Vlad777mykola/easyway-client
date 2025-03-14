import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProgressStore } from '@/store/progress';
import { Statistics } from '@/modules/vocabularies/components/statistics/Statistics';
import { useVocabularyListData } from '@/modules/vocabularies/hooks/useVocabularyListData';
import { List } from '@/shared/components/list';
import { SIDE_BAR_COMPONENT_TYPE, Sidebar } from '@/shared/components/sidebar';
import { EXERCISE_MODE, useVocabularyStore, WORD_CONFIG } from '@/store/vocabulary-collection';
import { ContentContainer } from '@/ui-components/Content-Container';
import { EXERCISE_CONFIG_LABELS } from './constants';
import { EXERCISE_CONFIG } from '../exercise/constants';
import { EXERCISE_FORMATE } from '@/store/vocabulary-collection/useVocabularyStore';
import { useIndexedDB } from '@/shared/hooks/use-indexedDB';
import styles from './wordDetails.module.css';
import { ExerciseModeType } from '@/store/exercise-progress/useExerciseProgressStore';

export const WordDetails = () => {
	const { vocabulariesId = '' } = useParams();
	const filteredWordsVocabulary = useVocabularyStore((state) => state.filteredWordsVocabulary);
	const uncorrectAnswers = useProgressStore((store) => store.examModeProgress.errorProgress);
	const latestTests = useProgressStore((state) => state.latestTests) || [];
	const exerciseMode = useVocabularyStore((state) => state.collectionsExerciseConfig.exerciseMode);
	const getWordConfig = useVocabularyStore((store) => store.getWordConfig);
	const setWordsListResponse = useVocabularyStore((state) => state.setWordsListResponse);
	const setWordConfig = useVocabularyStore((store) => store.setWordConfig);
	const setCollectionsExerciseConfig = useVocabularyStore.use.setCollectionsExerciseConfig();
	const setCleanWordConfig = useVocabularyStore.use.setCleanWordConfig();
	const setFilterWordOnSearch = useVocabularyStore.use.setFilterWordOnSearch();
	const getExerciseConfig = useVocabularyStore.use.getExerciseConfig();

	const navigate = useNavigate();
	const getProgressFromIndexedDB = useProgressStore((state) => state.getProgressFromIndexedDB);

	const store = useProgressStore((state) => state);

	console.log('STORE: ', store);

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

	const fieldsDataMode = [
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
	];

	useVocabularyListData(setWordsListResponse, vocabulariesId);

	useEffect(() => {
		const exerciseConfig = getExerciseConfig(EXERCISE_CONFIG.MODE);
		setMode(exerciseConfig as ExerciseModeType);
	}, [exerciseMode]);

	useIndexedDB(
		(exam, random, latestTests) => getProgressFromIndexedDB(exam, random, latestTests),
		vocabulariesId,
	);

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
				<Statistics
					collectionsId={vocabulariesId || ''}
					uncorrectAnswers={uncorrectAnswers}
					latestTests={latestTests}
				/>
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
