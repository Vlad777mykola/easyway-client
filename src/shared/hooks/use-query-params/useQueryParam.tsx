import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export const useQueryParam = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

	const addAllParams = (params: Record<string, unknown>) => {
		const newParams = new URLSearchParams(location.search);
		Object.entries(params).forEach(([key, value]) => {
			newParams.set(key, String(value));
		});
		navigate({ search: newParams.toString() }, { replace: true });
	};

	const addParam = (key: string, value: unknown) => {
		const newParams = new URLSearchParams(location.search);
		newParams.set(key, String(value));
		navigate({ search: newParams.toString() }, { replace: true });
	};

	const getParam = (
		key: string,
		type: 'string' | 'boolean' | 'number' = 'string',
	): boolean | number | string => {
		const param = params.get(key);

		switch (type) {
			case 'boolean':
				return param === 'true';
			case 'number':
				return param ? Number(param) : 0;
			default:
				return param ?? '';
		}
	};

	return {
		addParam,
		getParam,
		addAllParams,
	};
};
