import { ReactNode, useLayoutEffect } from 'react';
import { Icon } from '@/ui-components/Icon';
import { classes } from '@/ui-design-atoms/classes';
import { usePlatformData } from '@/context/platform';
import { useCommonStore } from '@/store/common';

import styles from './wrapperCard.module.css';

export const WrapperCard = ({
	children,
	id = '',
	goBack,
}: {
	children: ReactNode;
	id?: string;
	goBack?: () => void;
}) => {
	const { isMobile } = usePlatformData();
	const fullScreen = useCommonStore.use.fullExerciseScreen();
	const setFullScreen = useCommonStore.use.setFullScreen();

	useLayoutEffect(() => {
		if (isMobile && id && !fullScreen) {
			setFullScreen?.(true);
		}
	}, [id, isMobile, fullScreen, setFullScreen]);
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
