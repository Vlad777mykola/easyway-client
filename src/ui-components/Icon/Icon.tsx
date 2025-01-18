/* eslint-disable css-modules/no-unused-class */
import { Size, Variant } from '@/common-ui/parameters';
import type { SizeType, VariantType } from '@/common-ui/parameters';
import { classes } from '@/shared/utils/classes';

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
