import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Statistics } from '@/modules/vocabularies/components/statistics/Statistics';
import { useVocabularyListData } from '@/modules/vocabularies/hooks/useVocabularyListData';
import { List } from '@/shared/components/list';
import { SIDE_BAR_COMPONENT_TYPE, Sidebar } from '@/shared/components/sidebar';
import { EXERCISE_MODE, useVocabularyStore, WORD_CONFIG } from '@/store/vocabulary-collection';
import { ContentContainer } from '@/ui-components/Content-Container';
import { EXERCISE_CONFIG_LABELS } from './constants';
import { EXERCISE_CONFIG } from '../exercise/constants';
import { EXERCISE_FORMATE } from '@/store/vocabulary-collection/useVocabularyStore';

import styles from './wordDetails.module.css';

export const WordDetails = () => {
	const { vocabulariesId = '' } = useParams();
	const store = useVocabularyStore((state) => state);
	const filteredWordsVocabulary = useVocabularyStore((state) => state.filteredWordsVocabulary);
	const setWordsListResponse = useVocabularyStore((state) => state.setWordsListResponse);
	const getWordConfig = useVocabularyStore((store) => store.getWordConfig);
	const setWordConfig = useVocabularyStore((store) => store.setWordConfig);
	const setCollectionsExerciseConfig = useVocabularyStore.use.setCollectionsExerciseConfig();
	const setCleanWordConfig = useVocabularyStore.use.setCleanWordConfig();
	const setFilterWordOnSearch = useVocabularyStore.use.setFilterWordOnSearch();
	const getExerciseConfig = useVocabularyStore.use.getExerciseConfig();
	const navigate = useNavigate();

	const exerciseListIds = useVocabularyStore((state) => state.exerciseListIds);
	const exerciseList = useVocabularyStore((state) => state.exerciseList);
	const exerciseListResponse = useVocabularyStore((state) => state.exerciseListResponse);
	const commonProgressData = useVocabularyStore((state) => state.commonProgressData);
	const examModeProgress = useVocabularyStore((state) => state.examModeProgress);
	const exerciseListProgress = useVocabularyStore((state) => state.exerciseListProgress);
	const words = useVocabularyStore((state) => state.words);
	const getProgressFromLocalStore = useVocabularyStore((state) => state.getProgressFromLocalStore);

	const exerciseConfig = getExerciseConfig(EXERCISE_CONFIG.MODE);

	const collectionsExerciseConfig = useVocabularyStore((store) => store.collectionsExerciseConfig);

	const getExamProgressFromLocalStore = useVocabularyStore(
		(state) => state.getExamProgressFromLocalStore,
	);

	const uncorrectAnswers = useVocabularyStore((store) => store.examModeProgress.errorProgress);

	console.log('UNCORRECT ANSWERS: ', uncorrectAnswers);

	console.log('EXERCISE CONFIG: ', exerciseConfig);

	console.log('STORE: ', store);
	console.log('EXERCISE LIST IDS: ', exerciseListIds);
	console.log('exerciseList: ', exerciseList);
	console.log('exerciseListResponse: ', exerciseListResponse);
	console.log('commonProgressData: ', commonProgressData);
	console.log('resolvedExerciseId: ', examModeProgress);
	console.log('exerciseListProgress: ', exerciseListProgress);

	console.log('COLLECTIONS EXERCISE CONFIG: ', collectionsExerciseConfig);

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
			disabled: exerciseConfig === EXERCISE_MODE.isExam,
		},
		{
			keyValue: EXERCISE_CONFIG.FORMATE,
			options: Object.values(EXERCISE_FORMATE),
			getDefaultValue: () => getExerciseConfig(EXERCISE_CONFIG.FORMATE),
			label: EXERCISE_CONFIG_LABELS.FORMAT,
			componentType: SIDE_BAR_COMPONENT_TYPE.SELECT,
		},
	];

	useEffect(() => {
		getProgressFromLocalStore(vocabulariesId);
		getExamProgressFromLocalStore(vocabulariesId);
	}, []);

	useVocabularyListData(setWordsListResponse, vocabulariesId);

	const calculateCompletionPercentage = (completedTasks: number, totalTasks: number) => {
		if (totalTasks === 0) return 0;
		return (completedTasks / totalTasks) * 100;
	};

	const percentage = calculateCompletionPercentage(
		examModeProgress.successProgress.length,
		words.length,
	);

	const onChangeWord = (key: string, value: number[] | string | boolean | string[] | number) => {
		setWordConfig(key, value);
	};

	const onChangeMode = (key: string, value: number[] | string | boolean | string[] | number) => {
		console.log('KEY CHANGE WORD: ', key);
		console.log('VALUE CHANGE WORD: ', value);
		if (value === EXERCISE_MODE.isExam) {
			setCollectionsExerciseConfig('exerciseCorrectResponse', 1);
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
					collectionName="Family"
					totalProgress={percentage}
					examProgress={percentage}
					collectionsId={vocabulariesId || ''}
					uncorrectAnswers={uncorrectAnswers}
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
