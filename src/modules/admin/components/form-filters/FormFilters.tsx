import React, { useState } from 'react';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';

import styles from './formFilters.module.css';
import { Tag } from '@/ui-components/Tag';

type FormInputs = {
	tenses: string;
	topic: string;
	categories: string;
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

const intialFormItems: FormItems = {
	tenses: [],
	topic: [],
	categories: [],
};

const initialFormErrors: FormInputs = {
	tenses: '',
	topic: '',
	categories: '',
};

export const FormFilters = () => {
	const [formInputs, setFormInputs] = useState<FormInputs>(initialFormInputs);
	const [formItems, setFormItems] = useState<FormItems>(intialFormItems);
	const [formErrors, setFormErrors] = useState(initialFormErrors);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		console.log('EVENT name: ', name);
		console.log('EVENT Value: ', value);
		setFormInputs((prev) => ({ ...prev, [name]: value }));
	};

	const addItems = (key: keyof FormItems) => {
		console.log('KEY: ', key);

		setFormInputs((prev) => ({ ...prev, [key]: '' }));

		if (!formItems[key].includes(formInputs[key])) {
			setFormItems((prev) => ({
				...prev,
				[key]: [...(prev[key] || []), formInputs[key] || ''],
			}));
		} else {
			setFormErrors((prev) => ({ ...prev, [key]: 'This item is in list' }));
			setTimeout(() => {
				setFormErrors((prev) => ({ ...prev, [key]: '' }));
			}, 3000);
		}
	};

	console.log('FORM INPUTS: ', formInputs);
	console.log('FORM ITEMS: ', formItems);

	return (
		<form className={styles.formContainer}>
			<div className={styles.formContent}>
				<div className={styles.formItemContainer}>
					<div className={styles.formItem}>
						<label className={styles.label}>Tenses</label>
						<div className={styles.inputContainer}>
							<Input
								id="tenses"
								name="tenses"
								value={formInputs.tenses}
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div className={styles.buttonContainer}>
							<Button onClick={() => addItems('tenses')} block>
								Add
							</Button>
						</div>
					</div>
					{formErrors.tenses.length > 0 && <div>{formErrors.tenses}</div>}
					<div className={styles.tagsContainer}>
						{formItems.tenses.map((item) => (
							<Tag key={item} color="blue">
								{item}
							</Tag>
						))}
					</div>
				</div>
				<div className={styles.formItemContainer}>
					<div className={styles.formItem}>
						<label className={styles.label}>Topic</label>
						<div className={styles.inputContainer}>
							<Input
								id="topic"
								name="topic"
								value={formInputs.topic}
								onChange={(e) => handleChange(e)}
							/>
						</div>
						<div className={styles.buttonContainer}>
							<Button onClick={() => addItems('topic')} block>
								Add
							</Button>
						</div>
					</div>
					{formErrors.topic.length > 0 && <div>{formErrors.topic}</div>}
					<div className={styles.tagsContainer}>
						{formItems.topic.map((item) => (
							<Tag key={item} color="blue">
								{item}
							</Tag>
						))}
					</div>
				</div>
				<div className={styles.formItemContainer}>
					<div className={styles.formItem}>
						<label className={styles.label}>Categories</label>
						<div className={styles.inputContainer}>
							<Input
								id="categories"
								name="categories"
								value={formInputs.categories}
								onChange={handleChange}
							/>
						</div>
						<div className={styles.buttonContainer}>
							<Button onClick={() => addItems('categories')} block>
								Add
							</Button>
						</div>
					</div>
					{formErrors.categories.length > 0 && <div>{formErrors.categories}</div>}
					<div className={styles.tagsContainer}>
						{formItems.categories.map((item) => (
							<Tag key={item} color="blue">
								{item}
							</Tag>
						))}
					</div>
				</div>
			</div>
			<Button type="primary">Submit</Button>
		</form>
	);
};
