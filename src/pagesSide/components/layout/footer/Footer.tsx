import { IconFlame } from '@tabler/icons-react';
import scss from './Footer.module.scss';
const Footer = () => {
	return (
		<footer>
			<div className="container">
				<div className={scss.footer}>
					<p>Copyright © 2024. All rights are reserved</p>
					<p>AGA</p>
					<IconFlame color="grey" />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
