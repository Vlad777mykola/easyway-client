export type BaseFieldsDataType = {
	keyValue: string;
	label?: string;
	placeholder?: string;
	showTooltip?: boolean;
};

export type CheckboxFieldsType = BaseFieldsDataType & {
	componentType: 'checkbox';
	getDefaultValue: () => boolean;
	readonly options?: never;
};

export type SelectOrMultipleFieldsType = BaseFieldsDataType & {
	componentType: 'select' | 'multiple';
	getDefaultValue: () => string | number | string[];
	readonly options: string[] | number[] | { value: string | number; label?: string }[];
	disabled?: boolean;
};

export type InputFieldsType = BaseFieldsDataType & {
	componentType: 'input';
	getDefaultValue: () => string;
	readonly options?: never;
};

export type SelectValueType<T> = {
	[key: string]: T extends { componentType: 'checkbox' } ? boolean : string[];
};

export type CommonStateType<T extends FieldsType> = T extends CheckboxFieldsType
	? boolean
	: T extends InputFieldsType
		? string
		: string[] | number[] | number;

export type SideBarType<T> = {
	title: string;
	fieldsData: T[];
	onClear?: () => void;
	onSearch?: () => void;
	onChange: (key: string, value: number[] | string | boolean | string[] | number) => void;
};

export type FieldsType = CheckboxFieldsType | SelectOrMultipleFieldsType | InputFieldsType;

export type FieldsDataType = BaseFieldsDataType & FieldsType;
