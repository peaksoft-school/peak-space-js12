import scss from './LayoutSide.module.scss';
import Header from './header/Header';
import Footer from './footer/Footer';

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
