// import scss from './LayoutSide.module.scss';
// import { Route, Routes, useLocation } from 'react-router-dom';
// import Header from './header/Header';
// import ProfilPage from '../pages/profilPage/ProfilPage';
// import NavBar from '@/src/UI/navBar/NavBar';
// import EditProfilePage from '../pages/editProfilePage/EditProfilePage';
// import MainPage from '../pages/mainPage/MainPage';
// import Footer from './footer/Footer';
// import Notifications from '../pages/notifications/Notifications';

// const LayoutSide = () => {
// 	const location = useLocation();

// 	const isSettingsPage = location.pathname === '/Settings';
// 	// const isMainPage = location.pathname === '/main';

// 	return (
// 		<div className={scss.Layout}>
// 			<Header />
// 			<div style={{ background: '#ebeff3' }}>
// 				<main className="container">
// 					<NavBar />
// 					<Routes>
// 						<Route path="/side/*" element={<ProfilPage />} />
// 						<Route path="/Settings" element={<EditProfilePage />} />
// 						<Route path="/main" element={<MainPage />} />
// 						<Route path="/notification" element={<Notifications />} />
// 					</Routes>
// 				</main>
// 			</div>
// 			{isSettingsPage ? null : <Footer />}
// 			{/* {isMainPage ? null :<Footer/>} */}
// 		</div>
// 	);
// };

// export default LayoutSide;

import scss from './LayoutSide.module.scss';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './header/Header';
import ProfilPage from '../pages/profilPage/ProfilPage';
import EditProfilePage from '../pages/editProfilePage/EditProfilePage';
import MainPage from '../pages/mainPage/MainPage';
import Footer from './footer/Footer';
import Notifications from '../pages/notifications/Notifications';
import NavBar from '@/src/UI/navBar/NavBar';

const LayoutSide = () => {
	const location = useLocation();

	const isSettingsPage = location.pathname === '/Settings';
	// const isMainPage = location.pathname === '/main';

	return (
		<div className={scss.Layout}>
			<Header />v
			<div style={{ background: '#ebeff3' }}>
				<main className="container">
					<NavBar />
					<Routes>
						<Route path="/side/*" element={<ProfilPage />} />
						<Route path="/Settings" element={<EditProfilePage />} />
						<Route path="/main" element={<MainPage />} />
						<Route path="/notification" element={<Notifications />} />
					</Routes>
				</main>
			</div>
			{isSettingsPage ? null : <Footer />}
			{/* {isMainPage ? null :<Footer/>} */}
		</div>
	);
};

export default LayoutSide;
