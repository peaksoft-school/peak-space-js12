import { useGetMyFriendsQuery } from '@/src/redux/api/myFriends';
import scss from './MyFriends.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PlusIcon, SearchImg } from '@/src/assets/icons/index';
import UserProfile from '@/src/assets/userProfil.png';

const navigationBar = [
	{
		name: 'Общее',
		link: '/general'
	},
	{
		name: 'Коллеги',
		link: '/colleagues'
	},
	{
		name: 'Семья',
		link: '/family'
	},
	{
		name: 'Еще кто-то',
		link: '/somebody-else'
	}
];

const MyFriends = () => {
	const [selectedLink, setSelectedLink] = useState<string>('');

	const { data } = useGetMyFriendsQuery();

	return (
			<div className={scss.container}>
				<h1 className={scss.mainText}>Друзья</h1>
				<nav className={scss.navbar}>
					<ul className={scss.navList}>
						{navigationBar.map((nav) => (
							<div className={scss.linkContainer}>
								<Link
									to={nav.link}
									className={`${selectedLink === nav.link ? `${scss.selectedLink}` : `${scss.link}`}`}
									onClick={() => setSelectedLink(nav.link)}
								>
									{nav.name}
								</Link>
								<div
									className={`${selectedLink === nav.link ? `${scss.circle}` : ''}`}
								></div>
							</div>
						))}
					</ul>
					<PlusIcon className={scss.plusIcon} onClick={() => {}} />
				</nav>

				<div className={scss.searchContainer}>
					<SearchImg className={scss.searchImg} onClick={() => {}} />
					<input placeholder="Поиск" className={scss.searchInput} />
				</div>
				<ul className={scss.usersList}>
					{data?.map((user) => (
						<li className={scss.userInfo}>
							<div className={scss.leftPart}>
								<img className={scss.userProfileImg} src={UserProfile} />
								<div className={scss.userNameDescription}>
									<h3>{user.name}</h3>
									<p>{user.description}</p>
								</div>
							</div>

							<button className={scss.messageBtn}>Написать</button>
						</li>
					))}
				</ul>
			</div>
	);
};

export default MyFriends;
