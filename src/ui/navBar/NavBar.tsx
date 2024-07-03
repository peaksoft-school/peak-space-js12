// @ts-nocheck
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	IconMessageCircle,
	IconHome,
	IconBell,
	IconSettings,
	IconUser,
	IconUsersGroup,
	IconSearch
} from '@tabler/icons-react';

import scss from './NavBar.module.scss';
import Logo from '@/src/assets/peacSpaceLogo.png';
import MiniLogo from '@/src/assets/mini-logo.svg';
import UserInfoLogout from '@/src/ui/userInfoLogout/UserInfoLogout.tsx';

const NavBar = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [test] = useState(false);
	const [isSearchActive, setIsSearchActive] = useState(false);

	const navigateTo = (path: string) => {
		setIsSearchActive(false);
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
							? `${scss.img} ${scss.active_img}`
							: scss.img
					}
				/>
			),
			label: 'Мой профиль'
		},
		{
			path: '/public',
			icon: (
				<IconUsersGroup
					className={
						pathname === '/public' ||
						pathname === '/public/user-public/:communityId/'
							? `${scss.img} ${scss.active_img}`
							: scss.img
					}
				/>
			),
			label: 'Мои паблики'
		}
	];

	const isActive = (href: string) => {
		if (href === '/') {
			return pathname === href;
		}
		return pathname.startsWith(href);
	};

	return (
		<div className={`${scss.content} ${isChatPerson ? scss.chatPerson : ''}`}>
			<div className={scss.top}>
				{!isChatPerson ? (
					<img src={Logo} alt="Logo" className={scss.logo} />
				) : (
					<img src={MiniLogo} alt="Logo" className={scss.miniLogo} />
				)}
				<nav>
					<ul className={!test ? scss.isNone : scss.none}>
						<li onClick={() => navigateTo('/')}>
							<Link
								className={
									isActive('/') ? scss.active_page : scss.active_default
								}
								to="/"
							>
								<IconHome
									className={
										pathname === '/'
											? `${scss.icon} ${scss.iconActive}`
											: scss.icon
									}
								/>
								{!isChatPerson && !isSearchActive && <span>Главная</span>}
							</Link>
						</li>
						{/* <li onClick={() => setIsSearchActive(!isSearchActive)}>
							<IconSearch
								className={
									isSearchActive ? `${scss.icon} ${scss.iconActive}` : scss.icon
								}
							/>
							{!isChatPerson && !isSearchActive && (
								<span className={scss.search_text}>Поиск</span>
							)}
						</li> */}
						{navigationItems.slice(1).map((item) => (
							<li key={item.path} onClick={() => navigateTo(item.path)}>
								<Link
									className={
										isActive(item.path) ? scss.active_page : scss.active_default
									}
									to={item.path}
								>
									{item.icon}
									{!isChatPerson && !isSearchActive && (
										<span>{item.label}</span>
									)}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				{/* {isSearchActive && (
					<input
						type="text"
						className={scss.searchInput}
						placeholder="Search..."
					/>
				)} */}
			</div>
			<div className={scss.bottom}>
				<UserInfoLogout />
			</div>
		</div>
	);
};

export default NavBar;
