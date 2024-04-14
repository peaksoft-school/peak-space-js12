import scss from './LayoutSide.module.scss';
import Header from './header/Header';
import Footer from './footer/Footer';
import ProfilPage from '../pages/profilPage/ProfilPage';
import { Route, Routes } from 'react-router-dom';

const LayoutSide = () => {
	return (
		<div className={scss.Layout}>
			<Header />
			<main>
				<Routes>
					<Route path="side/*" element={<ProfilPage />} />
				</Routes>
			</main>

			<Footer />
		</div>
	);
};

export default LayoutSide;
