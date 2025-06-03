// import { z } from 'zod';
// import { Controller, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Input } from '@/ui-components/Input';
// import { WrapperCard } from '@/ui-components/Wrapper-card';
// import { Button } from '@/ui-components/Button';
// import { Select } from '@/ui-components/Select';
// import { FieldGroup } from '@/ui-components/FieldGroup';

// const formSchema = z.object({
// 	title: z.string().min(1, 'Title is required'),
// 	description: z.string().min(1, 'Description is required'),
// 	topic: z.array(z.string()).min(1, 'At least one topic is required'),
// 	category: z.array(z.string()).min(1, 'At least one category is required'),
// });

// type FormValues = z.infer<typeof formSchema>;

// const INITIAL_FORM_STATE: FormValues = {
// 	title: '',
// 	description: '',
// 	topic: [],
// 	category: [],
// };

// export const CreateCollections = () => {
// 	const {
// 		// register,
// 		control,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm<FormValues>({
// 		resolver: zodResolver(formSchema),
// 		defaultValues: INITIAL_FORM_STATE,
// 	});

// 	const onSubmit = (data: FormValues) => {
// 		console.log('Form submitted:', data);
// 	};

// 	const items = [
// 		{ value: 'react', label: 'React' },
// 		{ value: 'node', label: 'Node.js' },
// 		{ value: 'design', label: 'Design' },
// 	];

// 	return (
// 		<WrapperCard>
// 			{/* <FieldGroup margin="03" title="Title" error={errors?.title?.message}>
// 				<Input
// 					placeholder="Enter your title"
// 					size="middle"
// 					status={errors?.title && 'error'}
// 					{...register('title')}
// 				/>
// 			</FieldGroup>
// 			<FieldGroup margin="03" title="Description" error={errors?.description?.message}>
// 				<Input
// 					placeholder="Enter your description"
// 					size="middle"
// 					status={errors?.description && 'error'}
// 					{...register('description')}
// 				/>
// 			</FieldGroup> */}
// 			<FieldGroup margin="03" title="Topic" error={errors?.topic?.message}>
// 				<Controller
// 					name="topic"
// 					control={control}
// 					render={({ field }) => (
// 						<Select
// 							{...field}
// 							mode="multiple"
// 							placeholder="Select topics"
// 							options={items}
// 							status={errors.topic ? 'error' : undefined}
// 							onChange={field.onChange}
// 							value={field.value}
// 						/>
// 					)}
// 				/>
// 			</FieldGroup>
// 			{/* <FieldGroup margin="03" title="Topic" error={errors?.topic?.message}>
// 				<Select
// 					placeholder="Enter your topic"
// 					size="middle"
// 					status={errors?.topic && 'error'}
// 					{...register('topic')}
// 				/>
// 			</FieldGroup> */}
// 			<Button onClick={handleSubmit(onSubmit)}>Submit</Button>
// 		</WrapperCard>
// 	);
// };

import { Select, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { Input } from '@/ui-components/Input';

// Schema
const schema = z.object({
	topic: z.array(z.string()).min(1, 'Select at least one topic'),
	description: z.string().min(1, 'Description is required'),
});

type FormValues = z.infer<typeof schema>;

// Sample select options
const items = [
	{ value: 'react', label: 'React' },
	{ value: 'vue', label: 'Vue' },
	{ value: 'angular', label: 'Angular' },
];

export const CreateCollections = () => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: { topic: [], description: '' },
	});

	const onSubmit = (data: FormValues) => {
		console.log('Form data:', data);
	};

	return (
		<WrapperCard>
			<FieldGroup margin="03" title="Description" error={errors?.description?.message}>
				<Input
					placeholder="Enter your description"
					size="middle"
					status={errors?.description && 'error'}
					{...register('description')}
				/>
			</FieldGroup>
			<FieldGroup margin="03" title="Topic" error={errors?.topic?.message}>
				<Controller
					name="topic"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							mode="multiple"
							placeholder="Select topics"
							options={items}
							status={errors.topic ? 'error' : undefined}
							onChange={field.onChange}
							value={field.value}
						/>
					)}
				/>
			</FieldGroup>

			<Button type="primary" onClick={handleSubmit(onSubmit)} style={{ marginTop: 16 }}>
				Submit
			</Button>
		</WrapperCard>
	);
};
