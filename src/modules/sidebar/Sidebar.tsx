import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Select } from '@/ui-components/Select';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { Wrapper } from '@/ui-components/Wrapper';
import { Input } from '@/ui-components/Input';
import { Checkbox } from '@/ui-components/Checkbox';
import styles from './sidebar.module.css';

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
	onSearch?: (data: SelectValue) => void;
	onChange?: (data: SelectValue) => void;
};

const returnComponent = (
	data: SelectData[],
	setValue: (keyValue: string, value: string | boolean) => void,
	watch: (keyValue: string) => string | boolean | string[],
) => {
	const renderComponent = data.map((item) => {
		if (item.componentType === 'select') {
			return (
				<div key={item.keyValue} className={styles.selectContainer}>
					<Select
						className={styles.select}
						placeholder={item.label}
						options={[...item.selectData!.map((option) => ({ value: option, label: option }))]}
						value={watch(item.keyValue)}
						onChange={(value) => setValue(item.keyValue as string, value)}
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
						options={[...item.selectData!.map((option) => ({ value: option, label: option }))]}
						value={watch(item.keyValue)}
						onChange={(value) => setValue(item.keyValue as string, value)}
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
						value={watch(item.keyValue) as string}
						onChange={(event) => setValue(item.keyValue as string, event.target.value as string)}
					/>
				</div>
			);
		}

		if (item.componentType === 'checkbox') {
			return (
				<div key={item.keyValue} className={styles.selectContainer}>
					<Checkbox
						onChange={(e) => setValue(item.keyValue as string, e.target.checked as boolean)}
						checked={watch(item.keyValue) as boolean}
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
	const { handleSubmit, setValue, watch, reset } = useForm<SelectValue>();

	const watchFields = watch();

	useEffect(() => {
		if (onChange) {
			handleSubmit((data) => {
				onChange(data);
			})();
		}
	}, [watchFields]);

	return (
		<Wrapper>
			<form className={styles.formContainer} onSubmit={onSearch && handleSubmit(onSearch)}>
				<div className={styles.filterContainer}>
					<h1 className={styles.title}>{title}</h1>
					{returnComponent(selectData, setValue, watch)}
				</div>
				<div className={styles.buttonsContainer}>
					{onSearch && (
						<div className={styles.buttonContainer}>
							<Button block htmlType="submit">
								<Icon icon="search" /> Search
							</Button>
						</div>
					)}
					<div className={onSearch ? styles.buttonContainer : styles.fullwidthContainer}>
						<Button block onClick={() => reset()}>
							<Icon icon="clear" /> Clear
						</Button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};
