// import { Link, Route, Routes } from 'react-router-dom';
// import Publications from './Publications';
// import Favourites from './Favourites';
// import PhotoWith from './PhotoWith';

// import {
// 	EditProfil,
// 	GreenBag,
// 	Heart,
// 	Mountain,
// 	Strengthen
// } from '@/src/assets/icons';
// import { useState } from 'react';
// import scss from './Style.module.scss';
// import ModalTs from '@/src/UI/Modal/Modal';
// import MyFriends from '@/src/UI/myFriends/MyFriends';

// const ProfilPage = () => {
// 	const [, setActiveItem] = useState<string>('/');
// 	const [isModalOpen, setIsModalOpen] = useState(false);

// 	const showModal = () => {
// 		setIsModalOpen(!isModalOpen);
// 	};

// 	const handleCancel = () => {
// 		setIsModalOpen(false);
// 	};

// 	return (
// 		<div className={scss.main_page}>
// 			<div className={scss.aside}>
// 				<div className={scss.head}>
// 					<div>
// 						<img
// 							src={
// 								'https://s3-alpha-sig.figma.com/img/38ce/fde2/8d4d4905f82d6125c313a1f3a2867b1c?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b79MQyDX4XuJp5s-RhxyIXO7zQxTaeOYHkh1WVunHFcR4KF5CcA7MVPKQH8Ud1PMGOziDvy380C5KkEjvNFxwr6f~AMRIN9g0iMlvUc37kv40QcByB5zpuP7ZGbG2kKRoGW7IjJeql-vyUon1dHCRo~w-NDyrWH6S~NKkyT6654cC7DB5sVhbh~citbUWv8luDoqiEaVNYndoV2au32DSOWQttG7dgVTdj6hE-fQ4I5sGVAMjFK00l9mSA8-iT8YrSIltcY7Ujt6bLgX62or7HuDOtvkEWdlnFT1dbe~cqIg~Hb9h4z~If--MOuayPPoKEHwLBYNHXcvnjDEspHZgg__'
// 							}
// 							alt=""
// 						/>
// 					</div>
// 					<div className={scss.bar}>
// 						<div className={scss.user_img}>
// 							<img
// 								src={
// 									'https://i.pinimg.com/564x/ff/6d/a9/ff6da93f4a2a50401fe74ccee7ec23a0.jpg'
// 								}
// 								alt=""
// 							/>
// 						</div>
// 						<div className={scss.sidebar}>
// 							<div className={scss.col}>
// 								<div
// 									style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
// 								>
// 									<h4>Ivanov ivan</h4>
// 									<EditProfil />
// 								</div>
// 								<div>
// 									<p>Что-то что-то</p>
// 								</div>
// 								<div className={scss.mobile}>
// 									<div
// 										style={{
// 											display: 'flex',
// 											gap: '5px',
// 											alignItems: 'center'
// 										}}
// 									>
// 										<GreenBag />
// 										<p style={{ fontSize: '13.4px', color: 'gray' }}>
// 											Фотограф
// 										</p>
// 									</div>
// 								</div>
// 							</div>
// 							<div className={scss.far}>
// 								<div>
// 									<h4>110</h4>
// 									<p>друзей </p>
// 								</div>
// 								<div
// 									className={isModalOpen ? scss.active_modal : ''}
// 									onClick={showModal}
// 								>
// 									<h4>365</h4>
// 									<p>паблики</p>
// 									<ModalTs open={isModalOpen} onCancel={handleCancel}>
// 										<div className={scss.aside_modal}>
// 											<div>
// 												<MyFriends />
// 											</div>
// 										</div>
// 									</ModalTs>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				<div className={scss.links}>
// 					<div>
// 						<Link
// 							className={`${location.pathname === 'side/public' ? scss.active_page : scss.link}`}
// 							to="side/public"
// 							onClick={() => setActiveItem('side/public')}
// 						>
// 							<Mountain />
// 							<p>Мои публикации</p>
// 						</Link>
// 					</div>
// 					<div>
// 						<Link
// 							className={`${location.pathname === 'side/favorite' ? scss.active_page : scss.link}`}
// 							to="side/favorite"
// 							onClick={() => setActiveItem('side/favorite')}
// 						>
// 							<Heart />
// 							<p>Избранное</p>
// 						</Link>
// 					</div>
// 					<div>
// 						<Link
// 							className={`${location.pathname === 'side/photo' ? scss.active_page : scss.link}`}
// 							to="side/photo"
// 							onClick={() => setActiveItem('side/photo')}
// 						>
// 							<Strengthen />
// 							<p>Фото с вами</p>
// 						</Link>
// 					</div>
// 				</div>

// 				<div>
// 					<Routes>
// 						<Route path="side/public" element={<Publications />} />
// 						<Route path="side/favorite" element={<Favourites />} />
// 						<Route path="side/photo" element={<PhotoWith />} />
// 					</Routes>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ProfilPage;
import { Link, Route, Routes } from 'react-router-dom';
import Publications from './Publications';
import Favourites from './Favourites';
import PhotoWith from './PhotoWith';

import userProfilImg from '../../../../assets/FirstMan2.png';
import backgroundImg from '../../../../assets/backgroundWhite.jpeg';

import { useState } from 'react';
import scss from './Style.module.scss';
import { IconEdit } from '@tabler/icons-react';
import { IconBasket } from '@tabler/icons-react';
import { IconPhoto } from '@tabler/icons-react';
import { IconHeart } from '@tabler/icons-react';
import { IconPinned } from '@tabler/icons-react';

const ProfilPage = () => {
	const [, setActiveItem] = useState<string>('/');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

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
									<IconEdit />
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
										<p style={{ fontSize: '13.4px', color: 'gray' }}>
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
									<ModalTs open={isModalOpen} onCancel={handleCancel}>
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
					<div>
						<Link
							className={`${location.pathname === 'side/public' ? scss.active_page : scss.link}`}
							to="side/public"
							onClick={() => setActiveItem('side/public')}
						>
							<IconPhoto color="black" />
							<p>Мои публикации</p>
						</Link>
					</div>
					<div>
						<Link
							className={`${location.pathname === 'side/favorite' ? scss.active_page : scss.link}`}
							to="side/favorite"
							onClick={() => setActiveItem('side/favorite')}
						>
							<IconHeart color="black" />
							<p>Избранное</p>
						</Link>
					</div>
					<div>
						<Link
							className={`${location.pathname === 'side/photo' ? scss.active_page : scss.link}`}
							to="side/photo"
							onClick={() => setActiveItem('side/photo')}
						>
							<IconPinned color="black" />
							<p>Фото с вами</p>
						</Link>
					</div>
				</div>

				<div>
					<Routes>
						<Route path="side/public" element={<Publications />} />
						<Route path="side/favorite" element={<Favourites />} />
						<Route path="side/photo" element={<PhotoWith />} />
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default ProfilPage;
