import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { router } from '@/router/Router';
import { client } from '@/shared/apollo-client';
import { Guard } from '@/modules/auth';
import { AppProvider } from './context/AppProvider';

export const App = () => {
	return (
		<ApolloProvider client={client}>
			<Guard>
				<AppProvider>
					<RouterProvider router={router} />
				</AppProvider>
			</Guard>
		</ApolloProvider>
	);
};

export default App;
