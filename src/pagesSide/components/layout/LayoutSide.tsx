import scss from './LayoutSide.module.scss';
import Header from './header/Header';
import Footer from './footer/Footer';
import UserEditProfile from '@/src/UI/userImages/UserEditProfile';

const LayoutSide = () => {
	return (
		<div className={scss.Layout}>
			<Header />
			<main>
				main
				<UserEditProfile />
			</main>
			<Footer />
		</div>
	);
};

export default LayoutSide;
