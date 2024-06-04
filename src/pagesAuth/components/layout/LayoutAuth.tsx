import { Route, Routes } from 'react-router-dom';
import Registration from '../pages/registration/Registration';
import NewPassword from '../pages/newPassword/NewPassword';
import Login from '../pages/login/Login';
import PasswordNew from '../pages/newPassword/PasswordNew';

const LayoutAuth = () => {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/registration" element={<Registration />} />
				<Route path="/forgetPassword" element={<NewPassword />} />
				<Route path="/password/:uuid" element={<PasswordNew />} />
			</Routes>
		</>
	);
};

export default LayoutAuth;
