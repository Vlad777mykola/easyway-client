/* eslint-disable react-refresh/only-export-components */
import { useState, useLayoutEffect, ReactNode, createContext, useContext } from 'react';

type ScreenSizeData = {
	isMobile: boolean;
	isLaptop: boolean;
	isDesktop: boolean;
};

type ScreenSizeProviderType = {
	children: ReactNode;
};

const WIDTH_SCREEN = window.innerWidth;

const ScreenSizeContext = createContext<ScreenSizeData>({
	isMobile: false,
	isLaptop: false,
	isDesktop: false,
});

export const ScreenSizeProvider = ({ children }: ScreenSizeProviderType) => {
	const [typeOfScreen, setTypeOfScreen] = useState<ScreenSizeData>({
		isMobile: false,
		isLaptop: false,
		isDesktop: false,
	});

	useLayoutEffect(() => {
		setTypeOfScreen({
			isMobile: WIDTH_SCREEN >= 320 && WIDTH_SCREEN <= 480,
			isLaptop: WIDTH_SCREEN >= 481 && WIDTH_SCREEN <= 1024,
			isDesktop: WIDTH_SCREEN >= 1201,
		});
	}, []);

	return (
		<ScreenSizeContext.Provider value={{ ...typeOfScreen }}>{children}</ScreenSizeContext.Provider>
	);
};

export const usePlatformData = () => {
	const context = useContext(ScreenSizeContext);
	return context;
};
