import { router } from '@/app/router';
import { RouterProvider } from 'react-router-dom';
import { Guard } from '@/modules/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from '@/context/app-provider';

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
