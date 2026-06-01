import { useNavigate as useNavigateReact } from 'react-router-dom';

export const useNavigate = () => {
	const navigate = useNavigateReact();

	return {
		navWithQueryParams: (pathname: string) =>
			navigate({
				pathname,
				search: location.search,
			}),
	};
};
