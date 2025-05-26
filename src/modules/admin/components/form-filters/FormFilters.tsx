import React, { useState } from 'react';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';
import { Tag } from '@/ui-components/Tag';
import { Icon } from '@/ui-components/Icon';
import { classes } from '@/shared/utils/classes';

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

	const clearForm = () => {
		setFormInputs(initialFormInputs);
		setFormItems(initialFormItems);
		setFormErrors(initialFormErrors);
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
		<div className={styles.filters}>
			<form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
				<div className={styles.formContent}>
					<h2 className={styles.title}>Filters</h2>
					{(Object.keys(formItems) as (keyof FormItems)[]).map((key) => (
						<div className={styles.formItemContainer} key={key}>
							<label className={styles.label}>{key.toLocaleUpperCase()}</label>
							<div className={styles.formItem}>
								<Input
									/* className={formErrors[key].length > 0 ? styles.warning : styles.underlinedInput} */
									className={classes(styles.underlinedInput, {
										[styles.warning]: formErrors[key].length > 0,
									})}
									id={key}
									name={key}
									/* status={formErrors[key].length > 0 ? 'warning' : ''} */
									value={formInputs[key]}
									onChange={(e) => handleChange(e)}
								/>
								<Button type="primary" onClick={() => addItems(key)} shape="circle">
									<Icon icon="plus" variant="default" size="s" />
								</Button>
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
					<div className={styles.buttonsContainer}>
						<Button type="primary" shape="round" onClick={clearForm}>
							Clear
						</Button>
						<Button type="primary" shape="round" onClick={handleSubmit}>
							Submit
						</Button>
					</div>
				</div>
			</form>
			<div className={styles.quote}>
				<div className={styles.content}>
					<h1 className={styles.quoteTitle}>Create Filters</h1>
					<blockquote className={styles.blockquote}>
						To have another language is to possess a second soul.
					</blockquote>
					<p className={styles.nameOfQuote}>— Charlemagne</p>
					<ol className={styles.explanation}>
						<li>This form is designed to create collection filters.</li>
						<li>At least one of the items must have a list.</li>
						<li>The form does not allow having the same item in the list.</li>
					</ol>
				</div>
			</div>
		</div>
	);
};
