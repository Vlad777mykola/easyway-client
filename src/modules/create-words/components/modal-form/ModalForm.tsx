import { Modal } from '@/ui-components/Modal';
import { Typography } from '@/ui-components/Typography';
import styles from './modalForm.module.css';
import { AddWordForm } from '../add-word-form/AddWordForm';

export const ModalForm = ({ isModalOpen, setTableWords, handleCancel, filledData }) => {
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
			<AddWordForm setTableWords={setTableWords} isModal={true} filledData={filledData} />
		</Modal>
	);
};
