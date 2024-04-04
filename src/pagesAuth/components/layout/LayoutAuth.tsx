import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import Registration from '../pages/registration/Registration';

const LayoutAuth = () => {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/registration" element={<Registration />} />
			</Routes>
		</>
	);
};

export default LayoutAuth;
