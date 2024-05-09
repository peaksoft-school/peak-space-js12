import FirstMan from '@/src/assets/FirstMan2.png';
import UserStory from '@/src/assets/userStory.png';
import { useState } from 'react';
import scss from './Header.module.scss';
import Logo from '@/src/assets/peacSpaceLogo.png';
import { IconSearch } from '@tabler/icons-react';
import { IconCirclePlus } from '@tabler/icons-react';
import { IconCaretDown } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';

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

	const isChat = useParams();
	const key = isChat['*'];

	const isChatPerson = useParams();
	const keys = isChatPerson['*'];
	return (
		<header className={scss.headerContainer}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.logoContainer}>
						<img src={Logo} alt="logo" />
					</div>
					{key === 'chatMeg' || keys === 'chatPerson' ? (
						<div style={{ marginLeft: '920px' }}></div>
					) : (
						<>
							<div className={scss.aside}>
								<IconSearch
									className={scss.magnifyingGlass}
									onClick={() => {}}
								/>
								{<input type="text" />}
							</div>
						</>
					)}
			
	
					<div className={scss.profilePictureAndIconDown}>
						<img
							className={scss.profilePicture}
							src={FirstMan}
							alt="profile-picture"
						/>
						<IconCaretDown
							className={`${scss.iconDown} ${isBurgerMenuActive && `${scss.iconDownActive}`}`}
							onClick={changeBurgerMenuStateHandler}
						/>
					</div>
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
								<IconCirclePlus
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
