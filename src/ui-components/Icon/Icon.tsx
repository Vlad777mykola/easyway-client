import { ReactNode } from 'react';
import { Size, Variant } from '@/common_ui/parameters';
import type { SizeType, VariantType } from '@/common_ui/parameters';
import styles from './icon.module.css';
import { classes } from '@/common_utils/classes/classes';

type Props = {
	IconSVG: ReactNode;
	size?: SizeType;
	variant?: VariantType;
};

const Icon = ({ IconSVG, size = 'm', variant = 'primary' }: Props) => {
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

export default Icon;
