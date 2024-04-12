import FireImg from '../../../../assets/Fire_fill.svg';
import scss from './Footer.module.scss';

const Footer = () => {
	return (
		<footer>
			<div className={scss.content}>
				<div className="container">
					<div className={scss.footer}>
						<p>Copyright © 2024. All rights are reserved</p>
						<p className={scss.p}>AGA</p>
						<img src={FireImg} alt="foto" />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
