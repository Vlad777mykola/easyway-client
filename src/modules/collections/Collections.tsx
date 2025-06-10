import { ReactNode } from 'react';
import { CollectionsType } from '@/shared/constants';
import { useCollectionFilter } from '@/store/collection-filter';
import { FILTER_LABELS } from '@/shared/constants/collections/data';
import { TOPIC_TENSES } from '@/store/collection-filter/constants';
import { ContentContainer } from '@/ui-components/Content-Container';
import { FieldsDataType, SIDE_BAR_COMPONENT_TYPE, Sidebar } from '@/shared/components/sidebar';

import { ListCollections } from './components/lits-collections/ListCollections';

export const Collections = ({ collectionId }: { collectionId: CollectionsType }): ReactNode => {
	const setClean = useCollectionFilter.use.setClean();
	const setFilter = useCollectionFilter.use.setFilter();
	const getFiltersData = useCollectionFilter.use.getFiltersData();
	const setFilterDataOnSearch = useCollectionFilter.use.setFilterDataOnSearch();

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
			options: Object.values(TOPIC_TENSES),
			getDefaultValue: () => getFiltersData(FILTER_LABELS.category),
			label: FILTER_LABELS.category,
			componentType: SIDE_BAR_COMPONENT_TYPE.MULTIPLE,
		},
		{
			keyValue: FILTER_LABELS.topic,
			options: Object.values(TOPIC_TENSES),
			getDefaultValue: () => getFiltersData(FILTER_LABELS.topic),
			label: FILTER_LABELS.topic,
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
