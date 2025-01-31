import {
	FieldsType,
	InputFieldsType,
	CheckboxFieldsType,
	SelectOrMultipleFieldsType,
} from './type';

export const isCheckbox = (item: FieldsType): item is CheckboxFieldsType => {
	return item.componentType === 'checkbox';
};

export const isInput = (item: FieldsType): item is InputFieldsType => {
	return item.componentType === 'input';
};

export const isSelectOrMultiple = (item: FieldsType): item is SelectOrMultipleFieldsType => {
	return item.componentType === 'select' || item.componentType === 'multiple';
};
