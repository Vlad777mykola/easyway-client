import { useEffect, useState } from 'react';
import { Select } from '@/ui-components/Select';
import styles from './filter.module.css';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { CircleButton } from '@/ui-components/CircleButton';
import { Icon } from '@/ui-components/Icon';

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
	selectData: SelectData[];
};

export const Filter = ({ selectData }: Props) => {
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
		const result = selectData.map((item) => {
			return { ...item, selectData: [...selectedValues[item.keyValue]] };
		});

		return result;
	};

	const clear = () => {
		setSelectValue({});
	};

	return (
		<WrapperCard>
			<div className={styles.filterContainer}>
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
				<CircleButton onClick={() => search(selectValue)}>
					<Icon icon="search" />
				</CircleButton>
				<CircleButton onClick={clear}>
					<Icon icon="clear" />
				</CircleButton>
			</div>
		</WrapperCard>
	);
};
