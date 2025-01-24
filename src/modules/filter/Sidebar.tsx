import { useEffect, useState } from 'react';
import { Select } from '@/ui-components/Select';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { Wrapper } from '@/ui-components/Wrapper';
import styles from './sidebar.module.css';
import { Input } from '@/ui-components/Input';
import { Checkbox } from '@/ui-components/Checkbox';

type SelectValue = {
	[key: string]: string[];
};

type SelectData = {
	id: string;
	keyValue: string;
	selectData: string[];
	defaultValue: string[];
	label: string;
};

type Props = {
	title: string;
	selectData: SelectData[];
};

const returnComponent = (data, selectValue, handleChange) => {
	console.log('DATA IN FUNCTION: ', data);
	const renderComponent = data.map((item) => {
		if (item.componentType === 'select') {
			return (
				<div key={item.keyValue} className={styles.selectContainer}>
					<Select
						className={styles.select}
						mode="multiple"
						placeholder={item.label}
						value={selectValue[item.keyValue]}
						onChange={(value) => handleChange(item.keyValue, value)}
						options={[...item.selectData.map((option) => ({ value: option, label: option }))]}
					/>
				</div>
			);
		}

		if (item.componentType === 'input') {
			return (
				<div key={item.keyValue} className={styles.selectContainer}>
					<Input
						name="value"
						placeholder={item.placeholder}
						value={item.value}
						onChange={(event) => handleChange(item.keyValue, event.target.value)}
					/>
				</div>
			);
		}

		if (item.componentType === 'checkbox') {
			return (
				<div key={item.keyValue} className={styles.selectContainer}>
					<Checkbox
						value={item.isChecked}
						onChange={(event) => handleChange(item.keyValue, event.target.checked)}
					/>
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

	const handleChange = (key: string, value: string[]) => {
		console.log('KEY: ', key);
		console.log('VALUE: ', value);
		setSelectValue((prev) => ({ ...prev, [key]: value }));
		/* 		if (onChange) {
			onChange({ ...selectValue, [key]: value });
		} */
	};

	const search = (selectedValues: SelectValue) => {
		return selectedValues;
	};

	const clear = () => {
		setSelectValue({});
	};

	console.log('SELECT DATA: ', selectData);
	console.log('SELECT VALUE: ', selectValue);

	return (
		<Wrapper>
			<div className={styles.filterContainer}>
				<h1 className={styles.title}>{title}</h1>
				{returnComponent(selectData, selectValue, handleChange)}
			</div>
			{onSearch && (
				<div className={styles.buttonsContainer}>
					<div className={styles.buttonContainer}>
						<Button block onClick={() => search(selectValue)}>
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
