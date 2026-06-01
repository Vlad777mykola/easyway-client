/* eslint-disable css-modules/no-unused-class */
import { useEffect, useState } from 'react';
import { classes } from '@/ui-design-atoms/classes';
import styles from './circleProgressBar.module.css';
import { Size, SizeType, VariantType } from '@/ui-design-atoms/parameters';
import { CountUp } from '../CountUp';

const SIZE_TYPES = {
	xs: 50,
	s: 80,
	m: 120,
	l: 140,
	xl: 170,
};
const TRACK_WIDTH = 10;
const INDICATOR_WIDTH = 8;
const HUNDRED_PERCENT = 100;
const SPEED = 1000;
const COUNT_UP_DURATION = 1500;

export const CircleProgressBar = ({
	progress = 0,
	resolved = 0,
	untouched = 0,
	size = 'm',
	indicatorCap = `round`,
	label = `Loading...`,
	spinnerMode = false,
	spinnerSpeed = 1,
}: {
	progress?: number;
	resolved?: number;
	untouched?: number;
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
		dashOffsetResolved = dashArray * ((100 - resolved) / 100),
		dashOffsetUntouched = dashArray * ((100 - untouched) / 100),
		dashOffset = dashArray * ((100 - progress) / 100);

	let hideLabel =
		size === Size.xs || size === Size.s || !label.length || spinnerMode ? true : false;

	const [style, setStyle] = useState({});
	const [resolvedStyle, setResolvedStyle] = useState({});
	const [untouchedStyle, setUntouchedStyle] = useState({});

	useEffect(() => {
		const timeout = setTimeout(() => {
			const newStyle = {
				opacity: 1,
				strokeDasharray: dashArray,
				strokeDashoffset: dashOffset,
			};

			const newResolvedStyle = {
				opacity: 1,
				strokeDasharray: dashArray,
				strokeDashoffset: dashOffsetResolved,
			};

			const newUntouchedStyle = {
				opacity: 1,
				strokeDasharray: dashArray,
				strokeDashoffset: dashOffsetUntouched,
			};

			setStyle(newStyle);
			setResolvedStyle(newResolvedStyle);
			setUntouchedStyle(newUntouchedStyle);
		}, 200);

		return () => clearTimeout(timeout);
	}, [
		progress,
		resolved,
		untouched,
		dashArray,
		dashOffset,
		dashOffsetResolved,
		dashOffsetUntouched,
	]);

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
						className={classes(styles.svgPiIndicator, styles.error, {
							[styles.svgPiIndicatorSpinner]: spinnerMode,
						})}
						style={{
							...untouchedStyle,
							animationDuration: `${spinnerSpeed * SPEED}`,
						}}
						cx={center}
						cy={center}
						fill="transparent"
						r={radius}
						strokeWidth={INDICATOR_WIDTH}
						strokeLinecap={indicatorCap}
					/>
					<circle
						className={classes(styles.svgPiIndicator, styles.primary, {
							[styles.svgPiIndicatorSpinner]: spinnerMode,
						})}
						style={{
							...style,
							animationDuration: `${spinnerSpeed * SPEED}`,
						}}
						cx={center}
						cy={center}
						fill="transparent"
						r={radius}
						strokeWidth={INDICATOR_WIDTH}
						strokeLinecap={indicatorCap}
					/>
					<circle
						className={classes(styles.svgPiIndicator, styles.success, {
							[styles.svgPiIndicatorSpinner]: spinnerMode,
						})}
						style={{
							...resolvedStyle,
							animationDuration: `${spinnerSpeed * SPEED}`,
						}}
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
								<CountUp
									end={progress > HUNDRED_PERCENT ? HUNDRED_PERCENT : resolved}
									duration={COUNT_UP_DURATION}
								/>
								%
							</span>
						)}
					</div>
				)}
			</div>
		</>
	);
};
