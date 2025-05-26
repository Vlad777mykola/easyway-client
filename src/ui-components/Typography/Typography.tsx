import React, { ReactNode } from 'react';
import { Typography as TypographyAnt } from 'antd';
import type { TextProps } from 'antd/lib/typography/Text';
import type { TitleProps } from 'antd/lib/typography/Title';
import { margin, MarginProps } from '@/ui-design-atoms/margin';
import { classes } from '@/shared/utils/classes';

const { Text, Title } = TypographyAnt;

export const TextComponent = ({ children, ...props }: TextProps & MarginProps) => {
	return (
		<Text className={classes(margin(props))} {...props}>
			{children}
		</Text>
	);
};

export const TitleComponent = ({ children, ...props }: TitleProps & MarginProps) => {
	return (
		<Title className={classes(margin(props))} {...props}>
			{children}
		</Title>
	);
};

interface TypographyProps {
	children: ReactNode;
}

interface TypographyType extends React.FC<TypographyProps> {
	Text: React.FC<TextProps & MarginProps>;
	Title: React.FC<TitleProps & MarginProps>;
}

const Typography: TypographyType = ({ children }) => {
	return <>{children}</>;
};

Typography.Text = TextComponent;
Typography.Title = TitleComponent;

export { Typography };
