/* eslint-disable css-modules/no-unused-class */
import { useState, ReactNode } from 'react';
import { Icon } from '@/ui-components/Icon';
import { classes } from '@/ui-design-atoms/classes';
import { Button } from '@/ui-components/Button/Button';
import { CircleButton } from '@/ui-components/CircleButton';
import type { IconVariantsType } from '@/ui-components/Icon/Icon';

import styles from './menu.module.css';

const Side = {
	left: 'left',
	right: 'right',
};

type SideType = keyof typeof Side;

type Props = {
	Items: ReactNode;
	side: SideType;
	icon?: IconVariantsType;
	text?: string;
	overrideOnClick?: () => void;
};

export const Menu = ({ Items, side, icon = 'menu', text, overrideOnClick }: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	const [notShow, setNotShow] = useState<boolean>(true);

	const onClick = () => {
		if (overrideOnClick) {
			overrideOnClick();
			return;
		}
		setOpen(!open);
		setNotShow(false);
	};

	const handleCloseMenu = () => {
		setOpen(false);
		setNotShow(false);
	};

	return (
		<>
			<div
				className={classes(styles.overlay, {
					[styles.openOverlay]: open,
					[styles.closeOverlay]: !open,
				})}
				onClick={handleCloseMenu}
			></div>
			{!notShow && (
				<div
					className={classes(styles.wrapper, {
						[styles.openMenu]: open,
						[styles.notShowMenu]: notShow,
						[styles.closeMenu]: !open && !notShow,
						[styles[Side[side]]]: !!side,
					})}
				>
					<span
						className={classes(styles.menuButton, {
							[styles.showMenuItem]: open,
							[styles.closeMenuItem]: !open && !notShow,
							[styles.menuButtonRight]: side === 'right',
							[styles.menuButtonLeft]: side === 'left',
						})}
						onClick={handleCloseMenu}
					>
						<Icon icon="close" />
					</span>
					{Items}
				</div>
			)}
			{text && (
				<Button onClick={onClick} className={styles.button} shape="round" size="middle">
					{text} <Icon icon={icon} size="s" />
				</Button>
			)}
			{!text && (
				<CircleButton size="middle" variant="filled" onClick={onClick}>
					<Icon icon={icon} size="s" />
				</CircleButton>
			)}
		</>
	);
};
