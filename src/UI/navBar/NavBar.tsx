import { useState } from 'react';
import { Link } from 'react-router-dom';
import scss from './NavBar.module.scss';
import {
	ChatImg,
	HomeImg,
	NotificationsIgm,
	SettingdImg
} from '@/src/assets/icons';
import userProfileImg from '../../assets/FirstMan2.png';
import userPublicImg from '../../assets/Ellipse 60.svg';

const NavBar = () => {
	const [activeItem, setActiveItem] = useState<string>('/');
	const [isBurgerMenuActive, setIsBurgerMenuActive] = useState<boolean>(false);

	const burgerMenuStateChangeHandler = () => {
		setIsBurgerMenuActive((prevState) => !prevState);
	};

	console.log(isBurgerMenuActive);

	return (
		<div className={scss.content}>
			<div
				onClick={burgerMenuStateChangeHandler}
				className={`${scss.burgerMenu} ${isBurgerMenuActive ? `${scss.burgerMenuActive}` : ''}`}
			>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<nav className={`${isBurgerMenuActive ? `${scss.navActive}` : ''}`}>
				<ul>
					<li>
						<Link
							className={`${activeItem === '/Main page' ? scss.activePage : scss.activePages} `}
							onClick={() => setActiveItem('/Main page')}
							to={'/Main page'}
						>
							<HomeImg />
							<span>Главная</span>
						</Link>
					</li>

					<li>
						<Link
							className={`${activeItem === '/Chat' ? scss.activePage : scss.activePages} `}
							onClick={() => setActiveItem('/Chat')}
							to={'/Chat'}
						>
							<ChatImg />
							<span>Чаты</span>
						</Link>
					</li>

					<li>
						<Link
							className={`${activeItem === '/Notice' ? scss.activePage : scss.activePages} `}
							onClick={() => setActiveItem('/Notice')}
							to={'/Notice'}
						>
							<NotificationsIgm />
							<span>Уведомления</span>
						</Link>
					</li>

					<li>
						<Link
							className={`${activeItem === '/Settings' ? scss.activePage : scss.activePages} `}
							onClick={() => setActiveItem('/Settings')}
							to={'/Settings'}
						>
							<SettingdImg />
							<span>Настройки</span>
						</Link>
					</li>

					<li>
						<Link
							className={`${activeItem === '/My profile' ? scss.activePage : scss.activePages} `}
							onClick={() => setActiveItem('/My profile')}
							to={'/My profile'}
						>
							<img
								className={`${activeItem === '/My profile' && scss.img}`}
								src={userProfileImg}
								alt="foto"
							/>
							<span>Мой профиль</span>
						</Link>
					</li>

					<li>
						<Link
							className={`${activeItem === '/Moi public' ? scss.activePage : scss.activePages} `}
							onClick={() => setActiveItem('/Moi public')}
							to={'/Moi public'}
						>
							<img
								className={`${activeItem === '/Moi public' && scss.img}`}
								src={userPublicImg}
								alt="foto"
							/>
							<span>Мои паблики</span>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default NavBar;
