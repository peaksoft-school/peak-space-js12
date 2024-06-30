import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import userProfileImg from '../../assets/FirstMan2.png';
import userPublicImg from '../../assets/Ellipse 60.svg';
import bellIcon from '../../assets/bell-24px.svg';
import settingIcon from '../../assets/carbon_settings.svg';
import messageIcon from '../../assets/message-bubble.svg';
import houseIcon from '../../assets/house-24px.svg';
import scss from './NavBar.module.scss';
import Logo from '@/src/assets/peacSpaceLogo.png';
import MiniLogo from '@/src/assets/mini-logo.svg';

const NavBar = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [test] = useState(false);

	const navigateTo = (path: string) => {
		navigate(path);
	};

	const isChatPerson = pathname === '/chatperson';

	const navigationItems = [
		{
			path: '/',
			icon: <img src={houseIcon} className={scss.icon} />,
			label: 'Главная'
		},
		{
			path: '/chat',
			icon: <img src={messageIcon} alt="message" className={scss.icon} />,
			label: 'Чаты'
		},
		{
			path: '/notification',
			icon: <img src={bellIcon} alt="bell" className={scss.icon} />,
			label: 'Уведомления'
		},
		{
			path: '/settings',
			icon: <img src={settingIcon} className={scss.icon} />,
			label: 'Настройки'
		},
		{
			path: '/side/public',
			icon: <img className={scss.img} src={userProfileImg} alt="foto" />,
			label: 'Мой профиль'
		},
		{
			path: '/public',
			icon: <img className={scss.img} src={userPublicImg} alt="foto" />,
			label: 'Мои паблики'
		}
	];

	return (
		<div className={`${scss.content} ${isChatPerson ? scss.chatPerson : ''}`}>
			<nav>
				<ul className={!test ? scss.isNone : scss.none}>
					{!isChatPerson ? (
						<img src={Logo} alt="logo" className={scss.logo} />
					) : (
						<img src={MiniLogo} alt="logo" className={scss.miniLogo} />
					)}

					{navigationItems.map((item) => (
						<li key={item.path} onClick={() => navigateTo(item.path)}>
							<Link
								className={`${pathname === item.path ? scss.active_page : scss.active_default}`}
								to={item.path}
							>
								{item.icon}
								{!isChatPerson && <span>{item.label}</span>}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default NavBar;
