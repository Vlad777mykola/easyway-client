/* eslint-disable css-modules/no-unused-class */
import { useEffect, useState } from 'react';
import { CountUp } from '../CountUp';
import { Size, Variant } from '../parameters/parameters';
import type { SizeType, VariantType } from '../parameters/parameters';
import { classes } from '@/shared/utils/classes';
import styles from './standartProgressBar.module.css';

const COUNT_UP_DURATION = 1500;

export const StandardProgressBar = ({
	progress,
	size = 'm',
	variant = 'primary',
}: {
	progress: number;
	size?: SizeType;
	variant?: VariantType;
}) => {
	const [style, setStyle] = useState({});

	useEffect(() => {
		const timeout = setTimeout(() => {
			const newStyle = {
				opacity: 1,
				width: `${progress}%`,
			};

			setStyle(newStyle);
		}, 200);

		return () => clearTimeout(timeout);
	}, [progress]);

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
				<CountUp end={progress} duration={COUNT_UP_DURATION} />%
			</div>
		</div>
	);
};
