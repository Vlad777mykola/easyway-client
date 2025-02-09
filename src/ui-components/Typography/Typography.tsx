import { Typography as TypographyAnt } from 'antd';
import type { TextProps } from 'antd/lib/typography/Text';
const { Text } = TypographyAnt;

export const Typography = ({ children, ...props }: TextProps) => {
	return <Text {...props}>{children}</Text>;
};
