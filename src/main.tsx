import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@mantine/core/styles.css';
import './index.scss';
import ReduxProvider from './providers/ReduxProvider.tsx';
import { SessionProvider } from '@/src/providers/SessionProvider.tsx';
import { MantineProvider } from '@mantine/core';
import CallDetector from './middleware/CallDetector.tsx';
import UserConnecting from './middleware/UserConnecting.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MantineProvider>
			<ReduxProvider>
				<BrowserRouter>
					<SessionProvider>
					<UserConnecting>
						<CallDetector>
							<App />
						</CallDetector>
					</UserConnecting>
					</SessionProvider>
				</BrowserRouter>
			</ReduxProvider>
		</MantineProvider>
	</React.StrictMode>
);
