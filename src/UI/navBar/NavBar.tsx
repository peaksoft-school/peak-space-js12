import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import scss from './NavBar.module.scss';
import userProfileImg from '../../assets/FirstMan2.png';
import userPublicImg from '../../assets/Ellipse 60.svg';
import { IconMessageCircle } from '@tabler/icons-react';
import { IconHome } from '@tabler/icons-react';
import { IconBell } from '@tabler/icons-react';
import { IconSettings } from '@tabler/icons-react';

const NavBar = () => {
	const [, setActiveItem] = useState<string>('/');
	const [test] = useState(false);
	const navigate = useNavigate();

	const navigateMainPage = () => {
		navigate('/main');
		setActiveItem('/main');
	};

	const navigateChat = () => {
		navigate('/Chat');
		setActiveItem('/Chat');
	};
	const navigateNotice = () => {
		navigate('/notification');
		setActiveItem('/notification');
	};
	const navigateSettings = () => {
		navigate('/Settings');
		setActiveItem('/Settings');
	};
	const navigateSide = () => {
		navigate('/Side');
		setActiveItem('/Side');
	};
	const navigateMoiPublic = () => {
		navigate('/Moi public');
		setActiveItem('/Moi public');
	};

	const { pathname } = useLocation();

	return (
		<>
			<div className={scss.content}>
				<nav>
					<ul className={!test ? scss.isNone : scss.none}>
						<li onClick={navigateMainPage}>
							<Link
								className={`${pathname === '/main' ? scss.active_page : scss.active_default} `}
								onClick={() => setActiveItem('/main')}
								to={'/main'}
							>
								<IconHome />
								<span>Главная</span>
							</Link>
						</li>
						<li onClick={navigateChat}>
							<Link
								className={`${pathname === '/Chat' ? scss.active_page : scss.active_default} `}
								onClick={() => setActiveItem('/Chat')}
								to={'/Chat'}
							>
								<IconMessageCircle />
								<span>Чаты</span>
							</Link>
						</li>

						<li onClick={navigateNotice}>
							<Link
								className={`${pathname === '/notification' ? scss.active_page : scss.active_default} `}
								onClick={() => setActiveItem('/notification')}
								to={'/notification'}
							>
								<IconBell />
								<span>Уведомления</span>
							</Link>
						</li>
						<li onClick={navigateSettings}>
							<Link
								className={`${pathname === '/Settings' ? scss.active_page : scss.active_default} `}
								onClick={() => setActiveItem('/Settings')}
								to={'/Settings'}
							>
								<IconSettings />
								<span>Настройки</span>
							</Link>
						</li>
						<li onClick={navigateSide}>
							<Link
								className={`${pathname === '/Side' ? scss.active_page : scss.active_default} `}
								onClick={() => setActiveItem('/Side')}
								to={'/Side'}
							>
								<img
									className={`${pathname === '/Side' && scss.img}`}
									src={userProfileImg}
									alt="foto"
								/>
								<span>Мой профиль</span>
							</Link>
						</li>
						<li onClick={navigateMoiPublic}>
							<Link
								className={`${pathname === '/Moi public' ? scss.active_page : scss.active_default} `}
								onClick={() => setActiveItem('/Moi public')}
								to={'/Moi public'}
							>
								<img
									className={`${pathname === '/Moi public' && scss.img}`}
									src={userPublicImg}
									alt="foto"
								/>
								<span>Мои паблики</span>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
};
export default NavBar;
