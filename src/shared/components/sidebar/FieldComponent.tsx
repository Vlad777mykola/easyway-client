import { useState } from 'react';
import { Select } from '@/ui-components/Select';
import { Input } from '@/ui-components/Input';
import { Checkbox } from '@/ui-components/Checkbox';
import { CommonStateType, FieldsType } from './type';
import { isCheckbox, isInput, isSelectOrMultiple } from './utils';
import styles from './fieldComponent.module.css';

export const FieldComponent = ({
	item,
	onChange,
}: {
	item: FieldsType;
	onChange: (key: string, value: string | boolean | string[] | number[] | number) => void;
}) => {
	const [selectValue, setSelectValue] = useState<CommonStateType<FieldsType>>(
		item.getDefaultValue(),
	);

	const change = (key: string, value: CommonStateType<FieldsType>) => {
		setSelectValue(value);
		onChange(key, value);
	};

	if (isSelectOrMultiple(item)) {
		return (
			<div key={item.keyValue} className={styles.fieldContainer}>
				<Select
					className={styles.select}
					placeholder={item.label}
					value={selectValue}
					mode={item.componentType === 'multiple' ? 'multiple' : undefined}
					onChange={(value) => change(item.keyValue, value)}
					options={item.options.map((option) => ({ value: option, label: option }))}
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
