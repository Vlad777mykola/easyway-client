import { createContext, useState, ReactNode, useEffect } from 'react';

type ScreenSizeData = {
	screenWidth: number;
	screenHeight: number;
};

type ScreenSizeProviderType = {
	children: ReactNode;
};

const ScreenSizeContext = createContext<ScreenSizeData>({
	screenWidth: 0,
	screenHeight: 0,
});

const ScreenSizeProvider = ({ children }: ScreenSizeProviderType) => {
	const [screenSize, setScreenSize] = useState<ScreenSizeData>({
		screenWidth: 0,
		screenHeight: 0,
	});

	useEffect(() => {
		setScreenSize({
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
		});
	}, []);

	return (
		<ScreenSizeContext.Provider
			value={{ screenWidth: screenSize.screenWidth, screenHeight: screenSize.screenHeight }}
		>
			{children}
		</ScreenSizeContext.Provider>
	);
};

export { ScreenSizeContext, ScreenSizeProvider };
