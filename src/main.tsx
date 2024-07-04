import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SessionProvider } from '@/src/providers/SessionProvider.tsx';
import UserConnecting from './middleware/UserConnecting.tsx';
import ReduxProvider from './providers/ReduxProvider.tsx';
import CallDetector from './middleware/CallDetector.tsx';
import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import App from './App.tsx';
import './index.scss';

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
