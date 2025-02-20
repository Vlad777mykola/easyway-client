import { VocabularyListType, VocabularyConfigType } from './useVocabularyStore';

export const filterVocabularyCollections = (
	data: VocabularyListType[],
	filterData: VocabularyConfigType,
) => {
	const { title, vocabularyTopic, vocabularyCategories, levelBased } = filterData;

	return data.filter((item) => {
		console.log(
			'TITLE: ',
			title,
			'some: ',
			title ? item.title.toLowerCase().includes(title.toLowerCase()) : true,
		);
		return (
			(title ? item.title.toLowerCase().includes(title.toLowerCase()) : true) &&
			(vocabularyCategories.length > 0
				? vocabularyCategories.some((cat) => item.category.includes(cat))
				: true) &&
			(vocabularyTopic.length > 0
				? vocabularyTopic.some((top) => item.topic.includes(top))
				: true) &&
			(levelBased.length > 0 ? levelBased.some((level) => item.level.includes(level)) : true)
		);
	});
};
