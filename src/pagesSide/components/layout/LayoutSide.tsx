import scss from './LayoutSide.module.scss';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './header/Header';
import ProfilPage from '../pages/profilPage/ProfilPage';
import NavBar from '@/src/UI/navBar/NavBar';
import EditProfilePage from '../pages/editProfilePage/EditProfilePage';
import MainPage from '../pages/mainPage/MainPage';
import Footer from './footer/Footer';
import PublicPage from '../pages/publicPage/PublicPage';
import NewPublic from '../pages/publicPage/NewPublic';

const LayoutSide = () => {
	const location = useLocation();

	const isSettingsPage = location.pathname === '/Settings';
	// const isMainPage = location.pathname === '/main';

	return (
		<div className={scss.Layout}>
			<Header />
			<div style={{ background: '#ebeff3' }}>
				<main className="container">
					<NavBar />
					<Routes>
						<Route path="side/*" element={<ProfilPage />} />
						<Route path="/Settings" element={<EditProfilePage />} />
						<Route path="/main" element={<MainPage />} />
						<Route path="/public" element={<PublicPage />} />
						<Route path="/public/new-publication" element={<NewPublic />} />
					</Routes>
				</main>
			</div>
			{isSettingsPage ? null : <Footer />}
			{/* {!isMainPage && <Footer />} */}
		</div>
	);
};

export default LayoutSide;
