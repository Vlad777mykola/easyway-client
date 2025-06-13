import { useMemo } from 'react';
import { Tag } from '@/ui-components/Tag';
import { Typography } from '@/ui-components/Typography';

import { FiltersKeys, FiltersValue } from '../../types';

import styles from './tagSection.module.css';

export const TagSection = ({
	keyOfFilters,
	filters,
	onAction,
}: {
	keyOfFilters: FiltersKeys;
	filters: FiltersValue[];
	onAction: (key: FiltersKeys, value: FiltersValue[]) => void;
}) => {
	const { created, deleted, existing } = useMemo(() => {
		const created: FiltersValue[] = [];
		const deleted: FiltersValue[] = [];
		const existing: FiltersValue[] = [];

		filters.forEach((e) => {
			if (e.action === 'created') {
				created.push(e);
			}
			if (e.action === 'deleted') {
				deleted.push(e);
			}
			if (e.action === 'existing') {
				existing.push(e);
			}
		});

		return { created, deleted, existing };
	}, [filters]);

	const onClose = (value: FiltersValue) => {
		const filtered = filters.filter((i) => i.value !== value.value);

		if (value.action !== 'created') {
			onAction(keyOfFilters, [...filtered, value]);
			return;
		}

		onAction(keyOfFilters, filtered);
	};

	return (
		<>
			<div className={styles.typeTags}>
				<Typography.Text className={styles.titleType}>New: </Typography.Text>
				<div className={styles.tagsContainer}>
					{created &&
						created.map((i) => (
							<Tag
								className={styles.tag}
								key={i.value}
								color="green"
								onClose={() => onClose(i)}
								closable
							>
								{i.value}
							</Tag>
						))}
				</div>
			</div>
			<div className={styles.typeTags}>
				<Typography.Text className={styles.titleType}>Delete: </Typography.Text>
				<div className={styles.tagsContainer}>
					{deleted &&
						deleted.map((i) => (
							<Tag
								className={styles.tag}
								color="red"
								key={i.value}
								onClose={() => onClose({ ...i, action: 'existing' })}
								closable
							>
								{i.value}
							</Tag>
						))}
				</div>
			</div>
			<div className={styles.typeTags}>
				<Typography.Text className={styles.titleType}>Existing: </Typography.Text>
				<div className={styles.tagsContainer}>
					{existing &&
						existing.map((i) => (
							<Tag
								className={styles.tag}
								color="blue"
								key={i.value}
								onClose={() => onClose({ ...i, action: 'deleted' })}
								closable
							>
								{i.value}
							</Tag>
						))}
				</div>
			</div>
		</>
	);
};
