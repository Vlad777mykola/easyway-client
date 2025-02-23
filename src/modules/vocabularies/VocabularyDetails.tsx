import { useEffect } from 'react';
import { VocabularyCollections } from '@/modules/vocabularies/components/vocabulary-collections/VocabularyCollections';
import { VOCABULARY_CONFIG_LABELS } from '@/modules/vocabularies/constants';
import { FieldsDataType, SIDE_BAR_COMPONENT_TYPE, Sidebar } from '@/shared/components/sidebar';
import { useVocabularyStore } from '@/store/vocabulary-collection';
import {
	LEVEL_BASED,
	VOCABULARY_CATEGORIES,
	VOCABULARY_CONFIG,
	VOCABULARY_TOPICS,
} from '@/store/vocabulary-collection/useVocabularyStore';
import { ContentContainer } from '@/ui-components/Content-Container';

export const VocabularyDetails = () => {
	const vocabulary = useVocabularyStore((state) => state);
	const getVocabularyConfig = useVocabularyStore.use.getVocabularyConfig();
	const setCollectionsVocabularyConfig = useVocabularyStore.use.setCollectionsVocabularyConfig();
	const setFilterVocabularyOnSearch = useVocabularyStore.use.setFilterVocabularyOnSearch();
	const setClean = useVocabularyStore.use.setClean();
	const fieldsData: FieldsDataType[] = [
		{
			keyValue: VOCABULARY_CONFIG.title,
			getDefaultValue: () => getVocabularyConfig(VOCABULARY_CONFIG.title) as string,
			label: VOCABULARY_CONFIG_LABELS.topic,
			componentType: SIDE_BAR_COMPONENT_TYPE.INPUT,
			placeholder: VOCABULARY_CONFIG.title,
		},
		{
			keyValue: VOCABULARY_CONFIG.topic,
			options: Object.values(VOCABULARY_TOPICS),
			getDefaultValue: () => getVocabularyConfig(VOCABULARY_CONFIG.topic),
			label: VOCABULARY_CONFIG_LABELS.topic,
			componentType: SIDE_BAR_COMPONENT_TYPE.MULTIPLE,
		},
		{
			keyValue: VOCABULARY_CONFIG.categories,
			options: Object.values(VOCABULARY_CATEGORIES),
			getDefaultValue: () => getVocabularyConfig(VOCABULARY_CONFIG.categories),
			label: VOCABULARY_CONFIG_LABELS.categories,
			componentType: SIDE_BAR_COMPONENT_TYPE.MULTIPLE,
		},
		{
			keyValue: VOCABULARY_CONFIG.level,
			options: Object.values(LEVEL_BASED),
			getDefaultValue: () => getVocabularyConfig(VOCABULARY_CONFIG.level),
			label: VOCABULARY_CONFIG_LABELS.level,
			componentType: SIDE_BAR_COMPONENT_TYPE.MULTIPLE,
		},
	] as const;

	const onChange = (key: string, value: number[] | string | boolean | string[] | number) => {
		setCollectionsVocabularyConfig(key, value);
	};

	const onSearch = () => {
		setFilterVocabularyOnSearch();
	};

	const onClear = () => {
		setClean();
	};

	useEffect(() => {
		setFilterVocabularyOnSearch();
	}, []);

	console.log('VOCABULARY: ', vocabulary);

	return (
		<ContentContainer>
			<ContentContainer.Header>{null}</ContentContainer.Header>
			<ContentContainer.Sidebar>
				<Sidebar
					title="Filter"
					fieldsData={fieldsData}
					onChange={onChange}
					onSearch={onSearch}
					onClear={onClear}
				/>
			</ContentContainer.Sidebar>
			<ContentContainer.Content>
				<VocabularyCollections />
			</ContentContainer.Content>
		</ContentContainer>
	);
};
