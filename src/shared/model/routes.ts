import 'react-router-dom';

export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	ADMIN: '/admin',
	BOARD: '/boards/:boardId',
} as const;

export type PathParams = {
	[ROUTES.BOARD]: {
		boardId: string;
	};
};

declare module 'react-router-dom' {
	interface Register {
		params: PathParams;
	}
}
