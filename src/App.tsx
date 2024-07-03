import { Routes, Route } from 'react-router-dom';
import LayoutAuth from './pagesAuth/components/layout/LayoutAuth';
import LayoutSide from './pagesSide/components/layout/LayoutSide';
import CallPage from '@/src/pagesSide/components/pages/CallPage.tsx';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/*" element={<LayoutSide />} />
				<Route path="/auth/*" element={<LayoutAuth />} />
				<Route path="/call" element={<CallPage />} /> 
			</Routes>
		</>
	);
};

export default App;
