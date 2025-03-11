import { ReactNode, useContext, useLayoutEffect } from 'react';
import styles from './wrapperCard.module.css';
import { Icon } from '@/ui-components/Icon';
import { classes } from '@/shared/utils/classes';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';
import { useCommonStore } from '@/store/common';

export const WrapperCard = ({
	children,
	id = '',
	goBack,
}: {
	children: ReactNode;
	id: string;
	goBack?: () => void;
}) => {
	const { isMobile } = useContext(ScreenSizeContext);
	const fullScreen = useCommonStore.use.fullExerciseScreen();
	const setFullScreen = useCommonStore.use.setFullScreen();

	useLayoutEffect(() => {
		if (isMobile && id && !fullScreen) {
			setFullScreen?.(true);
		}
	}, [id]);

	return (
		<div
			className={classes(styles.wrapperCard, {
				[styles.fullScreen]: fullScreen,
			})}
		>
			{isMobile && goBack && (
				<div className={styles.icon} onClick={() => goBack?.()}>
					<Icon icon={'close'} variant="primary" size="l" />
				</div>
			)}
			{children}
		</div>
	);
};
