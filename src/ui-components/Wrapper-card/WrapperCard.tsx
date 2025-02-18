import { ReactNode, useContext } from 'react';
import styles from './wrapperCard.module.css';
import { Icon } from '@/ui-components/Icon';
import { classes } from '@/shared/utils/classes';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';

export const WrapperCard = ({
	children,
	fullScreen,
	setFullScreen,
}: {
	children: ReactNode;
	fullScreen?: boolean;
	setFullScreen?: () => void;
}) => {
	const { isMobile } = useContext(ScreenSizeContext);

	return (
		<div
			className={classes(styles.wrapperCard, {
				[styles.fullScreen]: fullScreen,
			})}
		>
			{isMobile && setFullScreen && (
				<div className={styles.icon} onClick={() => setFullScreen?.()}>
					<Icon icon={fullScreen ? 'exitFullScreen' : 'fullScreen'} variant="primary" size="l" />
				</div>
			)}
			{children}
		</div>
	);
};
