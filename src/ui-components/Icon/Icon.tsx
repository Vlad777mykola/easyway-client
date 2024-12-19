/* eslint-disable css-modules/no-unused-class */
import { ReactNode } from 'react';
import { Size, Variant } from '@/common-ui/parameters';
import type { SizeType, VariantType } from '@/common-ui/parameters';
import { classes } from '@/utils/classes';
import styles from './icon.module.css';

type Props = {
	IconSVG: ReactNode;
	size?: SizeType;
	variant?: VariantType;
};

export const Icon = ({ IconSVG, size = 'm', variant = 'primary' }: Props) => {
	return (
		<div
			className={classes({
				[styles[Size[size]]]: !!size,
				[styles[Variant[variant]]]: !!variant,
			})}
		>
			{IconSVG}
		</div>
	);
};
