import { CollectionType, filterDatatype } from './useCollectionFilterStore';

export const filterCollections = (data: CollectionType[], filterData: filterDatatype) => {
	const { title, topic, subtitle, category, level, learningStyle, learnByInterest, learnBySkill } =
		filterData;
	console.log('2', data, filterData);
	return data.filter((item) => {
		return (
			(title ? item.title.toLowerCase().includes(title.toLowerCase()) : true) &&
			(subtitle ? item.subtitle.toLowerCase().includes(subtitle.toLowerCase()) : true) &&
			(level ? item.level.toLocaleLowerCase() === level.toLocaleLowerCase() : true) &&
			(category.length > 0 ? category.some((cat) => item.category.includes(cat)) : true) &&
			(learningStyle
				? item.learningStyle.toLocaleLowerCase() === learningStyle.toLocaleLowerCase()
				: true) &&
			(topic.length > 0 ? topic.some((top) => item.topic.includes(top)) : true) &&
			(learnBySkill
				? item.learnBySkill.toLocaleLowerCase() === learnBySkill.toLocaleLowerCase()
				: true) &&
			(learnByInterest
				? item.learnByInterest.toLocaleLowerCase() === learnByInterest.toLocaleLowerCase()
				: true)
		);
	});
};
