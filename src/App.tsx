import { router } from '@/router/Router';
import { RouterProvider } from 'react-router-dom';
import { Guard } from '@/modules/auth';
import { AppProvider } from './context/AppProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Guard>
				<AppProvider>
					<RouterProvider router={router} />
				</AppProvider>
			</Guard>
		</QueryClientProvider>
	);
};

export default App;
