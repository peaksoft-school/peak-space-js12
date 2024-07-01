import { FC, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '@/src/redux/api/auth';

interface ProtectedRouteProps {
	children: ReactNode;
}

export const SessionProvider: FC<ProtectedRouteProps> = ({ children }) => {
	const { status } = useGetMeQuery();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	console.log(status);

	const handleNavigation = () => {
		switch (pathname) {
			case '/auth/login':
			case '/auth/registration':
			case '/auth/confirm':
			case '/auth/forgot':
				if (status === 'fulfilled') {
					navigate('/');
				}
				break;
			case '/':
			case '/chat':
			case '/chats:userName':
			case '/notifications':
			case '/settings':
			case '/side/public':
			case '/public':
				if (status === 'rejected') {
					navigate('/auth/login');
				}
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		handleNavigation();
	}, [status, pathname, navigate]);

	return children;
};
