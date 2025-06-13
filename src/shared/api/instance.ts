import axios from 'axios';

export const apiInstance = async <T>({
	url,
	method,
	data,
	signal,
	headers,
}: {
	url: string;
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
	data?: unknown;
	signal?: AbortSignal;
	headers?: Record<string, string>;
}): Promise<T> => {
	const response = await axios({
		baseURL: 'http://localhost:3000',
		url,
		method,
		data,
		signal,
		headers,
	});

	return response.data;
};
