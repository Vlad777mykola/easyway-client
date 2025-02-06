import type { CollectionType, FilterDataType } from './useCollectionFilterStore';

export const filterCollections = (data: CollectionType[], filterData: FilterDataType) => {
	const { title, topic, category } = filterData;
	return data.filter((item) => {
		return (
			(title ? item.title.toLowerCase().includes(title.toLowerCase()) : true) &&
			(category.length > 0 ? category.some((cat) => item.category.includes(cat)) : true) &&
			(topic.length > 0 ? topic.some((top) => item.topic.includes(top)) : true)
		);
	});
};
