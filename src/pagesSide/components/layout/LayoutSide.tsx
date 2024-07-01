import { Route, Routes, useLocation } from 'react-router-dom';
import ConfidentTwoPage from '../pages/editProfilePage/ConfidentTwoPage';
import EditProfilePage from '../pages/editProfilePage/EditProfilePage';
import BlockedPages from '../pages/editProfilePage/BlockedPages';
import Notifications from '../pages/notifications/Notifications';
import UsersProfile from '../pages/profilPage/UsersProfile';
import PublicPage from '../pages/publicPage/PublicPage';
import ProfilPage from '../pages/profilPage/ProfilPage';
import UserPublic from '../pages/userPublic/UserPublic';
import NewPublic from '../pages/publicPage/NewPublic';
import PostById from '../pages/justForTest/PostById';
import ChatMessage from '../pages/chat/ChatMessage';
// import Publics from '../pages/publicsUsers/';
import MainPage from '../pages/mainPage/MainPage';
import ChatPerson from '../pages/chat/ChatPerson';
import ForMe from '../pages/justForTest/ForMe';
import scss from './LayoutSide.module.scss';
import Test from '../pages/publicPage/Test';
import NavBar from '@/src/ui/navBar/NavBar';
import Footer from './footer/Footer';

const LayoutSide = () => {
	const location = useLocation();

	const isNotification = location.pathname === '/notification';
	const isChatPerson = location.pathname === '/chatperson';
	const isSettingsPage = location.pathname === '/settings';
	const isChat = location.pathname === '/chat';
	const isMainPage = location.pathname === '/';

	return (
		<div className={scss.Layout}>
			<div style={{ background: '#ebeff3' }} className="alihan">
				<main className="container">
					{/* {!isChatPerson && <NavBar />} */}
					<NavBar />
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/side/*" element={<ProfilPage />} />
						<Route path="/settings" element={<EditProfilePage />} />
						<Route path="/chat" element={<ChatMessage />} />
						<Route path="/chatperson" element={<ChatPerson />} />
						<Route path="/notification" element={<Notifications />} />
						<Route
							path="/users-profile/:foundUserId/*"
							element={<UsersProfile />}
						/>
						<Route path="/public" element={<PublicPage />} />
						<Route
							path="/public/user-public/:communityId/*"
							element={<UserPublic />}
						/>

						<Route path="/public/:communityId" element={<ForMe />} />
						<Route path="/new-public" element={<NewPublic />} />
						<Route path="/test/:publicName " element={<Test />} />
						<Route path="/confindent" element={<ConfidentTwoPage />} />
						<Route path="/blocked" element={<BlockedPages />} />
						<Route path="/new-public" element={<NewPublic />} />
						<Route path="/post/:postId" element={<PostById />} />
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
