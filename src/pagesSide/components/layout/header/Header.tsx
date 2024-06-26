import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import FirstMan from '@/src/assets/FirstMan2.png';
import UserStory from '@/src/assets/userStory.png';
import Logo from '@/src/assets/peacSpaceLogo.png';
import {
	IconSearch,
	IconCaretDown,
	IconCirclePlus,
	IconXboxX
} from '@tabler/icons-react';
import scss from './Header.module.scss';
import { useUsersQuery } from '@/src/redux/api/story';

const Header = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [inputValue, setInputValue] = useState('');

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

	const changeInputSearch = (value: string) => {
		searchParams.set('keyWord', value);
		setSearchParams(searchParams);
		navigate(`?${searchParams.toString()}`);
		if (value === '') {
			searchParams.delete('keyWord');
			setSearchParams(searchParams);
		}
	};
	const { data } = useUsersQuery({
		keyWord: searchParams.toString()
	});

	const [isBurgerMenuActive, setIsBurgerMenuActive] = useState<boolean>(false);
	const changeBurgerMenuStateHandler = () => {
		setIsBurgerMenuActive((prevState) => !prevState);
	};

	const isChat = useParams();
	const key = isChat['*'];
	const isChatPerson = useParams();
	const keys = isChatPerson['*'];

	const handleValue = () => {
		searchParams.delete('keyWord');
		setSearchParams(searchParams);
		setInputValue('');
	};

	return (
		<header className={scss.headerContainer}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.logoContainer}>
						<img src={Logo} alt="logo" />
					</div>
					{key === 'chat' ||
					keys === 'chatperson' ||
					keys === 'notification' ? (
						<div className={scss.aside_avatar}></div>
					) : (
						<>
							<div className={scss.test}>
								<div className={scss.aside}>
									{inputValue === '' ? (
										<IconSearch
											className={scss.magnifyingGlass}
											onClick={() => {}}
											tabIndex={0}
											onKeyDown={(e) => e.key === 'Enter' && {}}
											aria-label="Search"
										/>
									) : (
										<IconXboxX
											onClick={handleValue}
											className={scss.icons}
											tabIndex={0}
											onKeyDown={(e) => e.key === 'Enter' && handleValue()}
											aria-label="Clear"
										/>
									)}
									<input
										type="text"
										value={inputValue}
										onChange={(e) => {
											setInputValue(e.target.value);
											changeInputSearch(e.target.value);
										}}
										aria-label="Search input"
									/>
								</div>
								<div
									className={`${inputValue !== '' ? scss.box : scss.hidden}`}
								>
									{
										(inputValue !== '' &&
										
										data &&
											data.map((item) => (
												<div
													key={item.id}
													tabIndex={0}
													onKeyDown={(e) => {
														if (e.key === 'Enter') {
															// Define the action that should happen when Enter is pressed
														}
													}}
													className={scss.user_card}
												>
													<div className={scss.form}>
														<img src={item.avatar} alt={item.userName} />
														<div className={scss.text}>
															<h4>{item.firstName}</h4>
															<p>{item.userName}</p>
														</div>
													</div>
													<p>{item.lastName}</p>
												</div>
											)))
									}
								</div>
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
							tabIndex={0}
							onKeyDown={(e) =>
								e.key === 'Enter' && changeBurgerMenuStateHandler()
							}
							aria-label="Toggle menu"
						/>
					</div>
					<div
						className={
							isBurgerMenuActive ? scss.burgerMenu_active : scss.burgerMenu
						}
						onClick={changeBurgerMenuStateHandler}
						tabIndex={0}
						onKeyDown={(e) =>
							e.key === 'Enter' && changeBurgerMenuStateHandler()
						}
						aria-label="Toggle menu"
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
									<img
										className={scss.accountAvatar}
										src={user.avatar}
										alt="avatar"
									/>
									<p className={scss.accountName}>{user.name}</p>
								</li>
							))}
							<div className={scss.addNewAccountContainer}>
								<button
									onClick={navigateToCreateAcc}
									tabIndex={0}
									onKeyDown={(e) => e.key === 'Enter' && navigateToCreateAcc()}
									aria-label="Add new account"
								>
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
