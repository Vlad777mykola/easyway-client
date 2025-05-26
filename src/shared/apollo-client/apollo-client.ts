import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { API_URL } from '@/shared/constants/urls';
import { router } from '@/router/Router';

const EXECUTED_ROUTES = ['/signin', '/signup'];

const logoutLink = onError((error: ErrorResponse) => {
	const statusCode =
		error.graphQLErrors?.[0]?.extensions?.originalError &&
		(error.graphQLErrors[0].extensions.originalError as { statusCode: number })?.statusCode;

	if (statusCode === 401) {
		if (!EXECUTED_ROUTES.includes(window.location.pathname)) {
			router.navigate('/signin');
			client.resetStore();
		}
	}
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql`, credentials: 'include' });

export const client = new ApolloClient({
	link: logoutLink.concat(httpLink),
	cache: new InMemoryCache(),
});
