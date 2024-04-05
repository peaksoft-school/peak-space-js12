import CustomSelect from '@/src/UI/customSelect/CustomSelect';
import Footer from './footer/Footer';
import Header from './header/Header';
import scss from './LayoutSide.module.scss';
import CustomInputText from '@/src/UI/customInputText/CustomInputText';
import CustomTextTarea from '@/src/UI/cusotmTextTarea/CustomTextTarea';

const LayoutSide = () => {
	return (
		<div className={scss.Layout}>
			<Header />
			<main>
				<CustomInputText />
				<CustomTextTarea />
				<CustomSelect />
			</main>
			<Footer />
		</div>
	);
};

export default LayoutSide;
