import { ReactNode } from 'react';
import { CollectionsType } from '@/shared/constants';
import { useCollectionFilter } from '@/store/collection-filter';
import { FILTER_LABELS } from '@/shared/constants/collections/data';
import { ContentContainer } from '@/ui-components/Content-Container';
import { FieldsDataType, SIDE_BAR_COMPONENT_TYPE, Sidebar } from '@/shared/components/sidebar';

import { ListCollections } from './components/lits-collections/ListCollections';
import { useFilters } from '@/shared/api-hooks/useFilters';

export const Collections = ({ collectionId }: { collectionId: CollectionsType }): ReactNode => {
	const setClean = useCollectionFilter.use.setClean();
	const setFilter = useCollectionFilter.use.setFilter();
	const getFiltersData = useCollectionFilter.use.getFiltersData();
	const setFilterDataOnSearch = useCollectionFilter.use.setFilterDataOnSearch();

	const { data: filters } = useFilters();

	const fieldsData: FieldsDataType[] = [
		{
			keyValue: FILTER_LABELS.title,
			getDefaultValue: () => getFiltersData(FILTER_LABELS.title),
			label: FILTER_LABELS.title,
			componentType: SIDE_BAR_COMPONENT_TYPE.INPUT,
			placeholder: FILTER_LABELS.title,
		},
		{
			keyValue: FILTER_LABELS.category,
			options: filters?.category || [],
			getDefaultValue: () => getFiltersData(FILTER_LABELS.category),
			label: FILTER_LABELS.category,
			componentType: SIDE_BAR_COMPONENT_TYPE.MULTIPLE,
		},
		{
			keyValue: FILTER_LABELS.topic,
			options: filters?.topic || [],
			getDefaultValue: () => getFiltersData(FILTER_LABELS.topic),
			label: FILTER_LABELS.topic,
			componentType: SIDE_BAR_COMPONENT_TYPE.MULTIPLE,
		},
		{
			keyValue: FILTER_LABELS.level,
			options: filters?.level || [],
			getDefaultValue: () => getFiltersData(FILTER_LABELS.level),
			label: FILTER_LABELS.level,
			componentType: SIDE_BAR_COMPONENT_TYPE.MULTIPLE,
		},
		{
			keyValue: FILTER_LABELS.tenses,
			options: filters?.tenses || [],
			getDefaultValue: () => getFiltersData(FILTER_LABELS.tenses),
			label: FILTER_LABELS.tenses,
			componentType: SIDE_BAR_COMPONENT_TYPE.MULTIPLE,
		},
	] as const;

	return (
		<ContentContainer>
			<ContentContainer.Sidebar>
				<Sidebar
					title="Filter"
					fieldsData={fieldsData}
					onChange={(key: string, value: number[] | string | boolean | string[] | number) =>
						setFilter(key, value)
					}
					onClear={() => setClean()}
					onSearch={() => setFilterDataOnSearch()}
				/>
			</ContentContainer.Sidebar>
			<ContentContainer.Content>
				<ListCollections collectionId={collectionId} />
			</ContentContainer.Content>
		</ContentContainer>
	);
};
