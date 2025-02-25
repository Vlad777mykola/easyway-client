import { useNavigate, useParams } from 'react-router-dom';
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
import { StandardProgressBar } from '@/ui-components/CustomProgress/StandartProgressBar';
import { useEffect } from 'react';
import { CircleProgressBar } from '@/ui-components/CircleProgressBar/CircleProgressBar';

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
	const resolvedExerciseId = useVocabularyStore((state) => state.resolvedExerciseId);
	const exerciseListProgress = useVocabularyStore((state) => state.exerciseListProgress);
	const words = useVocabularyStore((state) => state.words);
	const getProgressFromLocalStore = useVocabularyStore((state) => state.getProgressFromLocalStore);

	console.log('STORE: ', store);
	console.log('EXERCISE LIST IDS: ', exerciseListIds);
	console.log('exerciseList: ', exerciseList);
	console.log('exerciseListResponse: ', exerciseListResponse);
	console.log('commonProgressData: ', commonProgressData);
	console.log('resolvedExerciseId: ', resolvedExerciseId);
	console.log('exerciseListProgress: ', exerciseListProgress);

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
	}, []);

	useVocabularyListData(setWordsListResponse, vocabulariesId);

	const calculateCompletionPercentage = (completedTasks: number, totalTasks: number) => {
		if (totalTasks === 0) return 0;
		return (completedTasks / totalTasks) * 100;
	};

	const percentage = calculateCompletionPercentage(resolvedExerciseId.length, words.length);
	console.log('PERCENTAGE: ', percentage);

	const onChangeWord = (key: string, value: number[] | string | boolean | string[] | number) => {
		setWordConfig(key, value);
	};

	const onChangeMode = (key: string, value: number[] | string | boolean | string[] | number) => {
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
				{/* <Statistics collectionsId={vocabulariesId || ''} /> */}
				<StandardProgressBar done={percentage} />
				<CircleProgressBar progress={20} />
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
