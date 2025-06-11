/* eslint-disable css-modules/no-unused-class */
/* eslint-disable react-refresh/only-export-components */
import { classes } from '@/ui-design-atoms/classes';
import styles from './styles.module.css';

const DEFAULT_CSS = '01';
const MARGIN = {
	'01': '01',
	'02': '02',
	'03': '03',
	'04': '04',
	'05': '05',
	'06': '06',
	'07': '07',
	'08': '08',
	'09': '09',
	'010': '010',
};
type MarginType = keyof typeof MARGIN;
export type MarginProps = {
	margin?: MarginType;
	marginY?: MarginType;
	marginX?: MarginType;
	marginTop?: MarginType;
	marginBottom?: MarginType;
	marginRight?: MarginType;
	marginLeft?: MarginType;
};

export const margin = ({
	margin,
	marginY,
	marginX,
	marginTop,
	marginBottom,
	marginRight,
	marginLeft,
}: MarginProps) => {
	const currentMarginTop = marginTop || marginY || margin;
	const currentMarginBottom = marginBottom || marginY || margin;
	const currentMarginLeft = marginLeft || marginX || margin;
	const currentMarginRight = marginRight || marginX || margin;
	return classes({
		[styles[`marginTop${MARGIN[currentMarginTop || DEFAULT_CSS]}`]]: !!currentMarginTop,
		[styles[`marginBottom${MARGIN[currentMarginBottom || DEFAULT_CSS]}`]]: !!currentMarginBottom,
		[styles[`marginLeft${MARGIN[currentMarginLeft || DEFAULT_CSS]}`]]: !!currentMarginLeft,
		[styles[`marginRight${MARGIN[currentMarginRight || DEFAULT_CSS]}`]]: !!currentMarginRight,
	});
};
