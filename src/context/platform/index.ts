import { createContext, useContext } from 'react';
import { ScreenSizeData } from './types';

export const ScreenSizeContext = createContext<ScreenSizeData>({
	isMobile: false,
	isLaptop: false,
	isDesktop: false,
});

export const usePlatformData = () => {
	const context = useContext(ScreenSizeContext);
	return context;
};
