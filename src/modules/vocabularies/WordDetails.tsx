import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RandomTest, useProgressStore } from '@/store/progress';
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
	const filteredWordsVocabulary = useVocabularyStore((state) => state.filteredWordsVocabulary);
	const examModeProgress = useProgressStore((state) => state.examModeProgress);
	const words = useVocabularyStore((state) => state.words);
	const collectionsExerciseConfig = useVocabularyStore((store) => store.collectionsExerciseConfig);
	const progressStore = useProgressStore((store) => store.randomModeProgress);
	const uncorrectAnswers = useProgressStore((store) => store.examModeProgress.errorProgress);
	const getProgressFromLocalStore = useVocabularyStore((state) => state.getProgressFromLocalStore);
	const getWordConfig = useVocabularyStore((store) => store.getWordConfig);
	const setWordsListResponse = useVocabularyStore((state) => state.setWordsListResponse);
	const setWordConfig = useVocabularyStore((store) => store.setWordConfig);
	const setCollectionsExerciseConfig = useVocabularyStore.use.setCollectionsExerciseConfig();
	const setCleanWordConfig = useVocabularyStore.use.setCleanWordConfig();
	const setFilterWordOnSearch = useVocabularyStore.use.setFilterWordOnSearch();
	const getExerciseConfig = useVocabularyStore.use.getExerciseConfig();
	const exerciseConfig = getExerciseConfig(EXERCISE_CONFIG.MODE);

	console.log('EXAM PROGRESS: ', examModeProgress);

	const navigate = useNavigate();

	const getExamProgressFromLocalStore = useProgressStore(
		(state) => state.getExamProgressFromLocalStore,
	);

	const [totalRandom, setTotalRandom] = useState(0);

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

	useVocabularyListData(setWordsListResponse, vocabulariesId);

	useEffect(() => {
		getProgressFromLocalStore(vocabulariesId);
		getExamProgressFromLocalStore(vocabulariesId);
	}, []);

	useEffect(() => {
		const countRandom = countRandomMode(words.length, progressStore.progress, progressStore.isDone);
		setTotalRandom(countRandom);
	}, [words, progressStore, collectionsExerciseConfig.exerciseCorrectResponse]);

	const calculateCompletionPercentage = (completedTasks: number, totalTasks: number) => {
		if (totalTasks === 0) return 0;
		return Math.round((completedTasks / totalTasks) * 100);
	};

	const calculateTotalProgress = (examProgress: number, randomProgress: number) => {
		const totalProgress = (examProgress + randomProgress) / 2;
		return Math.ceil(totalProgress);
	};

	const countRandomMode = (countWords: number, progressStore: RandomTest[], isDone: boolean) => {
		const countMake = collectionsExerciseConfig.exerciseCorrectResponse * countWords;
		let totalCount = 0;
		const HUNDRED_PROCENT = 100;

		if (isDone) {
			return HUNDRED_PROCENT;
		}

		progressStore.forEach((item) => {
			totalCount += item.correctCount;
		});

		return calculateCompletionPercentage(totalCount, countMake);
	};

	const percentage = calculateCompletionPercentage(
		examModeProgress.successProgress.length,
		words.length,
	);

	const uncorrectAnswersPercentage = calculateCompletionPercentage(
		examModeProgress.errorProgress.length,
		words.length,
	);

	const totalProgress = calculateTotalProgress(percentage, totalRandom);

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
					collectionName="Family"
					totalProgress={totalProgress}
					examProgressResolved={percentage}
					examProgressUnresolved={uncorrectAnswersPercentage}
					randomProgress={totalRandom}
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
