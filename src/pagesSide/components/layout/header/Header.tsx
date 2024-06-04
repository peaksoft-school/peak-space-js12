import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import FirstMan from '@/src/assets/FirstMan2.png';
import UserStory from '@/src/assets/userStory.png';
import Logo from '@/src/assets/peacSpaceLogo.png';
import { IconSearch,IconCaretDown ,IconCirclePlus  } from '@tabler/icons-react';
import scss from './Header.module.scss';

const Header = () => {
	const navigate = useNavigate();
	const navigateToCreateAcc = () => {
		setTimeout(() => {
			navigate('auth/registration');
		}, 1000);
	};

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
					{key === 'chat' || keys === 'chatperson' ? (
						<div className={scss.aside_avatar}></div>
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
									<img className={scss.accountAvatar} src={user.avatar}  alt='avatar'/>
									<p className={scss.accountName}>{user.name}</p>
								</li>
							))}
							<div className={scss.addNewAccountContainer}>
								<button onClick={navigateToCreateAcc}>
									<IconCirclePlus className={scss.addNewAccountButton} />
								</button>
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
