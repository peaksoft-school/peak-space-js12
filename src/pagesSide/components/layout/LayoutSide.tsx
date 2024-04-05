import AddStory from '@/src/UI/addStory/AddStory';
import Footer from './footer/Footer';
import Header from './header/Header';
import scss from './LayoutSide.module.scss';
import AvatarStory from '@/src/UI/avatarStory/AvatarStory';
import ProfilUser from '@/src/UI/profilUser/ProfilUser';

const LayoutSide = () => {
	return (
		<div className={scss.Layout}>
			<Header />
			<main>
				main
				<AddStory />
				<AvatarStory />
				<ProfilUser />
			</main>
			<Footer />
		</div>
	);
};

export default LayoutSide;
