import React, { useMemo, useState } from 'react';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';
import { Typography } from '@/ui-components/Typography';
// import { Alert } from '@/ui-components/Alert';
// import { TagSection } from '../tag-section/TagSection';
import { capitalize } from '@/shared/utils/capitalize';
// import { Explanation } from '../exaplanation/Explanation';
// import { LIST_OF_EXPLANATIONS, TITLE_EXPLANATION } from '@/modules/admin/constants';
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
import { FieldGroup } from '@/ui-components/FieldGroup';

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

	// const errors = useMemo(() => (showErrors ? validate() : undefined), [showErrors, formItems]);

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
		{ title: 'Tenses', color: 'green', list: formItems, onClose: deleteTag, setFunc: setFormItems },
		{
			title: 'Delete',
			color: 'red',
			list: deletedTags,
			onClose: returnTag,
			setFunc: setDeletedTags,
		},
		{
			title: 'Existing',
			list: tags,
			onClose: deleteExistTag,
			setFunc: () => {},
		},
	];

	console.log(allTagsList);

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
			console.log('TAGS: ', tags, showErrors);
			clearForm();
		}
	};

	return (
		<div className={styles.filtersContainer}>
			<Typography.Title className={styles.title} level={2}>
				Filters
			</Typography.Title>
			<div className={styles.formContent}>
				{KEYS.map((key) => (
					<div className={styles.formItemContainer} key={key}>
						<FieldGroup marginY="07" title={capitalize(key)}>
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
						</FieldGroup>
						<div className={styles.allTags}>
							{/* {allTagsList.map((section) => (
								<TagSection
									key={section.title}
									title={section.title}
									keyOfForm={key}
									formItems={section.list}
									showOrHideTag={section.onClose}
								/>
							))} */}
						</div>
					</div>
				))}
			</div>
			<div className={styles.filtersButtons}>
				<Button type="primary" shape="round" onClick={clearForm}>
					Clear
				</Button>
				<Button type="primary" shape="round" onClick={handleSubmit}>
					Submit
				</Button>
			</div>
		</div>
	);
};
