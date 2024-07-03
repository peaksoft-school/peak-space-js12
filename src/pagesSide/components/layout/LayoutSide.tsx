import { Route, Routes, useLocation } from 'react-router-dom';
import ChatUser from '@/src/pagesSide/components/pages/chatsSections/ChatUser.tsx';
import PreloaderSpinner from '@/src/ui/preloaderSpinner/PreloaderSpinner.tsx';
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
// import Publics from '../pages/publicsUsers/';
import MainPage from '../pages/mainPage/MainPage';
import ForMe from '../pages/justForTest/ForMe';
import scss from './LayoutSide.module.scss';
import Test from '../pages/publicPage/Test';
import NavBar from '@/src/ui/navBar/NavBar';
// import Footer from './footer/Footer';
import { useEffect, useState } from 'react';
import { useGetMeQuery } from '@/src/redux/api/auth';
import ChatsPage from '@/src/pagesSide/components/pages/ChatsPage.tsx';

const LayoutSide = () => {
	const { status } = useGetMeQuery();
	const [isPreLoader, setIsPreloader] = useState(true);
	const location = useLocation();

	useEffect(() => {
		if (status === 'fulfilled' || status === 'rejected') {
			setTimeout(() => {
				setIsPreloader(false);
			}, 700);
		}
	}, [status]);

	const isNotification = location.pathname === '/notification';
	const isChatPerson = location.pathname === '/chatperson';
	const isSettingsPage = location.pathname === '/settings';
	const isChat = location.pathname === '/chat';
	const isMainPage = location.pathname === '/';

	return (
		<>
			{isPreLoader ? (
				<>
					<PreloaderSpinner />
				</>
			) : (
				<>
					<div className={scss.Layout}>
						<div style={{ background: '#ebeff3' }} className="alihan">
							<main className="container">
								<NavBar />
								<Routes>
									<Route path="/" element={<MainPage />} />
									<Route path="/side/*" element={<ProfilPage />} />
									<Route path="/settings" element={<EditProfilePage />} />
									<Route path="/chat" element={<ChatsPage />}>
										<Route path=":userEmail" element={<ChatUser />} />
									</Route>
									<Route path="/notification" element={<Notifications />} />
									<Route
										path="/users-profile/:idUser"
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
									<Route
										path="/user-public/:communityId/*"
										element={<UserPublic />}
									/>
								</Routes>
							</main>
						</div>
						{/* {!isSettingsPage &&
							!isChat &&
							!isChatPerson &&
							!isMainPage &&
							!isNotification && <Footer />} */}
					</div>
				</>
			)}
		</>
	);
};

export default LayoutSide;
