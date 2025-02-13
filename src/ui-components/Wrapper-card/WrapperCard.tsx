import { ReactNode } from 'react';
import styles from './wrapperCard.module.css';
import { Icon } from '@/ui-components/Icon';
import { classes } from '@/shared/utils/classes';

export const WrapperCard = ({
	children,
	fullScreen,
	setFullScreen,
}: {
	children: ReactNode;
	fullScreen?: boolean;
	setFullScreen?: () => void;
}) => {
	return (
		<div
			className={classes(styles.wrapperCard, {
				[styles.fullScreen]: fullScreen,
			})}
		>
			{fullScreen && (
				<div className={styles.icon} onClick={() => setFullScreen?.()}>
					<Icon icon={fullScreen ? 'exitFullScreen' : 'fullScreen'} variant="success" size="l" />
				</div>
			)}
			{children}
		</div>
	);
};
