import { Link, Route, Routes } from 'react-router-dom';
import Publications from './Publications';
import Favourites from './Favourites';
import PhotoWith from './PhotoWith';
import { useState } from 'react';
import scss from './Style.module.scss';
import { IconEdit } from '@tabler/icons-react';
import { IconBasket } from '@tabler/icons-react';
import { IconPhoto } from '@tabler/icons-react';
import { IconPinned } from '@tabler/icons-react';
import ModalTs from '@/src/UI/Modal/Modal';
import MyFriends from '@/src/UI/myFriends/MyFriends';
import line33 from '../../../../assets/line33.svg';
import baground from '../../../../assets/album.svg';
import avatar from '../../../../assets/userProfile.png';
import { Frame } from '@/src/assets/icons';
import vector from '../../../../assets/Close_round.svg';

const ProfilPage = () => {
	const [, setActiveItem] = useState<string>('/');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isOpen, setisOpen] = useState(false);

	const handleOpen = () => {
		setisOpen(!isOpen);
	};
	const handleCloseModal = () => {
		setisOpen(false);
	};

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
					<div className={scss.bag_icon}>
						<img src={baground} alt="" />
						<div className={scss.frame} onClick={handleOpen}>
							<Frame />
						</div>

						<ModalTs open={isOpen} onCancel={handleCloseModal}>
							<div className={scss.modal_ts}>
								<div className={scss.closeModal}>
									<h1>Пожаловаться</h1>
									<div className={scss.cloose}>
										<img onClick={handleCloseModal} src={vector} alt="" />
									</div>
								</div>
								<div className={scss.hring}>
									<span className={scss.hr}></span>
								</div>
								<div className={scss.h1_teg}>
									<h1 className={scss.h1}>
										Почему вы хотите пожаловаться на этого пользователя?{' '}
									</h1>
									<p>
										Ваша жалоба является анониной, за исключением случаев, когда
										вы сообщаете о нарушениях прав на интеллектуальную
										собственность
									</p>
								</div>
								<div className={scss.spaner}>
									<span className={scss.span1}> </span>
								</div>
								<div className={scss.let1}>
									<p>Ребенок младше 13 лет</p>
								</div>
								<div className={scss.spaner}>
									<span className={scss.span1}> </span>
								</div>
								<div className={scss.let1}>
									<p>Этот человек выдает себя за другого </p>
								</div>
								<div className={scss.spaner}>
									<span className={scss.span1}> </span>
								</div>
								<div className={scss.let1}>
									<p>Другие</p>
								</div>
							</div>
						</ModalTs>
					</div>
					<div className={scss.bar}>
						<div className={scss.user_img}>
							<img src={avatar} alt="" />
						</div>
						<div className={scss.sidebar}>
							<div className={scss.col}>
								<div
									style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
								>
									<h4>Ivanov ivan</h4>
									<IconEdit />
									<img className={scss.lines} src={line33} alt="" />
									<p className={scss.myfood}>Myfood</p>
								</div>
								<div>
									<p>Самая самая</p>
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
								<div
									style={{
										display: 'flex',
										gap: '20px'
									}}
								>
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
