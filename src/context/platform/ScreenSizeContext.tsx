/* eslint-disable react-refresh/only-export-components */
import { useState, useLayoutEffect } from 'react';
import type { ScreenSizeData, ScreenSizeProviderType } from './types';
import { ScreenSizeContext } from '.';

export const WIDTH_SCREEN = window.innerWidth;

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
	}, [typeOfScreen]);

	return (
		<ScreenSizeContext.Provider value={{ ...typeOfScreen }}>{children}</ScreenSizeContext.Provider>
	);
};
