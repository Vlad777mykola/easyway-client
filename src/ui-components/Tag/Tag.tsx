import React from 'react';
import { Tag as TagAnt } from 'antd';
import type { TagProps } from 'antd';

export const Tag = ({ onClose, ...props }: TagProps) => {
	const handleClose = (e: React.MouseEvent<HTMLElement>) => {
		if (onClose) {
			e.preventDefault();
			onClose(e);
		}
	};

	return <TagAnt {...props} onClose={handleClose} />;
};
