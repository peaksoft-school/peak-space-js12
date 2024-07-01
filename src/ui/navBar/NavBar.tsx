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
import Logo from '@/src/assets/peacSpaceLogo.png';
import MiniLogo from '@/src/assets/mini-logo.svg';
import UserInfoLogout from '@/src/ui/userInfoLogout/UserInfoLogout.tsx';

const NavBar = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [test] = useState(false);

	const navigateTo = (path: string) => {
		navigate(path);
	};

	const isChatPerson = pathname === '/chatperson';

	const navigationItems = [
		{ path: '/', icon: <IconHome />, label: 'Главная' },
		{ path: '/chat', icon: <IconMessageCircle />, label: 'Чаты' },
		{ path: '/notification', icon: <IconBell />, label: 'Уведомления' },
		{ path: '/settings', icon: <IconSettings />, label: 'Настройки' },
		{
			path: '/side/public',
			icon: (
				<img
					className={
						pathname === '/side/public'
							? `${scss.img} ${scss.active_img}`
							: scss.img
					}
					src={userProfileImg}
					alt="Profile"
				/>
			),
			label: 'Мой профиль'
		},
		{
			path: '/public',
			icon: (
				<img
					className={
						pathname === '/public' ||
						pathname === '/public/user-public/:communityId/'
							? `${scss.img} ${scss.active_img}`
							: scss.img
					}
					src={userPublicImg}
					alt="Public"
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
						{navigationItems.map((item) => (
							<li key={item.path} onClick={() => navigateTo(item.path)}>
								<Link
									className={
										isActive(item.path) ? scss.active_page : scss.active_default
									}
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
			<div className={scss.bottom}>
				<UserInfoLogout />
			</div>
		</div>
	);
};

export default NavBar;
