import { createContext, useState, ReactNode, useEffect } from 'react';

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

const ScreenSizeProvider = ({ children }: ScreenSizeProviderType) => {
	const [typeOfScreen, setTypeOfScreen] = useState<ScreenSizeData>({
		isMobile: false,
		isLaptop: false,
		isDesktop: false,
	});

	useEffect(() => {
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

export { ScreenSizeContext, ScreenSizeProvider };
