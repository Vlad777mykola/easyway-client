import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/ui-components/Input';
import { useForm, Controller } from 'react-hook-form';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { FiltersKeys, useFilters } from '@/shared/api-hooks/useFilters';
import { Button } from '@/ui-components/Button';
import { Select } from '@/ui-components/Select';
import { capitalize } from '@/shared/utils/capitalize';
import { Typography } from '@/ui-components/Typography';

import { useCollectionsMutation } from '../../hooks/useCollectionsMutation';
import { schema } from '../../zod-schemas/form.schema';
import { FormValues } from '../../types';

import styles from './createCollections.module.css';

export const CreateCollections = () => {
	const { data: filters } = useFilters();
	const { mutate, isPending, error } = useCollectionsMutation(() => {
		clearForm();
	});

	const {
		reset,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FormValues) => {
		mutate(data);
	};

	const clearForm = () => {
		reset();
	};

	return (
		<WrapperCard>
			<div className={styles.container}>
				<Typography.Title className={styles.title} level={2}>
					Create new collection
				</Typography.Title>
				<FieldGroup marginY="03" title="Title" error={errors?.description?.message}>
					<Controller
						name="title"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Enter your title"
								size="middle"
								status={errors?.description && 'error'}
							/>
						)}
					/>
				</FieldGroup>
				<FieldGroup marginY="03" title="Description" error={errors?.description?.message}>
					<Controller
						name="description"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Enter your description"
								size="middle"
								status={errors?.description && 'error'}
							/>
						)}
					/>
				</FieldGroup>
				{filters && (
					<>
						{Object.entries(filters).map(([key, value]) => (
							<FieldGroup
								key={key}
								marginY="03"
								title={capitalize(key)}
								error={errors[key as FiltersKeys]?.message}
							>
								<Controller
									name={key as FiltersKeys}
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											mode="multiple"
											placeholder="Select topics"
											options={value.map((i: string) => ({ label: i, value: i }))}
											status={errors.topic ? 'error' : undefined}
											onChange={field.onChange}
											value={field.value}
										/>
									)}
								/>
							</FieldGroup>
						))}
					</>
				)}

				{error && <Typography.Text type="danger">{error?.message}</Typography.Text>}

				<div className={styles.collectionButtons}>
					<Button type="primary" onClick={clearForm}>
						Clear
					</Button>
					<Button disabled={isPending} type="primary" onClick={handleSubmit(onSubmit)}>
						Submit
					</Button>
				</div>
			</div>
		</WrapperCard>
	);
};
