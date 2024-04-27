import scss from './LayoutSide.module.scss';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import ProfilPage from '../pages/profilPage/ProfilPage';
import NavBar from '@/src/UI/navBar/NavBar';
import EditProfilePage from '../pages/editProfilePage/EditProfilePage';
import ConfidentTwoRegest from '../pages/editProfilePage/ConfidentTwoRegest';
import ConfidentPage from '../pages/editProfilePage/ConfidentPage';

const LayoutSide = () => {
	const location = useLocation();

	const isSettingsPage = location.pathname === '/Settings';
	return (
		<div className={scss.Layout}>
			<Header />
			<div style={{ background: '#ebeff3' }}>
				<main className="container">
					<NavBar />
					<Routes>
						<Route path="side/*" element={<ProfilPage />} />
						<Route path="/Settings" element={<EditProfilePage />} />
						<Route
							path="/ConfidentTwoRegest"
							element={<ConfidentTwoRegest />}
						/>
						<Route
							path="/ConfidentPage"
							element={<ConfidentPage />}
						/>
					</Routes>
				</main>
			</div>
			{isSettingsPage ? null : <Footer />}
		</div>
	);
};

export default LayoutSide;
