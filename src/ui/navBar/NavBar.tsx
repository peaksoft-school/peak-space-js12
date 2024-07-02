import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	IconMessageCircle,
	IconHome,
	IconBell,
	IconSettings,
	IconUser,
	IconUserSquareRounded
} from '@tabler/icons-react';

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

	const isChatPerson = pathname === '/chat/chatperson';

	const navigationItems = [
		{
			path: '/',
			icon: (
				<IconHome
					className={
						pathname === '/' ? `${scss.icon} ${scss.iconActive}` : scss.icon
					}
				/>
			),
			label: 'Главная'
		},
		{
			path: '/chat',
			icon: (
				<IconMessageCircle
					className={
						pathname === '/chat' ? `${scss.icon} ${scss.iconActive}` : scss.icon
					}
				/>
			),
			label: 'Чаты'
		},
		{
			path: '/notification',
			icon: (
				<IconBell
					className={
						pathname === '/notification'
							? `${scss.icon} ${scss.iconActive}`
							: scss.icon
					}
				/>
			),
			label: 'Уведомления'
		},
		{
			path: '/settings',
			icon: (
				<IconSettings
					className={
						pathname === '/settings'
							? `${scss.icon} ${scss.iconActive}`
							: scss.icon
					}
				/>
			),
			label: 'Настройки'
		},
		{
			path: '/side/public',
			icon: (
				<IconUser
					className={
						pathname === '/side/public'
							? `${scss.icon} ${scss.iconActive}`
							: `${scss.icon}`
					}
				/>
			),
			label: 'Мой профиль'
		},
		{
			path: '/public',
			icon: (
				<IconUserSquareRounded
					className={
						pathname === '/public'
							? `${scss.icon} ${scss.iconActive}`
							: `${scss.icon}`
					}
				/>
			),
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

				<ul>
					<li></li>
				</ul>
			</nav>
		</div>
	);
};

export default NavBar;
