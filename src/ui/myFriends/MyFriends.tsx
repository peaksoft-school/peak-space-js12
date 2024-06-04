import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetMyFriendsQuery } from '@/src/redux/api/myFriends';
import { IconSearch, IconCirclePlus } from '@tabler/icons-react';
import scss from './MyFriends.module.scss';

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
	const { data, isLoading } = useGetMyFriendsQuery();

	return (
		<div className={scss.container}>
			<h1>Друзья</h1>
			<nav className={scss.nav_bar}>
				<ul className={scss.nav_list}>
					{navigationBar.map((nav) => (
						<div className={scss.link_container}>
							<Link
								to={nav.link}
								className={`${selectedLink === nav.link ? `${scss.selected_link}` : `${scss.link}`}`}
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
				<IconCirclePlus stroke={1} className={scss.plus_icon} onClick={() => {}} />
			</nav>

			<div className={scss.search_container}>
				<IconSearch className={scss.search_img} onClick={() => {}} />
				<input placeholder="Поиск" />
			</div>
			<ul className={scss.users_list}>
				{isLoading ? (
					<h1>loading...</h1>
				) : (
					data?.map((user) => (
						<li className={scss.user_info}>
							<div className={scss.left_part}>
								<img
									className={scss.user_profile_img}
									src={user.ProfilePicture}
									alt='photo'
								/>
								<div className={scss.user_name_description}>
									<Link to="/UsersProfile/side/public">
										<h3>{user.name}</h3>
									</Link>
									<p>{user.description}</p>
								</div>
							</div>

							<button className={scss.message_btn}>Написать</button>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default MyFriends;
