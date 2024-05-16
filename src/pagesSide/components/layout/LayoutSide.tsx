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
import ConfidentTwoPage from '../pages/editProfilePage/ConfidentTwoPage';
import PublicPage from '../pages/publicPage/PublicPage';
import NewPublic from '../pages/publicPage/NewPublic';

const LayoutSide = () => {
	const location = useLocation();

	const isSettingsPage = location.pathname === '/settings';
	const isChat = location.pathname === '/chat';
	const isChatPerson = location.pathname === '/chatperson';
	const isMainPage = location.pathname === '/';
	const isNotification = location.pathname === '/notification';

	return (
		<div className={scss.Layout}>
			<Header />
			<div style={{ background: '#ebeff3' }}>
				<main className="container">
					{!isChatPerson && <NavBar />}
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/side/*" element={<ProfilPage />} />
						<Route path="/settings" element={<EditProfilePage />} />
						<Route path="/chat" element={<ChatMessage />} />
						<Route path="/chatperson" element={<ChatPerson />} />
						<Route path="/notification" element={<Notifications />} />
						<Route path="/usersprofile/*" element={<UsersProfile />} />
						<Route path="/publics/*" element={<Publics />} />
						<Route path="confindent" element={<ConfidentTwoPage />} />
						<Route path="/public" element={<PublicPage />} />
						<Route path="/public/new-public" element={<NewPublic />} />
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
