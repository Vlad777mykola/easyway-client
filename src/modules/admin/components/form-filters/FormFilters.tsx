import React, { useMemo, useState } from 'react';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';
import { Typography } from '@/ui-components/Typography';
import { Alert } from '@/ui-components/Alert';
import { TagSection } from '../tag-section/TagSection';
import { capitalizeFirst } from '@/shared/utils/capitalize-first/capitalizeFirst';
import { Explanation } from '../exaplanation/Explanation';
import { LIST_OF_EXPLANATIONS, TITLE_EXPLANATION } from '@/modules/admin/constants';
import { FormInputs, FormItems } from '@/modules/admin/types/form-filters.types';
import { FormattedErrorsFilters, FormDataFilters } from '@/modules/admin/types/zod-errors.types';
import {
	createInputSchema,
	formFiltersDataSchema,
} from '@/modules/admin/zod-schemas/form-filters.schema';
import {
	initialExistTags,
	initialFormInputs,
	initialFormItems,
	KEYS,
} from '@/modules/admin/constants/form-filters.constants';

import styles from './formFilters.module.css';

export const FormFilters = () => {
	const [formInputs, setFormInputs] = useState<FormInputs>(initialFormInputs);
	const [formItems, setFormItems] = useState<FormDataFilters>(initialFormItems);
	const [deletedTags, setDeletedTags] = useState<FormItems>(initialFormItems);
	const [showErrors, setShowErrors] = useState(false);
	const [inputError, setInputError] = useState<FormInputs>(initialFormInputs);

	const validate = (): FormattedErrorsFilters | undefined => {
		const res = formFiltersDataSchema.safeParse(formItems);
		if (res.success) {
			return undefined;
		}
		return res.error.format();
	};

	const errors = useMemo(() => (showErrors ? validate() : undefined), [showErrors, formItems]);

	const tags = useMemo(() => {
		return KEYS.reduce((acc, key) => {
			acc[key] = initialExistTags[key].filter((item) => !deletedTags[key].includes(item));
			return acc;
		}, {} as FormItems);
	}, [deletedTags]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const errors = validate();

		if (errors) {
			setShowErrors(true);
		}
		setFormInputs((prev) => ({ ...prev, [name]: value }));
	};

	const addItems = (key: keyof FormItems) => {
		const value = formInputs[key];
		const inputSchema = createInputSchema(formItems[key]);
		const result = inputSchema.safeParse(value);

		if (!result.success) {
			const message = result.error.format()._errors.join(', ');
			setInputError((prev) => ({
				...prev,
				[key]: message,
			}));
		}

		if (!formItems[key].includes(value) && formInputs[key].length > 0) {
			setFormItems((prev) => ({
				...prev,
				[key]: [...(prev[key] || []), formInputs[key] || ''],
			}));
			setInputError((prev) => ({ ...prev, [key]: '' }));
			setFormInputs((prev) => ({ ...prev, [key]: '' }));
		}
	};

	const deleteTag = (key: keyof FormItems, value: string) => {
		setFormItems((prev) => ({
			...prev,
			[key]: prev[key].filter((item) => item !== value),
		}));
	};

	const deleteExistTag = (key: keyof FormItems, value: string) => {
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
	};

	const allTagsList = [
		{ title: 'Tenses', list: formItems, onClose: deleteTag, setFunc: setFormItems },
		{ title: 'Delete', list: deletedTags, onClose: returnTag, setFunc: setDeletedTags },
		{
			title: 'Existing',
			list: tags,
			onClose: deleteExistTag,
			setFunc: () => {},
		},
	];

	const clearForm = () => {
		setFormInputs(initialFormInputs);
		setFormItems(initialFormItems);
		setDeletedTags(initialFormItems);
		setInputError(initialFormInputs);
		setShowErrors(false);
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
			console.log('TAGS: ', tags);
			clearForm();
		}
	};

	return (
		<div className={styles.filters}>
			<form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
				<Typography.Title className={styles.title} level={2}>
					Filters
				</Typography.Title>
				<div className={styles.formContent}>
					{KEYS.map((key) => (
						<div className={styles.formItemContainer} key={key}>
							<Typography.Title className={styles.label} level={3}>
								{capitalizeFirst(key)}
							</Typography.Title>
							<div className={styles.formItem}>
								<Input
									id={key}
									name={key}
									value={formInputs[key]}
									status={inputError[key]?.length > 0 ? 'error' : ''}
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
									/>
								))}
							</div>
						</div>
					))}
				</div>
				<div className={styles.handleSubmit}>
					<div className={styles.errorContainer}>
						{errors?.submit && (
							<Alert
								className={styles.alert}
								message={errors.submit?._errors.join(', ')}
								type="error"
							/>
						)}
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
