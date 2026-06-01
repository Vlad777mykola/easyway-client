import styles from './secondTab.module.css';

export const SecondTab = () => {
	// const { mutate, isPending, error } = useWordsMutation(() => {
	// 	clearForm();
	// });

	// const {
	// 	reset,
	// 	control,
	// 	handleSubmit,
	// 	formState: { errors },
	// } = useForm<WordsFormValues>({
	// 	resolver: zodResolver(schema),
	// });

	// const onSubmit = (data: WordsFormValues) => {
	// 	mutate(data);
	// };

	// const clearForm = () => {
	// 	reset();
	// };

	return (
		<div className={styles.secondTab}>
			{/* <Typography.Title className={styles.title} level={2}>
				Create new collection
			</Typography.Title> */}
			{/* <FieldGroup marginY="03" title="Title" error={errors?.description?.message}>
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
			</div> */}
		</div>
	);
};
