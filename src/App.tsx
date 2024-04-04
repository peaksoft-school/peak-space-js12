import { Routes, Route } from 'react-router-dom';
import Layout from './pagesSide/components/layout/Layout';
import Login from './pagesAuth/components/pages/login/Login';
import Register from './pagesAuth/components/pages/register/Register';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/*" element={<Layout />} />
				<Route path="/auth/login" element={<Login />} />
				<Route path="/auth/register" element={<Register />} />
			</Routes>
		</>
	);
};

export default App;
