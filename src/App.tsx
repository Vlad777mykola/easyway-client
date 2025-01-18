import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { router } from '@/router/Router';
import { client } from '@/shared/apollo-client';
import { Guard } from '@/modules/auth';
import { AppContextProvider } from './context/AppContext';

export const App = () => {
	return (
		<ApolloProvider client={client}>
			<Guard>
				<AppContextProvider>
					<RouterProvider router={router} />
				</AppContextProvider>
			</Guard>
		</ApolloProvider>
	);
};

export default App;
