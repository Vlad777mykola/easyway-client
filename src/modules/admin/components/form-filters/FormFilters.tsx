import React, { useState } from 'react';
import { z } from 'zod';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';
import { Typography } from '@/ui-components/Typography';
import { Alert } from '@/ui-components/Alert';
import { TagSection } from '../tag-section/TagSection';
import { capitalizeFirst } from '@/shared/utils/capitalize-first/capitalizeFirst';
import { Icon } from '@/ui-components/Icon';
import { Explanation } from '../exaplanation/Explanation';
import { classes } from '@/ui-design-atoms/classes';
import { LIST_OF_EXPLANATIONS, TITLE_EXPLANATION } from '@/modules/admin/constants';

import styles from './formFilters.module.css';

type FormInputs = {
	tenses: string;
	topic: string;
	categories: string;
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

const initialExistTags: FormItems = {
	tenses: ['Present', 'Past', 'Future'],
	topic: ['Present', 'Past', 'Future'],
	categories: ['Present', 'Past', 'Future'],
};

type ZodFieldError = { _errors: string[] };

type FormattedErrors = {
	tenses?: ZodFieldError;
	topic?: ZodFieldError;
	categories?: ZodFieldError;
	submit?: ZodFieldError;
};

const uniqueArray = z.array(z.string()).refine((arr) => new Set(arr).size === arr.length, {
	message: 'Items must be unique.',
});

const formDataSchema = z
	.object({
		tenses: uniqueArray,
		topic: uniqueArray,
		categories: uniqueArray,
	})
	.refine((data) => data.tenses.length > 0 || data.topic.length > 0 || data.categories.length > 0, {
		message: 'At least one filter must have at least one item.',
		path: ['submit'],
	});

type FormData = z.infer<typeof formDataSchema>;

const createInputSchema = (existingItems: string[]) =>
	z
		.string()
		.min(1, 'Input is required')
		.refine((val) => !existingItems.includes(val), {
			message: 'This item is already in the list.',
		});

// Айтеми з беку приходять стрінгами, має бути existTags [tag1, tag2, tag3],
// модифіковуєш, робиш список (масив) з об'єктів, де має бути action

export const FormFilters = () => {
	const [formInputs, setFormInputs] = useState<FormInputs>(initialFormInputs);
	const [formItems, setFormItems] = useState<FormData>(initialFormItems);
	const [deletedTags, setDeletedTags] = useState<FormItems>(initialFormItems);

	let tags = initialExistTags;

	// from existTags фільтрую з deletedTags
	// from existingTags remove deletedTags no need useState
	// const [existTags, setExistTags] = useState<FormItems>(initialExistTags);
	const [showErrors, setShowErrors] = useState(false);
	const [inputError, setInputError] = useState<FormInputs>({
		tenses: '',
		topic: '',
		categories: '',
	});

	console.log('FORM ITEMS: ', formItems);
	console.log('DELETED TAGS: ', deletedTags);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const errors = validate();

		if (errors) {
			setShowErrors(true);
		}
		setFormInputs((prev) => ({ ...prev, [name]: value }));
	};

	const validate = (): FormattedErrors | undefined => {
		const res = formDataSchema.safeParse(formItems);
		if (res.success) {
			return undefined;
		}
		return res.error.format();
	};

	const addItems = (key: keyof FormItems) => {
		setFormInputs((prev) => ({ ...prev, [key]: '' }));

		const inputSchema = createInputSchema(formItems[key]);
		const result = inputSchema.safeParse(formInputs[key]);

		setInputError((prev) => ({
			...prev,
			[key]: result.error?.format()._errors.join(', '),
		}));

		console.log('RESULT: ', result.error?.format()._errors.join(', '));

		if (
			!formItems[key].includes(formInputs[key]) &&
			// !existTags[key].includes(formInputs[key]) &&
			formInputs[key].length > 0
		) {
			setFormItems((prev) => ({
				...prev,
				[key]: [...(prev[key] || []), formInputs[key] || ''],
			}));
		}
	};

	const deleteTag = (
		key: keyof FormItems,
		value: string,
		items: FormItems,
		setFunc: (updated: FormItems) => void,
	) => {
		console.log('KEY: ', key);
		console.log('VALUE: ', value);
		console.log('ITEMS: ', items);
		const updatedItems = { ...items, [key]: items[key].filter((item) => item !== value) };
		setFunc(updatedItems);
		setDeletedTags((prev) => ({
			...prev,
			[key]: [...prev[key], value],
		}));
	};

	const returnTag = (key: keyof FormItems, value: string) => {
		setDeletedTags((prev) => ({
			...prev,
			[key]: prev[key].filter((item) => item !== value),
		}));

		if (initialExistTags[key].includes(value)) {
			/* setExistTags((prev) => ({
				...prev,
				[key]: [...prev[key], value],
			})); */

			console.log('Must be logic');
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
		{
			title: 'Existing',
			list: tags,
			onClose: deleteTag,
			setFunc: () => {},
		},
	];

	// example code
	// const tenses = existTags.tenses.filter((i) => deletedTags.tenses.includes(i));

	// console.log('TENSES: ', tenses);

	const clearForm = () => {
		setFormInputs(initialFormInputs);
		// setExistTags(initialExistTags);
		setFormItems(initialFormItems);
		setDeletedTags(initialFormItems);
	};

	const handleSubmit = () => {
		const haveFilters = Object.values(formItems).some((item) => item.length > 0);

		const errors = validate();

		if (errors) {
			setShowErrors(true);
			return;
		}

		if (haveFilters) {
			console.log('FORM ITEMS: ', formItems);
			setFormInputs(initialFormInputs);
			setFormItems(initialFormItems);
			// setExistTags(initialExistTags);
		}
	};

	const errors = showErrors ? validate() : undefined;

	console.log('ERRORS: ', errors);
	console.log('DELETED: ', deletedTags);

	return (
		<div className={styles.filters}>
			<form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
				<Typography.Title className={styles.title} level={2}>
					Filters
				</Typography.Title>
				<div className={styles.formContent}>
					{(Object.keys(formItems) as (keyof FormItems)[]).map((key) => (
						<div className={styles.formItemContainer} key={key}>
							<Typography.Title className={styles.label} level={3}>
								{capitalizeFirst(key)}
							</Typography.Title>
							<div className={styles.formItem}>
								<Input
									/* className={classes(styles.underlinedInput, {
										[styles.warning]: formErrors[key].length > 0,
									})} */
									id={key}
									name={key}
									value={formInputs[key]}
									onChange={(e) => handleChange(e)}
								/>
								<Button onClick={() => addItems(key)}>
									<Typography.Text className={styles.add}>Add</Typography.Text>
								</Button>
							</div>
							<div className={styles.errorContainer}>
								{inputError[key]?.length > 0 && (
									<Alert className={styles.alert} message={inputError[key]} type="error" />
								)}
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
						{errors && errors.submit ? (
							<Alert
								className={styles.alert}
								message={errors.submit?._errors.join(', ')}
								type="error"
							/>
						) : null}
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
