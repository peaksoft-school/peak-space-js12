import { IconDown, PlusIcon, SearchImg } from '@/src/assets/icons';
import FirstMan from '@/src/assets/FirstMan2.png';
import UserStory from '@/src/assets/userStory.png';
import { useState } from 'react';
import scss from './Header.module.scss';
import Logo from '@/src/assets/peacSpaceLogo.png';

const Header = () => {
	const users = [
		{
			id: 0,
			avatar: FirstMan,
			name: 'Ivanov_ivan'
		},
		{
			id: 1,
			avatar: UserStory,
			name: 'Bogdan_'
		}
	];

	const [isBurgerMenuActive, setIsBurgerMenuActive] = useState<boolean>(false);

	const changeBurgerMenuStateHandler = () => {
		setIsBurgerMenuActive((prevState) => !prevState);
	};

	return (
		<header className={scss.headerContainer}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.logoContainer}>
						<img src={Logo} alt="logo" />
					</div>
					<div className={scss.aside}>
						<SearchImg className={scss.magnifyingGlass} onClick={() => {}} />
						<input type="text" />
					</div>
					<div className={scss.profilePictureAndIconDown}>
						<img
							className={scss.profilePicture}
							src={FirstMan}
							alt="profile-picture"
						/>
						<IconDown
							className={`${scss.iconDown} ${isBurgerMenuActive && `${scss.iconDownActive}`}`}
							onClick={changeBurgerMenuStateHandler}
						/>
					</div>.
					<div
						className={
							isBurgerMenuActive ? scss.burgerMenu_active : scss.burgerMenu
						}
						onClick={changeBurgerMenuStateHandler}
					>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div
						className={`${scss.menuList} ${isBurgerMenuActive ? `${scss.active}` : ''}`}
					>
						<ul>
							{users.map((user) => (
								<li key={user.id}>
									<img className={scss.accountAvatar} src={user.avatar} />
									<p className={scss.accountName}>{user.name}</p>
								</li>
							))}
							<div className={scss.addNewAccountContainer}>
								<PlusIcon
									className={scss.addNewAccountButton}
									onClick={() => {}}
								/>
								<p className={scss.addNewAccountText}>Добавить новый аккаунт</p>
							</div>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
