import { useEffect, useState } from 'react';
import { Select } from '@/ui-components/Select';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { Wrapper } from '@/ui-components/Wrapper';
import styles from './sidebar.module.css';
import { Input } from '@/ui-components/Input';
import { Checkbox } from '@/ui-components/Checkbox';

export type SelectValue = {
	[key: string]: string | boolean | string[];
};

type SelectData = {
	id: string;
	keyValue: string;
	componentType: string;
	selectData?: string[];
	defaultValue?: string[] | string;
	label?: string;
	placeholder?: string;
	isChecked?: boolean;
};

export type Props = {
	title: string;
	selectData: SelectData[];
	onSearch: (data: SelectValue) => void;
	onChange: (data: SelectValue) => void;
};

const returnComponent = (
	data: SelectData[],
	selectValue: SelectValue,
	handleChange: (key: string, value: string[] | string | boolean) => void,
) => {
	const renderComponent = data.map((item) => {
		if (item.componentType === 'select') {
			return (
				<div key={item.keyValue} className={styles.selectContainer}>
					<Select
						className={styles.select}
						placeholder={item.label}
						value={selectValue[item.keyValue]}
						onChange={(value) => handleChange(item.keyValue as string, value as string[])}
						options={[...item.selectData!.map((option) => ({ value: option, label: option }))]}
					/>
				</div>
			);
		}

		if (item.componentType === 'multiple') {
			return (
				<div key={item.keyValue} className={styles.selectContainer}>
					<Select
						className={styles.select}
						mode={item.componentType}
						placeholder={item.label}
						value={selectValue[item.keyValue]}
						onChange={(value) => handleChange(item.keyValue as string, value as string[])}
						options={[...item.selectData!.map((option) => ({ value: option, label: option }))]}
					/>
				</div>
			);
		}

		if (item.componentType === 'input') {
			return (
				<div key={item.keyValue} className={styles.selectContainer}>
					<Input
						name="value"
						value={selectValue[item.keyValue] as string}
						placeholder={item.placeholder}
						onChange={(event) =>
							handleChange(item.keyValue as string, event.target.value as string)
						}
					/>
				</div>
			);
		}

		if (item.componentType === 'checkbox') {
			return (
				<div key={item.keyValue} className={styles.selectContainer}>
					<Checkbox
						checked={selectValue[item.keyValue] as boolean}
						onChange={(event) =>
							handleChange(item.keyValue as string, event.target.checked as boolean)
						}
					>
						{item.label}
					</Checkbox>
				</div>
			);
		}
	});

	return renderComponent;
};

export const Sidebar = ({ title, selectData, onSearch, onChange }: Props) => {
	const [selectValue, setSelectValue] = useState<SelectValue>({});

	useEffect(() => {
		let defaultValues = {};
		selectData?.forEach((item) => {
			defaultValues = { ...defaultValues, [item.keyValue]: item.defaultValue };
		});
		setSelectValue({ ...defaultValues });
	}, []);

	const handleChange = (key: string, value: string[] | string | boolean) => {
		console.log('KEY: ', key);
		console.log('VALUE: ', value);
		setSelectValue((prev) => ({ ...prev, [key]: value }));
		if (onChange) {
			onChange({ ...selectValue, [key]: value });
		}
	};

	const clear = () => {
		setSelectValue({});
	};

	return (
		<Wrapper>
			<div className={styles.filterContainer}>
				<h1 className={styles.title}>{title}</h1>
				{returnComponent(selectData, selectValue, handleChange)}
			</div>
			{onSearch && (
				<div className={styles.buttonsContainer}>
					<div className={styles.buttonContainer}>
						<Button block onClick={() => onSearch(selectValue)}>
							<Icon icon="search" /> Search
						</Button>
					</div>
					<div className={styles.buttonContainer}>
						<Button block onClick={clear}>
							<Icon icon="clear" /> Clear
						</Button>
					</div>
				</div>
			)}
		</Wrapper>
	);
};
