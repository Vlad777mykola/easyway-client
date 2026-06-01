import { Tooltip as TooltipAnt } from 'antd';
import type { TooltipProps } from 'antd';

export const Tooltip = ({ ...props }: TooltipProps) => {
	return <TooltipAnt {...props} />;
};
