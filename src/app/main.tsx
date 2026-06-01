// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'antd/dist/reset.css';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

createRoot(document.getElementById('root')!).render(
	// <StrictMode>
	<ErrorBoundary fallback={<div>Error</div>}>
		<Suspense fallback={<div>Loading...</div>}>
			<App />
		</Suspense>
	</ErrorBoundary>,
	// </StrictMode>,
);
