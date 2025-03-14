import { useImperativeHandle, useState } from 'react';
import { Select } from '@/ui-components/Select';
import { Input } from '@/ui-components/Input';
import { Checkbox } from '@/ui-components/Checkbox';
import { SIDE_BAR_COMPONENT_TYPE } from '../constants';
import type { CommonStateType, FieldsType } from '../type';
import { isCheckbox, isInput, isSelectOrMultiple } from '../utils';
import styles from './fieldComponent.module.css';
import { Clear } from '../Sidebar';

export const FieldComponent = ({
	item,
	onChange,
	ref,
}: {
	item: FieldsType;
	onChange: (key: string, value: string | boolean | string[] | number[] | number) => void;
	ref: (el: Clear) => void;
}) => {
	const [selectValue, setSelectValue] = useState<CommonStateType<FieldsType>>(
		item.getDefaultValue(),
	);

	useImperativeHandle(ref, () => ({
		clear: () => {
			setSelectValue(item.getDefaultValue());
		},
	}));

	const change = (key: string, value: CommonStateType<FieldsType>) => {
		setSelectValue(value);
		onChange(key, value);
	};

	if (isSelectOrMultiple(item)) {
		return (
			<div key={item.keyValue} className={styles.fieldContainer}>
				<Select
					className={styles.select}
					label={item.label}
					value={selectValue}
					mode={
						item.componentType === SIDE_BAR_COMPONENT_TYPE.MULTIPLE
							? SIDE_BAR_COMPONENT_TYPE.MULTIPLE
							: undefined
					}
					onChange={(value) => change(item.keyValue, value)}
					options={item.options.map((option) => {
						if (typeof option === 'object' && option?.value) {
							return { value: option.value, label: option?.label || option.value };
						}
						if (typeof option === 'string' || typeof option === 'number') {
							return { value: option, label: option };
						}
						console.log(option);
						return { value: 'value', label: 'label' };
					})}
				/>
			</div>
		);
	}

	if (isInput(item)) {
		return (
			<div key={item.keyValue} className={styles.fieldContainer}>
				<Input
					name="value"
					value={selectValue as string}
					placeholder={item.placeholder}
					onChange={(event) => change(item.keyValue, event.target.value)}
				/>
			</div>
		);
	}

	if (isCheckbox(item)) {
		return (
			<div key={item.keyValue} className={styles.fieldContainer}>
				<Checkbox
					checked={selectValue as boolean}
					onChange={(event) => change(item.keyValue, event.target.checked)}
				>
					{item.label}
				</Checkbox>
			</div>
		);
	}
};
