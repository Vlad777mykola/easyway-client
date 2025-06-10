import { ReactNode } from 'react';

export type ScreenSizeData = {
	isMobile: boolean;
	isLaptop: boolean;
	isDesktop: boolean;
};

export type ScreenSizeProviderType = {
	children: ReactNode;
};
