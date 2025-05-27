/* eslint-disable css-modules/no-unused-class */
import { Size, Variant } from '@/shared/constants/parameters';
import type { SizeType, VariantType } from '@/shared/constants/parameters';
import { classes } from '@/ui-design-atoms/classes';

import {
	CloseOutlined,
	MenuOutlined,
	LoginOutlined,
	UserOutlined,
	FacebookOutlined,
	InstagramOutlined,
	YoutubeOutlined,
	TwitterOutlined,
	LeftOutlined,
	RightOutlined,
	SearchOutlined,
	ClearOutlined,
	FilterOutlined,
	CheckOutlined,
	FullscreenOutlined,
	FullscreenExitOutlined,
	SmileOutlined,
	InfoCircleOutlined,
	StockOutlined,
	FieldTimeOutlined,
	TrophyOutlined,
	QuestionOutlined,
	ClockCircleOutlined,
	FrownOutlined,
	PlusOutlined,
} from '@ant-design/icons';

import styles from './icon.module.css';

const IconVariants = {
	close: CloseOutlined,
	menu: MenuOutlined,
	login: LoginOutlined,
	user: UserOutlined,
	facebook: FacebookOutlined,
	instagram: InstagramOutlined,
	youtube: YoutubeOutlined,
	twitter: TwitterOutlined,
	left: LeftOutlined,
	right: RightOutlined,
	search: SearchOutlined,
	clear: ClearOutlined,
	filter: FilterOutlined,
	check: CheckOutlined,
	fullScreen: FullscreenOutlined,
	exitFullScreen: FullscreenExitOutlined,
	smile: SmileOutlined,
	info: InfoCircleOutlined,
	stock: StockOutlined,
	time: FieldTimeOutlined,
	trophy: TrophyOutlined,
	question: QuestionOutlined,
	clock: ClockCircleOutlined,
	frown: FrownOutlined,
	plus: PlusOutlined,
};

export type IconVariantsType = keyof typeof IconVariants;

type Props = {
	icon: IconVariantsType;
	size?: SizeType;
	variant?: VariantType;
};

export const Icon = ({ icon, size = 'm', variant = 'primary' }: Props) => {
	const IconComponent = IconVariants[icon];
	return (
		<div
			className={classes({
				[styles[Size[size]]]: !!size,
				[styles[Variant[variant]]]: !!variant,
			})}
		>
			<IconComponent />
		</div>
	);
};
