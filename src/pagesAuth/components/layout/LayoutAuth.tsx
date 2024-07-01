import { Route, Routes } from 'react-router-dom';
import Registration from '../pages/registration/Registration';
import NewPassword from '../pages/newPassword/NewPassword';
import PasswordNew from '../pages/newPassword/PasswordNew';
import ConfirmByEmail from '../pages/login/ConfirmByEmail.';
import Login from '../pages/login/Login';

const LayoutAuth = () => {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/registration" element={<Registration />} />
				<Route path="/forgetPassword" element={<NewPassword />} />
				<Route path="/password/:uuid" element={<PasswordNew />} />
				<Route path="/confirm-by-email/:id" element={<ConfirmByEmail />} />
			</Routes>
		</>
	);
};

export default LayoutAuth;
