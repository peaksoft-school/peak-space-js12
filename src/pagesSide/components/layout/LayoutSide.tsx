import Footer from './footer/Footer';
import Header from './header/Header';
import scss from './LayoutSide.module.scss';

const LayoutSide = () => {
	return (
		<div className={scss.Layout}>
			<Header />
			<main>main</main>
			<Footer />
		</div>
	);
};

export default LayoutSide;
