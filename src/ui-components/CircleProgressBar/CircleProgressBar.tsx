import { classes } from '@/shared/utils/classes';
import styles from './circleProgressBar.module.css';
import { SizeType, VariantType } from '../parameters/parameters';

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
	indicatorCap?: string;
	label?: string;
	spinnerMode?: boolean;
	spinnerSpeed?: number;
}) => {
	const sizeTypes = {
		xs: 90,
		s: 120,
		m: 150,
		l: 180,
		xl: 200,
	};
	const trackWidth = 10;
	const trackColor = `#d8d8d8`;
	const indicatorWidth = 10;
	const indicatorColor = `rgb(25, 118, 210)`;

	const center = sizeTypes[size] / 2,
		radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
		dashArray = 2 * Math.PI * radius,
		dashOffset = dashArray * ((100 - progress) / 100);

	let hideLabel = sizeTypes['m'] < 100 || !label.length || spinnerMode ? true : false;

	return (
		<>
			<div
				className={styles.svgPiWrapper}
				style={{ width: sizeTypes['m'], height: sizeTypes[size] }}
			>
				<svg className={styles.svgPi} style={{ width: sizeTypes[size], height: sizeTypes[size] }}>
					<circle
						className={styles.svgPiTrack}
						cx={center}
						cy={center}
						fill="transparent"
						r={radius}
						stroke={trackColor}
						strokeWidth={trackWidth}
					/>
					<circle
						className={classes(styles.svgPiIndicator, styles.svgPiIndicator, {
							[styles.svgPiIndicatorSpinner]: spinnerMode,
						})}
						style={{ animationDuration: spinnerSpeed * 1000 }}
						cx={center}
						cy={center}
						fill="transparent"
						r={radius}
						stroke={indicatorColor}
						strokeWidth={indicatorWidth}
						strokeDasharray={dashArray}
						strokeDashoffset={dashOffset}
						strokeLinecap={indicatorCap}
					/>
				</svg>

				{!hideLabel && (
					<div className={styles.svgPiLabel}>
						{!spinnerMode && (
							<span className={styles.svgPiLabelProgress}>
								{`${progress > 100 ? 100 : progress}%`}
							</span>
						)}
					</div>
				)}
			</div>
		</>
	);
};
