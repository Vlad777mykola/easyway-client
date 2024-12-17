import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';
import { client } from '@/apollo-client';
import { ApolloProvider } from '@apollo/client';

export const App = () => {
	return (
		<ApolloProvider client={client}>
			{/* <Guard> */}
			<RouterProvider router={router} />
			{/* </Guard> */}
		</ApolloProvider>
	);
};

export default App;
