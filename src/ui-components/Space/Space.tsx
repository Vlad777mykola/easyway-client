import { ReactNode } from 'react';
import { Space as SpaceAntd } from 'antd';
import type { SpaceProps } from 'antd';

export const Space = ({ children, ...props }: { children: ReactNode } & SpaceProps) => {
	return <SpaceAntd {...props}>{children}</SpaceAntd>;
};

Space.Compact = SpaceAntd.Compact;
