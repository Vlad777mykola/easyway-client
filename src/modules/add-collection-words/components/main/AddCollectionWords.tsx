import { Controller, useController, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormValues } from '../../types';
import { schema } from '../../zod-schemas/form.schema';
import { WrapperCard } from '@/features/wrap-card';
import { Select } from '@/ui-components/Select';
import { Typography } from '@/ui-components/Typography';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { capitalize } from '@/shared/utils/capitalize';

import styles from './addCollectionWords.module.css';
import { COLLECTIONS } from '@/shared/constants/collections/collections';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';
import { useCollectionsMutation } from '@/modules/create-collections/hooks/useCollectionsMutation';

export const AddCollectionWords = () => {
	const location = useLocation();
	const { title, topic, tenses, level, description, category } = location.state;
	const {
		reset,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			collectionName: title,
		},
		resolver: zodResolver(schema),
	});

	const { mutate, isPending, error } = useCollectionsMutation(() => {
		clearForm();
	});

	const collections = [title, ...COLLECTIONS];
	console.log('LOCATION: ', title);

	const { TextArea } = Input;

	const clearForm = () => {
		reset();
	};

	const onSubmit = (data: FormValues) => {
		console.log('DATA: ', data);
		//mutate(data);
	};

	return (
		<WrapperCard>
			<div className={styles.container}>
				<Typography.Title className={styles.title} level={2}>
					Create new collection
				</Typography.Title>
				<FieldGroup marginY="03" title="Collection Name" error={errors.collectionName?.message}>
					<Controller
						name="collectionName"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Select topics"
								options={collections.map((i: string) => ({ label: i, value: i }))}
								status={errors.collectionName ? 'error' : undefined}
								onChange={field.onChange}
								value={field.value}
							/>
						)}
					/>
				</FieldGroup>
				<FieldGroup marginY="03" title="Words for collection" error={errors.words?.message}>
					<Controller
						name="words"
						control={control}
						render={({ field }) => <TextArea {...field} />}
					/>
				</FieldGroup>
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
