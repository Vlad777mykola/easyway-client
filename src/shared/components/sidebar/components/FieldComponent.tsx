import { useImperativeHandle, useState } from 'react';
import { Select } from '@/ui-components/Select';
import { Input } from '@/ui-components/Input';
import { Checkbox } from '@/ui-components/Checkbox';
import { TooltipLabel } from '@/ui-components/TooltipLabel';
import { SIDE_BAR_COMPONENT_TYPE } from '../constants';
import { Clear } from '../Sidebar';
import type { CommonStateType, FieldsType } from '../type';
import { isCheckbox, isInput, isSelectOrMultiple } from '../utils';
import styles from './fieldComponent.module.css';

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
				{item.showTooltip && item.label && <TooltipLabel label={item.label} />}
				<Select
					className={styles.select}
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
						return { value: 'value', label: 'label' };
					})}
					disabled={item.disabled}
				/>
			</div>
		);
	}

	if (isInput(item)) {
		return (
			<div key={item.keyValue} className={styles.fieldContainer}>
				{item.showTooltip && item.label && <TooltipLabel label={item.label} />}
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
		console.log(item.label);
		return (
			<div key={item.keyValue} className={styles.fieldContainer}>
				<Checkbox
					checked={selectValue as boolean}
					onChange={(event) => change(item.keyValue, event.target.checked)}
				>
					{item.showTooltip && item.label && <TooltipLabel label={item.label} />}
				</Checkbox>
			</div>
		);
	}
};
