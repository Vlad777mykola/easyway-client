import { useEffect, useState } from 'react';
import { Button } from '@/ui-components/Button';
import { Typography } from '@/ui-components/Typography';
import { filtersApi } from '@/shared/api/generated';
import type { ApiError } from '@/shared/api/types';

import { TagSection } from '../tag-section/TagSection';
import { InputSection } from '../input-section/InputSection';
import { FiltersKeys, FiltersMap, FiltersValue } from '../../types';
import { extractValues, getModifyFilters, hasChanges } from '../../utils';

import styles from './formFilters.module.css';

export const FormFilters = () => {
	const [showErrors, setShowErrors] = useState(false);
	const [filters, setFilters] = useState<FiltersMap>(new Map());

	const { data, refetch } = filtersApi.useFiltersControllerFindSuspense();

	const { mutate, isPending } = filtersApi.useFiltersControllerUpdate<ApiError>({
		mutation: {
			onSuccess: () => {
				clearForm();
			},
			onError: (error) => {
				console.error('Error creating filter:', error);
			},
		},
	});

	useEffect(() => {
		if (data) {
			setFilters(getModifyFilters(data));
		}
	}, [data]);

	const onUpdateValue = (key: FiltersKeys, value: FiltersValue[]) => {
		setFilters((prev) => {
			const copy = new Map(prev);
			copy.set(key, value);
			return copy;
		});
	};

	const onSubmit = () => {
		if (!hasChanges(filters)) {
			setShowErrors(true);
			return;
		}

		mutate({
			data: {
				level: extractValues('level', filters),
				tenses: extractValues('tenses', filters),
				topic: extractValues('topic', filters),
				category: extractValues('category', filters),
			},
		});
	};

	const clearForm = async () => {
		const result = await refetch();
		if (result.isSuccess && result.data) {
			setFilters(getModifyFilters(result.data));
			setShowErrors(false);
		}
	};

	return (
		<div className={styles.filtersContainer}>
			<Typography.Title className={styles.title} level={2}>
				FiltersMap
			</Typography.Title>
			{filters && (
				<div className={styles.formContent}>
					{[...filters.entries()].map(([key, value]) => (
						<div className={styles.formItemContainer} key={key}>
							<InputSection keyOfFilters={key} filters={value} onAdd={onUpdateValue} />

							<div className={styles.allTags}>
								<TagSection keyOfFilters={key} filters={value} onAction={onUpdateValue} />
							</div>
						</div>
					))}
				</div>
			)}
			{showErrors && <Typography.Text type="danger">Required some changes</Typography.Text>}
			<div className={styles.filtersButtons}>
				<Button type="primary" shape="round" onClick={clearForm}>
					Clear
				</Button>
				<Button type="primary" shape="round" disabled={isPending} onClick={onSubmit}>
					Submit
				</Button>
			</div>
		</div>
	);
};
