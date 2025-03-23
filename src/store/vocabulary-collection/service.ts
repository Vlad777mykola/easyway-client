import { VocabularyListType, VocabularyConfigType, Word } from './type';

export const filterVocabularyCollections = (
	data: VocabularyListType[],
	filterData: VocabularyConfigType,
) => {
	const { title, vocabularyTopic, vocabularyCategories, levelBased } = filterData;

	return data.filter((item) => {
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

export const filterWordCollection = (data: Word[], wordConfig: string) => {
	return data.filter((item) => {
		return item ? item.exerciseAnswer.toLowerCase().includes(wordConfig.toLocaleLowerCase()) : true;
	});
};

export function shuffleArray(array: string[]) {
	const newArr = [...array];
	for (let i = newArr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[j]] = [newArr[j], newArr[i]];
	}
	return newArr;
}
