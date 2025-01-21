import { useEffect, useState } from 'react';
import { Select } from '@/ui-components/Select';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import styles from './filter.module.css';
import { Wrapper } from '@/ui-components/Wrapper';

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

export const Filter = ({ title, selectData }: Props) => {
	const [selectValue, setSelectValue] = useState<SelectValue>({});

	useEffect(() => {
		let defaultValues = {};
		selectData.forEach((item) => {
			defaultValues = { ...defaultValues, [item.keyValue]: item.defaultValue };
		});
		setSelectValue({ ...defaultValues });
	}, []);

	const handleChange = (key: string, value: string[]) => {
		setSelectValue({ ...selectValue, [key]: value });
	};

	const search = (selectedValues: SelectValue) => {
		return selectedValues;
	};

	const clear = () => {
		setSelectValue({});
	};

	return (
		<Wrapper>
			<div className={styles.filterContainer}>
				<h1 className={styles.title}>{title}</h1>
				{[...selectData].map((item) => {
					const key: string = item.keyValue;
					return (
						<div key={item.keyValue} className={styles.selectContainer}>
							<Select
								className={styles.select}
								mode="multiple"
								placeholder={item.label}
								value={selectValue[key]}
								onChange={(value) => handleChange(item.keyValue, value)}
								options={[...item.selectData.map((option) => ({ value: option, label: option }))]}
							/>
						</div>
					);
				})}
			</div>
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
		</Wrapper>
	);
};
