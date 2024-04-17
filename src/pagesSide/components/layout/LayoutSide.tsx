import scss from './LayoutSide.module.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import ProfilPage from '../pages/profilPage/ProfilPage';
import Friend from '../pages/homeSections/friend/Friend';
import Desctop from '../pages/homeSections/friend/Desctop';

const LayoutSide = () => {
	return (
		<div className={scss.Layout}>
			<Header />

			<main>
				<Routes>
					<Route path="side/*" element={<ProfilPage />} />
				</Routes>
				<Desctop />
			</main>
			<Footer />
		</div>
	);
};

export default LayoutSide;
