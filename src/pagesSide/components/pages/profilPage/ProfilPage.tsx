import { useEffect, useState } from 'react';
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
import ModalTs from '@/src/ui/modal/Modal';
import MyFriends from '@/src/ui/myFriends/MyFriends';
import {
	IconEdit,
	IconBasket,
	IconPhoto,
	IconHeart,
	IconPinned
} from '@tabler/icons-react';
import scss from './Style.module.scss';

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
								'https://i.pinimg.com/564x/f6/da/51/f6da518578e44dde5d26460543c06e54.jpg'
							}
							alt="photo"
						/>
					</div>
					<div className={scss.bars}>
						<div className={scss.user_img}>
							<img
								src={
									'https://i.pinimg.com/564x/ff/6d/a9/ff6da93f4a2a50401fe74ccee7ec23a0.jpg'
								}
								alt="photo"
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
								<div className={scss.friends_count}>
									<h4>110</h4>
									<p>друзей </p>
								</div>
								<div
									className={
										isModalOpen ? scss.active_modal : scss.publics_count
									}
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
