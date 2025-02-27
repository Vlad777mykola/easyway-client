import { useEffect, useState } from 'react';
import { CountUp } from '../CountUp';
import { classes } from '@/shared/utils/classes';
import { Size, SizeType, Variant, VariantType } from '../parameters/parameters';
import styles from './circleProgressBar.module.css';

const SIZE_TYPES = {
	xs: 50,
	s: 80,
	m: 120,
	l: 140,
	xl: 170,
};

const TRACK_WIDTH = 10;
const INDICATOR_WIDTH = 8;

export const CircleProgressBar = ({
	progress,
	size = 'm',
	variant = 'primary',
	indicatorCap = `round`,
	label = `Loading...`,
	spinnerMode = false,
	spinnerSpeed = 1,
}: {
	progress: number;
	size?: SizeType;
	variant?: VariantType;
	indicatorCap?: 'round' | 'inherit' | 'butt' | 'square';
	label?: string;
	spinnerMode?: boolean;
	spinnerSpeed?: number;
}) => {
	const center = SIZE_TYPES[size] / 2,
		radius = center - (TRACK_WIDTH > INDICATOR_WIDTH ? TRACK_WIDTH : INDICATOR_WIDTH),
		dashArray = 2 * Math.PI * radius,
		dashOffset = dashArray * ((100 - progress) / 100);

	let hideLabel = size === 'xs' || size === 's' || !label.length || spinnerMode ? true : false;

	const [style, setStyle] = useState({});

	useEffect(() => {
		const timeout = setTimeout(() => {
			const newStyle = {
				opacity: 1,
				strokeDasharray: dashArray,
				strokeDashoffset: dashOffset,
			};

			setStyle(newStyle);
		}, 200);

		return () => clearTimeout(timeout);
	}, [progress]);

	return (
		<>
			<div
				className={classes(styles.svgPiWrapper, {
					[styles[Size[size]]]: !!size,
				})}
			>
				<svg
					className={classes(styles.svgPi, {
						[styles[Size[size]]]: !!size,
					})}
				>
					<circle
						className={styles.svgPiTrack}
						cx={center}
						cy={center}
						fill="transparent"
						r={radius}
						strokeWidth={TRACK_WIDTH}
					/>
					<circle
						className={classes(styles.svgPiIndicator, {
							[styles.svgPiIndicatorSpinner]: spinnerMode,
							[styles[Variant[variant]]]: !!variant,
						})}
						style={{ ...style, animationDuration: `${spinnerSpeed * 1000}` }}
						cx={center}
						cy={center}
						fill="transparent"
						r={radius}
						strokeWidth={INDICATOR_WIDTH}
						strokeLinecap={indicatorCap}
					/>
				</svg>

				{!hideLabel && (
					<div className={styles.svgPiLabel}>
						{!spinnerMode && (
							<span className={styles.svgPiLabelProgress}>
								<CountUp end={progress > 100 ? 100 : progress} duration={1500} />%
							</span>
						)}
					</div>
				)}
			</div>
		</>
	);
};
