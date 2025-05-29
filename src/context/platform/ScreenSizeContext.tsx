import { createContext, useState, ReactNode, useContext, useLayoutEffect } from 'react';

type ScreenSizeData = {
	isMobile: boolean;
	isLaptop: boolean;
	isDesktop: boolean;
};

type ScreenSizeProviderType = {
	children: ReactNode;
};

const ScreenSizeContext = createContext<ScreenSizeData>({
	isMobile: false,
	isLaptop: false,
	isDesktop: false,
});

const WIDTH_SCREEN = window.innerWidth;

export const ScreenSizeProvider = ({ children }: ScreenSizeProviderType) => {
	const [typeOfScreen, setTypeOfScreen] = useState<ScreenSizeData>({
		isMobile: false,
		isLaptop: false,
		isDesktop: false,
	});

	useLayoutEffect(() => {
		if (WIDTH_SCREEN >= 320 && WIDTH_SCREEN <= 480) {
			setTypeOfScreen({
				...typeOfScreen,
				isMobile: true,
			});
		}

		if (WIDTH_SCREEN >= 481 && WIDTH_SCREEN <= 1024) {
			setTypeOfScreen({
				...typeOfScreen,
				isLaptop: true,
			});
		}

		if (WIDTH_SCREEN >= 1201) {
			setTypeOfScreen({
				...typeOfScreen,
				isDesktop: true,
			});
		}
	}, []);

	return (
		<ScreenSizeContext.Provider value={{ ...typeOfScreen }}>{children}</ScreenSizeContext.Provider>
	);
};

export const usePlatformData = () => {
	const context = useContext(ScreenSizeContext);
	return context;
};
