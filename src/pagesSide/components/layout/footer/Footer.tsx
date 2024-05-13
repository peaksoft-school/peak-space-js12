
import scss from './Footer.module.scss';
import {IconFlame} from '@tabler/icons-react'
const Footer = () => {
	return (
		<footer style={{ background: 'rgb(63, 61, 100)' }}>
			<div className="container">
				<div className={scss.footer}>
					<p>Copyright © 2024. All rights are reserved</p>
					<p>AGA</p>
					<IconFlame  color='white'/>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
