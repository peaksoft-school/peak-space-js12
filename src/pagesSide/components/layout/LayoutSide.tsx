import scss from './LayoutSide.module.scss';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './header/Header';
import ProfilPage from '../pages/profilPage/ProfilPage';
import NavBar from '@/src/ui/navBar/NavBar';
import EditProfilePage from '../pages/editProfilePage/EditProfilePage';
import MainPage from '../pages/mainPage/MainPage';
import Footer from './footer/Footer';
import Notifications from '../pages/notifications/Notifications';
import UsersProfile from '../pages/profilPage/UsersProfile';
import ChatMessage from '../pages/chat/ChatMessage';
import ChatPerson from '../pages/chat/ChatPerson';
import Publics from '../pages/publicsUsers/Publics';

const LayoutSide = () => {
	const location = useLocation();

	const isSettingsPage = location.pathname === '/Settings';
	const isChat = location.pathname === '/Chat';
	const isChatPerson = location.pathname === '/chatPerson';
	const isMainPage = location.pathname === '/main';
	const isNotification = location.pathname === '/notification';

	return (
		<div className={scss.Layout}>
			<Header />

			<div style={{ background: '#ebeff3' }}>
				<main className="container">
					{!isChatPerson && <NavBar />}
					<Routes>
						<Route path="/side/*" element={<ProfilPage />} />
						<Route path="/Settings" element={<EditProfilePage />} />
						<Route path="/main" element={<MainPage />} />
						<Route path="/Chat" element={<ChatMessage />} />
						<Route path="chatPerson" element={<ChatPerson />} />
						<Route path="/notification" element={<Notifications />} />
						<Route path="/usersProfile/*" element={<UsersProfile />} />
						<Route path="/publics/*" element={<Publics />} />
					</Routes>
				</main>
			</div>
			{!isSettingsPage &&
				!isChat &&
				!isChatPerson &&
				!isMainPage &&
				!isNotification && <Footer />}
		</div>
	);
};

export default LayoutSide;
