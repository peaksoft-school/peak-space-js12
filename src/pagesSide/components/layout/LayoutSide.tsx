import scss from './LayoutSide.module.scss';
import Header from './header/Header';
import Footer from './footer/Footer';
import EditProfilePage from '../pages/editProfilePage/EditProfilePage';

const LayoutSide = () => {
	return (
		<div className={scss.Layout}>
			<Header />
			<main>
				<EditProfilePage />
			</main>

			<Footer />
		</div>
	);
};

export default LayoutSide;
