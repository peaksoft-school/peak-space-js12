import scss from './LayoutSide.module.scss';
import Header from './header/Header';
import Footer from './footer/Footer';
import CustomSelect from '@/src/UI/customSelect/CustomSelect';

const LayoutSide = () => {
	return (
		<div className={scss.Layout}>
			<Header />
			<main>
				<CustomSelect />
			</main>
			<Footer />
		</div>
	);
};

export default LayoutSide;
