import { ReactNode, useEffect } from 'react';
import { ListCollections } from './components/lits-collections/ListCollections';
import { FieldsDataType, SIDE_BAR_COMPONENT_TYPE, Sidebar } from '../../shared/components/sidebar';
import { TOPIC_TENSES } from './constants/store-constants';
import { useCollectionFilter } from '@/store/collection-filter';
import { FilterDataKeyType } from '@/store/collection-filter/useCollectionFilterStore';
import { Ref } from '@/shared/components/sidebar/Sidebar';
import { FILTER_LABELS } from '@/shared/constants/data';
import styles from './collections.module.css';

export const Collections = (): ReactNode => {
	const setFilterDataOnSearch = useCollectionFilter((store) => store.setFilterDataOnSearch);
	const setFilter = useCollectionFilter((store) => store.setFilter);
	const setClean = useCollectionFilter((store) => store.setClean);

	const filterCollectionData = useCollectionFilter((store) => store.filterCollectionData);
	const getFilterCollectionData = useCollectionFilter((store) => store.getFilterCollectionData);
	const store = useCollectionFilter((store) => store);
	console.log('FILTER COLLECTION DATA', filterCollectionData);
	console.log('STORE', store);

	const fieldsData: FieldsDataType[] = [
		{
			keyValue: FILTER_LABELS.title,
			getDefaultValue: () =>
				getFilterCollectionData(FILTER_LABELS.title as FilterDataKeyType) as string,
			label: FILTER_LABELS.title,
			componentType: SIDE_BAR_COMPONENT_TYPE.INPUT,
			placeholder: FILTER_LABELS.title,
		},
		{
			keyValue: FILTER_LABELS.category,
			options: Object.values(TOPIC_TENSES),
			getDefaultValue: () =>
				getFilterCollectionData(FILTER_LABELS.category as FilterDataKeyType) as string[],
			label: FILTER_LABELS.category,
			componentType: SIDE_BAR_COMPONENT_TYPE.MULTIPLE,
		},
		{
			keyValue: FILTER_LABELS.topic,
			options: Object.values(TOPIC_TENSES),
			getDefaultValue: () =>
				getFilterCollectionData(FILTER_LABELS.topic as FilterDataKeyType) as string[],
			label: FILTER_LABELS.topic,
			componentType: SIDE_BAR_COMPONENT_TYPE.MULTIPLE,
		},
	] as const;

	const onChange = (key: string, value: number[] | string | boolean | string[] | number) => {
		setFilter(key, value);
	};

	useEffect(() => {
		setFilterDataOnSearch();
	}, []);

	const onSearch = () => {
		setFilterDataOnSearch();
	};

	const onClear = (refs: Ref) => {
		console.log('COMPONENT REF CLEAR: ', refs);
		console.log('COMPONENT REF CLEAR VALUE: ', refs.current);
		setClean();
		refs.current.forEach((_, index) => refs.current[index].clear());
	};

	return (
		<div className={styles.collectionsContainer}>
			<div className={styles.sidebarContainer}>
				<Sidebar
					title="Filter"
					fieldsData={fieldsData}
					onChange={onChange}
					onSearch={onSearch}
					onClear={onClear}
				/>
			</div>
			<div className={styles.listCollectionsContainer}>
				<ListCollections />
			</div>
		</div>
	);
};
