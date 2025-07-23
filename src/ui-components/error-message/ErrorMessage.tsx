import styles from './errorMessage.module.css';

export const ErrorMessage = ({ error }: { error: string }) => {
	return <span className={styles.errorMessage}>{error}</span>;
};
