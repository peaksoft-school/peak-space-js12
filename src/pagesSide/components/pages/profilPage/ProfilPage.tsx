import {
	Link,
	Route,
	Routes,
	useLocation,
	useNavigate
} from 'react-router-dom';
import Publications from './Publications';
import Favourites from './Favourites';
import PhotoWith from './PhotoWith';
import { useEffect, useState } from 'react';
import scss from './Style.module.scss';
import {
	IconEdit,
	IconBasket,
	IconPhoto,
	IconHeart,
	IconPinned
} from '@tabler/icons-react';
import ModalTs from '@/src/ui/modal/Modal';
import MyFriends from '@/src/ui/myFriends/MyFriends';

const ProfilPage = () => {
	const { pathname } = useLocation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [page, setPage] = useState(true);
	const navigate = useNavigate();

	const showModal = () => {
		setIsModalOpen(!isModalOpen);
	};
	useEffect(() => {
		if (page) {
			navigate('/side/public');
		} else if (pathname === '/side/favorite') {
			navigate('/side/favorite');
		} else {
			navigate('/side/photo');
		}
	}, [page, pathname, navigate]);

	const links = [
		{
			path: '/side/public',
			icon: <IconPhoto color="black" />,
			label: 'Мои публикации',
			isPage: true
		},
		{
			path: '/side/favorite',
			icon: <IconHeart color="black" />,
			label: 'Избранное',
			isPage: false
		},
		{
			path: '/side/photo',
			icon: <IconPinned color="black" />,
			label: 'Фото с вами',
			isPage: false
		}
	];

	return (
		<div className={scss.main_page}>
			<div className={scss.aside}>
				<div className={scss.head}>
					<div>
						<img
							src={
								'https://s3-alpha-sig.figma.com/img/38ce/fde2/8d4d4905f82d6125c313a1f3a2867b1c?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b79MQyDX4XuJp5s-RhxyIXO7zQxTaeOYHkh1WVunHFcR4KF5CcA7MVPKQH8Ud1PMGOziDvy380C5KkEjvNFxwr6f~AMRIN9g0iMlvUc37kv40QcByB5zpuP7ZGbG2kKRoGW7IjJeql-vyUon1dHCRo~w-NDyrWH6S~NKkyT6654cC7DB5sVhbh~citbUWv8luDoqiEaVNYndoV2au32DSOWQttG7dgVTdj6hE-fQ4I5sGVAMjFK00l9mSA8-iT8YrSIltcY7Ujt6bLgX62or7HuDOtvkEWdlnFT1dbe~cqIg~Hb9h4z~If--MOuayPPoKEHwLBYNHXcvnjDEspHZgg__'
							}
							alt=""
						/>
					</div>
					<div className={scss.bar}>
						<div className={scss.user_img}>
							<img
								src={
									'https://i.pinimg.com/564x/ff/6d/a9/ff6da93f4a2a50401fe74ccee7ec23a0.jpg'
								}
								alt=""
							/>
						</div>
						<div className={scss.sidebar}>
							<div className={scss.col}>
								<div
									style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
								>
									<h4>Ivanov ivan</h4>
									<button onClick={() => {}}>
										<IconEdit />
									</button>
								</div>
								<div>
									<p>Что-то что-то</p>
								</div>
								<div className={scss.mobile}>
									<div
										style={{
											display: 'flex',
											gap: '5px',
											alignItems: 'center'
										}}
									>
										<IconBasket color="green" />
										<p style={{ fontSize: '13.2px', color: 'gray' }}>
											Фотограф
										</p>
									</div>
								</div>
							</div>
							<div className={scss.far}>
								<div>
									<h4>110</h4>
									<p>друзей </p>
								</div>
								<div
									className={isModalOpen ? scss.active_modal : ''}
									onClick={showModal}
								>
									<h4>365</h4>
									<p>паблики</p>
									<ModalTs open={isModalOpen} onCancel={() => {}}>
										<div className={scss.aside_modal}>
											<div>
												<MyFriends />
											</div>
										</div>
									</ModalTs>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={scss.links}>
					{links.map((link, index) => (
						<div key={index}>
							<Link
								className={`${pathname === link.path ? scss.active_page : scss.link}`}
								to={link.path}
								onClick={() => setPage(link.isPage)}
							>
								{link.icon}
								<p>{link.label}</p>
							</Link>
						</div>
					))}
				</div>
				<div>
					<Routes>
						<Route path="/public" element={<Publications />} />
						<Route path="/favorite" element={<Favourites />} />
						<Route path="/photo" element={<PhotoWith />} />
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default ProfilPage;
