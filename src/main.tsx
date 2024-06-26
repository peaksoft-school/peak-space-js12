import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import ReduxProvider from './providers/ReduxProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ReduxProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ReduxProvider>
	</React.StrictMode>
);
	