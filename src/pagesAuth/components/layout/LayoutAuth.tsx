import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login/Login';
import Registration from '../pages/registration/Registration';
import NewPassword from '../pages/newPassword/NewPassword';

const LayoutAuth = () => {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/registration" element={<Registration />} />
				<Route path="/forgetPassword" element={<NewPassword />} />
			</Routes>
		</>
	);
};

export default LayoutAuth;
