import React, { useState } from 'react';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';
import { Tag } from '@/ui-components/Tag';

import styles from './formFilters.module.css';

type FormInputs = {
	tenses: string;
	topic: string;
	categories: string;
};

type FormErrors = FormInputs & {
	submit: string;
};

type FormItems = {
	tenses: string[];
	topic: string[];
	categories: string[];
};

const initialFormInputs: FormInputs = {
	tenses: '',
	topic: '',
	categories: '',
};

const initialFormItems: FormItems = {
	tenses: [],
	topic: [],
	categories: [],
};

const initialFormErrors: FormErrors = {
	tenses: '',
	topic: '',
	categories: '',
	submit: '',
};

export const FormFilters = () => {
	const [formInputs, setFormInputs] = useState<FormInputs>(initialFormInputs);
	const [formItems, setFormItems] = useState<FormItems>(initialFormItems);
	const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormInputs((prev) => ({ ...prev, [name]: value }));
	};

	const addItems = (key: keyof FormItems) => {
		setFormInputs((prev) => ({ ...prev, [key]: '' }));

		if (!formItems[key].includes(formInputs[key]) && formInputs[key].length > 0) {
			setFormItems((prev) => ({
				...prev,
				[key]: [...(prev[key] || []), formInputs[key] || ''],
			}));
		}

		if (formItems[key].includes(formInputs[key])) {
			setFormErrors((prev) => ({ ...prev, [key]: 'This item is in list' }));
			setTimeout(() => {
				setFormErrors((prev) => ({ ...prev, [key]: '' }));
			}, 3000);
		}
	};

	const deleteTag = (key: keyof FormItems, value: string) => {
		const updatedItems = { ...formItems, [key]: formItems[key].filter((item) => item !== value) };
		setFormItems(updatedItems);
	};

	const handleSubmit = () => {
		const haveFilters = Object.values(formItems).some((item) => item.length > 0);

		if (haveFilters) {
			console.log('FORM ITEMS: ', formItems);
			setFormInputs(initialFormInputs);
			setFormItems(initialFormItems);
			setFormErrors(initialFormErrors);
		} else {
			setFormErrors((prev) => ({ ...prev, submit: 'Filters are empty.' }));
			setTimeout(() => {
				setFormErrors((prev) => ({ ...prev, submit: '' }));
			}, 3000);
		}
	};

	return (
		<form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
			<div className={styles.formContent}>
				<h2 className={styles.title}>Filters</h2>
				{(Object.keys(formItems) as (keyof FormItems)[]).map((key) => (
					<div className={styles.formItemContainer} key={key}>
						<div className={styles.formItem}>
							<div className={styles.inputContainer}>
								<Input
									id={key}
									name={key}
									status={formErrors[key].length > 0 ? 'warning' : ''}
									value={formInputs[key]}
									onChange={(e) => handleChange(e)}
									addonBefore={<label className={styles.label}>{key.toLocaleUpperCase()}</label>}
								/>
							</div>
							<div className={styles.buttonContainer}>
								<Button onClick={() => addItems(key)} block>
									ADD
								</Button>
							</div>
						</div>
						<div className={styles.errorContainer}>
							<span className={styles.error}>{formErrors[key]}</span>
						</div>
						<div className={styles.tagsContainer}>
							{formItems[key].map((item) => (
								<Tag
									key={item}
									className={styles.tag}
									color="blue"
									onClose={() => deleteTag(key, item)}
									closable
								>
									{item}
								</Tag>
							))}
						</div>
					</div>
				))}
			</div>
			<div className={styles.handleSubmit}>
				<div className={styles.errorContainer}>
					<span className={styles.error}>{formErrors.submit}</span>
				</div>
				<Button type="primary" onClick={handleSubmit} block>
					Submit
				</Button>
			</div>
		</form>
	);
};
