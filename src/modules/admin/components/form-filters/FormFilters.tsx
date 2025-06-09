import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/ui-components/Button';
import { Typography } from '@/ui-components/Typography';
import { FiltersRes, useFilters } from '@/shared/api-hooks/useFilters';

import { InputSection } from '../input-section/InputSection';
import { TagSection } from '../tag-section/TagSection';

import styles from './formFilters.module.css';

export type FiltersKeys = keyof FiltersRes;
export type FiltersValue = { action: string; value: string };
export type ActionType = 'created' | 'deleted' | 'existing';
export type FiltersMap = Map<FiltersKeys, FiltersValue[]>;

const func = (key: FiltersKeys, data: FiltersMap) => {
	return (
		data
			.get(key)
			?.filter((i) => i.action !== 'deleted')
			.map((i) => i.value) || []
	);
};

export const FormFilters = () => {
	const [filters, setFilters] = useState<FiltersMap>(new Map());
	// const [showErrors, setShowErrors] = useState(false);

	const { data, refetch } = useFilters();

	const mutation = useMutation({
		mutationFn: (data: FiltersRes) => {
			return axios.patch('http://localhost:3000/filters', data, {
				withCredentials: true,
			});
		},
		onSuccess: () => {
			clearForm();
			refetch();
		},
	});

	useEffect(() => {
		if (data) {
			const map: FiltersMap = new Map();
			Object.entries(data).forEach(([key, values]) => {
				const arr = values.map((value: string) => ({
					action: 'existing',
					value,
				}));
				map.set(key as FiltersKeys, arr);
			});
			setFilters(map);
		}
	}, [data]);

	console.log(filters, data);

	const onUpdateValue = (key: FiltersKeys, value: FiltersValue[]) => {
		setFilters((prev) => {
			const copy = new Map(prev);
			copy.set(key, value);
			return copy;
		});
	};

	const onSubmit = () => {
		const newData: FiltersRes = {
			level: func('level', filters),
			tenses: func('tenses', filters),
			topic: func('topic', filters),
			category: func('category', filters),
		};

		// if (isValid) {
		// 	setShowErrors(true);
		// 	return;
		// }

		// const result = filtersResSchema.safeParse({ ...newData, original: data });

		// if (!result.success) {
		// 	setShowErrors(true);
		// 	console.error(result.error.format());
		// 	return;
		// }

		console.log('Final data to submit:', newData, data);
		mutation.mutate(newData);
	};

	const clearForm = () => {
		setFilters(new Map());
		// setShowErrors(false);
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
			<div className={styles.filtersButtons}>
				<Button type="primary" shape="round" onClick={clearForm}>
					Clear
				</Button>
				<Button type="primary" shape="round" onClick={onSubmit}>
					Submit
				</Button>
			</div>
		</div>
	);
};
