import z from 'zod';
import { useState } from 'react';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';
import { Typography } from '@/ui-components/Typography';
import { capitalize } from '@/shared/utils/capitalize';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { FiltersKeys, FiltersValue } from '../form-filters/FormFilters';

import styles from './inputSection.module.css';

const createFormDataSchema = (filters: FiltersValue[]) =>
	z
		.string()
		.min(3, 'Input is required')
		.max(20, 'Too long')
		.regex(/^[A-Za-z]+$/, 'Only letters are allowed (no numbers or symbols)')
		.transform((val) => val.trim())
		.refine((val) => !filters.some((f) => f.value.toLowerCase() === val.toLowerCase()), {
			message: 'This value already exists',
		});

export const InputSection = ({
	keyOfFilters,
	filters,
	onAdd,
}: {
	keyOfFilters: FiltersKeys;
	filters: FiltersValue[];
	onAdd: (key: FiltersKeys, value: FiltersValue[]) => void;
}) => {
	const [formInputs, setFormInputs] = useState<string>('');
	const [showErrors, setShowErrors] = useState(false);

	const validate = (input: string, filters: FiltersValue[]) => {
		const schema = createFormDataSchema(filters);
		const res = schema.safeParse(input);

		if (res.success) {
			return undefined;
		}

		return res.error.format();
	};

	const addNewTag = (key: FiltersKeys, value: string) => {
		if (validate(value, filters)) {
			setShowErrors(true);
			return;
		}

		onAdd(key, [...filters, { action: 'created', value }]);
		setFormInputs('');
		setShowErrors(false);
	};

	const errors = showErrors ? validate(formInputs, filters) : undefined;

	return (
		<>
			<FieldGroup marginY="07" title={capitalize(keyOfFilters)} error={errors && errors._errors[0]}>
				<div className={styles.formItem}>
					<Input
						value={formInputs}
						status={errors ? 'error' : undefined}
						onChange={(e) => setFormInputs(e.target.value)}
					/>
					<Button onClick={() => addNewTag(keyOfFilters as FiltersKeys, formInputs)}>
						<Typography.Text className={styles.add}>Add</Typography.Text>
					</Button>
				</div>
			</FieldGroup>
		</>
	);
};
