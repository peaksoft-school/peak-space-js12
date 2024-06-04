import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import userProfileImg from '../../assets/FirstMan2.png';
import userPublicImg from '../../assets/Ellipse 60.svg';
import {
	IconMessageCircle,
	IconHome,
	IconBell,
	IconSettings
} from '@tabler/icons-react';
import scss from './NavBar.module.scss';

const NavBar = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [test] = useState(false);

	const navigateTo = (path: string) => {
		navigate(path);
	};

	const navigationItems = [
		{ path: '/', icon: <IconHome />, label: 'Главная' },
		{ path: '/chat', icon: <IconMessageCircle />, label: 'Чаты' },
		{ path: '/notification', icon: <IconBell />, label: 'Уведомления' },
		{ path: "/settings"   , icon: <IconSettings />, label: 'Настройки' },
		{
			path: '/side/public',
			icon: <img className={pathname === '/side/public' ? `${scss.img} ${scss.active_img}` : `${scss.img}`} src={userProfileImg} alt="foto" />,
			label: 'Мой профиль'
		},
		{
			path: '/publics/photo',
			icon: <img className={pathname === '/publics/photo' ? `${scss.img} ${scss.active_img}` : `${scss.img}`} src={userPublicImg} alt="foto" />,
			label: 'Мои паблики'
		}
	];

	return (
		<div className={scss.content}>
			<nav>
				<ul className={!test ? scss.isNone : scss.none}>
					{navigationItems.map((item, index) => (
						<li key={index} onClick={() => navigateTo(item.path)}>
							<Link
								className={`${pathname === item.path ? scss.active_page : scss.active_default}`}
								to={item.path}
							>
								{item.icon }
								<span>{item.label}</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default NavBar;
