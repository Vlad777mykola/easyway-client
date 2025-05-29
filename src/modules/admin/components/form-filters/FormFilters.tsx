import React, { useState } from 'react';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';
import { Typography } from '@/ui-components/Typography';
import { TagSection } from '../tag-section/TagSection';
import { Icon } from '@/ui-components/Icon';
import { Explanation } from '../exaplanation/Explanation';
import { classes } from '@/ui-design-atoms/classes';
import { LIST_OF_EXPLANATIONS, TITLE_EXPLANATION } from '../../constants';

import styles from './formFilters.module.css';

type FormInputs = {
	tenses: string;
	topic: string;
	categories: string;
};

type FormErrors = FormInputs & {
	submit: string;
};

export type FormItems = {
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

const initialExistTags: FormItems = {
	tenses: ['Present', 'Past', 'Future'],
	topic: ['Present', 'Past', 'Future'],
	categories: ['Present', 'Past', 'Future'],
};

export const FormFilters = () => {
	const [formInputs, setFormInputs] = useState<FormInputs>(initialFormInputs);
	const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);
	const [formItems, setFormItems] = useState<FormItems>(initialFormItems);
	const [deletedTags, setDeletedTags] = useState<FormItems>(initialFormItems);
	const [existTags, setExistTags] = useState<FormItems>(initialExistTags);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormInputs((prev) => ({ ...prev, [name]: value }));
	};

	const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

	const addItems = (key: keyof FormItems) => {
		setFormInputs((prev) => ({ ...prev, [key]: '' }));

		if (
			!formItems[key].includes(formInputs[key]) &&
			!existTags[key].includes(formInputs[key]) &&
			formInputs[key].length > 0
		) {
			setFormItems((prev) => ({
				...prev,
				[key]: [...(prev[key] || []), formInputs[key] || ''],
			}));
		}

		if (formItems[key].includes(formInputs[key]) || existTags[key].includes(formInputs[key])) {
			setFormErrors((prev) => ({ ...prev, [key]: 'This item is in list' }));
			setTimeout(() => {
				setFormErrors((prev) => ({ ...prev, [key]: '' }));
			}, 3000);
		}
	};

	const deleteTag = (
		key: keyof FormItems,
		value: string,
		items: FormItems,
		setFunc: (updated: FormItems) => void,
	) => {
		const updatedItems = { ...items, [key]: items[key].filter((item) => item !== value) };
		setFunc(updatedItems);
		setDeletedTags((prev) => ({
			...prev,
			[key]: [...(prev[key] || []), value],
		}));
	};

	const returnTag = (key: keyof FormItems, value: string) => {
		setDeletedTags((prev) => ({
			...prev,
			[key]: prev[key].filter((item) => item !== value),
		}));

		if (initialExistTags[key].includes(value)) {
			setExistTags((prev) => ({
				...prev,
				[key]: [...prev[key], value],
			}));
		} else {
			setFormItems((prev) => ({
				...prev,
				[key]: [...prev[key], value],
			}));
		}
	};

	const allTagsList = [
		{ title: 'Tenses', list: formItems, onClose: deleteTag, setFunc: setFormItems },
		{ title: 'Delete', list: deletedTags, onClose: returnTag, setFunc: setDeletedTags },
		{ title: 'Existing', list: existTags, onClose: deleteTag, setFunc: setExistTags },
	];

	const clearForm = () => {
		setFormInputs(initialFormInputs);
		setExistTags(initialExistTags);
		setFormItems(initialFormItems);
		setDeletedTags(initialFormItems);
		setFormErrors(initialFormErrors);
	};

	const handleSubmit = () => {
		const haveFilters = Object.values(formItems).some((item) => item.length > 0);

		if (haveFilters) {
			console.log('FORM ITEMS: ', formItems);
			setFormInputs(initialFormInputs);
			setFormItems(initialFormItems);
			setFormErrors(initialFormErrors);

			setExistTags(initialExistTags);
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
				<Typography.Title className={styles.title} level={2}>
					Filters
				</Typography.Title>
				<div className={styles.formContent}>
					{(Object.keys(formItems) as (keyof FormItems)[]).map((key) => (
						<div className={styles.formItemContainer} key={key}>
							<Typography.Text className={styles.label}>{capitalizeFirst(key)}</Typography.Text>
							<div className={styles.formItem}>
								<Input
									className={classes(styles.underlinedInput, {
										[styles.warning]: formErrors[key].length > 0,
									})}
									id={key}
									name={key}
									value={formInputs[key]}
									onChange={(e) => handleChange(e)}
								/>
								<Button type="primary" onClick={() => addItems(key)} shape="circle">
									<Icon icon="plus" variant="default" size="s" />
								</Button>
							</div>
							<div className={styles.errorContainer}>
								<Typography.Text className={styles.error}>{formErrors[key]}</Typography.Text>
							</div>
							<div className={styles.allTags}>
								{allTagsList.map((section) => (
									<TagSection
										key={section.title}
										title={section.title}
										keyOfForm={key}
										formItems={section.list}
										showOrHideTag={section.onClose}
										setFormItems={section.setFunc}
									/>
								))}
							</div>
						</div>
					))}
				</div>
				<div className={styles.handleSubmit}>
					<div className={styles.errorContainer}>
						<Typography.Text className={styles.error}>{formErrors.submit}</Typography.Text>
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
			<Explanation title={TITLE_EXPLANATION} listOfAdvice={LIST_OF_EXPLANATIONS} />
		</div>
	);
};
