/* eslint-disable css-modules/no-unused-class */
import { useEffect, useState } from 'react';
import { Size, Variant } from '@/ui-design-atoms/parameters';
import type { SizeType, VariantType } from '@/ui-design-atoms/parameters';
import { classes } from '@/ui-design-atoms/classes';
import { CountUp } from '../CountUp';

import styles from './standartProgressBar.module.css';

const COUNT_UP_DURATION = 1500;

export const StandardProgressBar = ({
	progress,
	size = 'm',
	variant = 'primary',
	fullwidth = false,
}: {
	progress: number;
	size?: SizeType;
	variant?: VariantType;
	fullwidth?: boolean;
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
				[styles.fullwidth]: fullwidth,
			})}
		>
			<div
				className={classes(styles.progressDone, {
					[styles[Variant[variant]]]: !!variant,
				})}
				style={style}
			>
				{progress > 0 && (
					<>
						<CountUp end={progress} duration={COUNT_UP_DURATION} />%
					</>
				)}
			</div>
		</div>
	);
};
