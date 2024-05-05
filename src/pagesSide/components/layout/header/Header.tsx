import { IconDown, PlusIcon, SearchIcon } from '@/src/assets/icons';
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
		<header className={scss.header_container}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.logo_container}>
						<img src={Logo} alt="logo" />
					</div>
					<div className={scss.aside}>
						<SearchIcon className={scss.magnifying_glass} onClick={() => {}} />
						<input type="text" />
					</div>
					<div className={scss.profile_picture_and_icon_down}>
						<img
							className={scss.profile_picture}
							src={
								'https://i.pinimg.com/564x/24/3c/4a/243c4a01b41e1e66862c4733ee7c3ed2.jpg'
							}
							alt="profile-picture"
						/>
						<IconDown
							className={`${scss.icon_down} ${isBurgerMenuActive && `${scss.icon_down_active}`}`}
							onClick={changeBurgerMenuStateHandler}
						/>
					</div>
					<div
						className={
							isBurgerMenuActive ? scss.burger_menu_active : scss.burger_menu
						}
						onClick={changeBurgerMenuStateHandler}
					>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div
						className={`${scss.menu_list} ${isBurgerMenuActive ? `${scss.active}` : ''}`}
					>
						<ul>
							{users.map((user) => (
								<li key={user.id}>
									<img className={scss.account_avatar} src={user.avatar} />
									<p className={scss.account_name}>{user.name}</p>
								</li>
							))}
							<div className={scss.add_new_account_container}>
								<PlusIcon
									className={scss.add_new_account_button}
									onClick={() => {}}
								/>
								<p className={scss.add_new_account_text}>Добавить аккаунт</p>
							</div>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
