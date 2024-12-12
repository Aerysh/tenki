import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CustomProvider } from 'rsuite';
import App from './App.tsx';
import 'rsuite/dist/rsuite.min.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<CustomProvider theme="dark">
			<App />
		</CustomProvider>
	</StrictMode>
);
