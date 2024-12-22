import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { router } from '@/router/Router';
import { client } from '@/apollo-client';
import { Guard } from '@/modules/auth';
import { AppContextProvider } from './context/AppContext';

export const App = () => {
	return (
		<AppContextProvider>
			<ApolloProvider client={client}>
				<Guard>
					<RouterProvider router={router} />
				</Guard>
			</ApolloProvider>
		</AppContextProvider>
	);
};

export default App;
