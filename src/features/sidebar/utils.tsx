import { SIDE_BAR_COMPONENT_TYPE } from './constants';
import {
	FieldsType,
	InputFieldsType,
	CheckboxFieldsType,
	SelectOrMultipleFieldsType,
} from './type';

export const isCheckbox = (item: FieldsType): item is CheckboxFieldsType => {
	return item.componentType === SIDE_BAR_COMPONENT_TYPE.CHECKBOX;
};

export const isInput = (item: FieldsType): item is InputFieldsType => {
	return item.componentType === SIDE_BAR_COMPONENT_TYPE.INPUT;
};

export const isSelectOrMultiple = (item: FieldsType): item is SelectOrMultipleFieldsType => {
	return (
		item.componentType === SIDE_BAR_COMPONENT_TYPE.SELECT ||
		item.componentType === SIDE_BAR_COMPONENT_TYPE.MULTIPLE
	);
};
