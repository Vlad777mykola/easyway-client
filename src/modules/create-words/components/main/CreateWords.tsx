import { useState } from 'react';
import { Typography } from '@/ui-components/Typography';
import { Button } from '@/ui-components/Button';
import { AddWordForm } from '../add-word-form/AddWordForm';
import { AddXmlFile } from '../add-xml-file/AddXmlFile';
import { AddJsonFile } from '../add-json-file/AddJsonFile';
import { TableWords } from '@/features/table-words';
import { wordsApi } from '@/shared/api/generated';
import { ApiError } from '@/shared/api/types';
import type { CreateWordDto } from '@/shared/api/generated/model';

import styles from './createWords.module.css';
import { ModalForm } from '../modal-form/ModalForm';

export const CreateWords = () => {
	const [tableWords, setTableWords] = useState<CreateWordDto[]>([]);
	const isDisabled = tableWords.length === 0;

	const { mutate, error } = wordsApi.useWordsControllerCreateWords<ApiError>({
		mutation: {
			onError: (error) => {
				console.error('Error creating filter:', error);
			},
		},
	});

	const onSubmit = (data: CreateWordDto[]) => {
		mutate({ data: { words: data } });
	};

	return (
		<div className={styles.container}>
			<Typography.Title className={styles.title} level={2}>
				Create new word
			</Typography.Title>
			<div className={styles.formContent}>
				<AddWordForm setTableWords={setTableWords} tableWords={tableWords} />
				<AddXmlFile setTableWords={setTableWords} />
				<AddJsonFile setTableWords={setTableWords} />
			</div>
			<TableWords
				tableWords={tableWords}
				setTableWords={setTableWords}
				isEdit
				ModalForm={ModalForm}
			/>
			{error && <Typography.Text type="danger">{error?.message}</Typography.Text>}
			<div className={styles.submitButton}>
				<Button
					type="primary"
					shape="round"
					disabled={isDisabled}
					onClick={() => onSubmit(tableWords)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
