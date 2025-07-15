import { Dispatch, type SetStateAction } from 'react';
import { Modal } from '@/ui-components/Modal';
import { Typography } from '@/ui-components/Typography';
import styles from './modalForm.module.css';
import { AddWordForm } from '../add-word-form/AddWordForm';
import { CreateWordDto } from '@/shared/api/generated/model';

export const ModalForm = ({
	isModalOpen,
	setTableWords,
	handleCancel,
	wordName,
	tableWords,
}: {
	isModalOpen: boolean;
	wordName: string;
	tableWords: CreateWordDto[];
	setTableWords: Dispatch<SetStateAction<CreateWordDto[]>>;
	handleCancel: () => void;
}) => {
	return (
		<Modal
			title={
				<Typography.Title className={styles.titleModal} level={2}>
					Edit Word
				</Typography.Title>
			}
			closable={{ 'aria-label': 'Custom Close Button' }}
			open={isModalOpen}
			onCancel={handleCancel}
			footer={null}
			mask={false}
		>
			<AddWordForm tableWords={tableWords} setTableWords={setTableWords} wordName={wordName} />
		</Modal>
	);
};
