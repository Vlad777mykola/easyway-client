import { useState } from 'react';
import { Size, Variant } from '../parameters/parameters';
import type { SizeType, VariantType } from '../parameters/parameters';
import { classes } from '@/shared/utils/classes';
import styles from './customProgress.module.css';

export const CustomProgress = ({
	done,
	size = 'm',
	variant = 'primary',
}: {
	done: number;
	size?: SizeType;
	variant?: VariantType;
}) => {
	const [style, setStyle] = useState({});

	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${done}%`,
		};

		setStyle(newStyle);
	}, 200);
	return (
		<div
			className={classes(styles.progress, {
				[styles[Size[size]]]: !!size,
			})}
		>
			<div
				className={classes(styles.progressDone, {
					[styles[Variant[variant]]]: !!variant,
				})}
				style={style}
			>
				{done}%
			</div>
		</div>
	);
};
