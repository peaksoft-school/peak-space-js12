import scss from './LayoutSide.module.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import ProfilPage from '../pages/profilPage/ProfilPage';
import MyFriends from '@/src/UI/myFriends/MyFriends';

const LayoutSide = () => {
	return (
		<div className={scss.Layout}>
			<Header />
			<MyFriends />
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
