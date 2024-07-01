/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/rules-of-hooks */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react';
// import {
// 	Link,
// 	Route,
// 	Routes,
// 	useLocation,
// 	useNavigate,
// 	useParams
// } from 'react-router-dom';
// import { useGetFriendsQuery } from '@/src/redux/api/friends';
// import Publications from './Publications';
// import PhotoWith from './PhotoWith';
// import ModalTs from '@/src/ui/modal/Modal';
// import MyFriends from '@/src/ui/myFriends/MyFriends';
// import {
// 	IconEdit,
// 	IconPinned,
// 	IconBasket,
// 	IconPhoto,
// 	IconDots,
// 	IconX,
// 	IconCirclePlus,
// 	IconSearch
// } from '@tabler/icons-react';
// import scss from './Style.module.scss';

// const userProfile = () => {
// 	const [, setActiveItem] = useState<string>('/');
// 	const [isModalOpen, setIsModalOpen] = useState(false);

// 	const { foundUserId } = useParams();
// 	const { data, isLoading } = useGetFriendsQuery(foundUserId as any);
// 	console.log(data, 'mufa');

// 	const [complain, setComplain] = useState(false);
// 	const handleComplain = () => {
// 		setComplain(!complain);
// 	};

// 	const friends = [
// 		{
// 			id: 1,
// 			img: 'https://s3-alpha-sig.figma.com/img/5185/5aa5/919de2ceb7cc3f9db63f9b902dea21ad?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K-GBLvPlb0RRCTJey0D0gNdFf5pXhoWTTNfGZyVsnbZWPeyqggQBj0xre3~jebt994moeCDZNH8nq0NHrSHF-YYznzGYp9YC5O~PH1R-Z9XZY17BmSFffYRppd2fca3EuDcLcTSJOMFuTIjhFQ3rN1prp1ZoI0pFGHa~4bkSgKlK0F0GIiCr6xbX6JGL2hGw0K-wfW~HeBpkKGSR~yCFtUrzTsb6uVsN09v35IhHCOBg8nnJW5VidFZvUf-sSQsbhfYddWjJR3W97YyaN0EgG8nR4g5b3bYxrSVwIYiThzGNUwRdM~9vwLlRBJ1KBmCr3HIANJhEoUQ6OEKc1Swjsw__'
// 		},
// 		{
// 			id: 2,
// 			img: 'https://s3-alpha-sig.figma.com/img/476f/bf1e/199a8200cf77919c20dcbdcb942d3221?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=goL5tEEz-NnEH~~9mt6hBaDFYh7Hj9tl-JaKGgik43hWr3RGh9HhG3QXSZ0fJqOBnYTaOEQHbhdKPTB84DFL53SJAo9CNouXcPiB0ywlV-AURhKBFax1SjvtjeykUUSV8p65j-d4aTMzHJ8~K-Sj-Uuipo17yZOCQ3lXQV~OsHWo~cbFanAG6ZxfXiPFd9sSTfBbRfHS8Pjnyuz955gDoaes4H1wSuF3ZP1yr8bnSytIkunk4T8l6dvnWXmEJgjHbKJ2wf5NDxsXesfZa41UmtC4t3mg94Bmu4jOmjzBfETiqA7-yaUHLK9OBmZVa3GdWNwn~NqBHSmKK0qnaos47Q__'
// 		},
// 		{
// 			id: 3,
// 			img: 'https://s3-alpha-sig.figma.com/img/5180/c727/4a468ba221dccc98237c5b89acc690bd?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SHp7~cONtemP5x0W4E2qmaCGq8q1owTiMpbhX88Q9Bx0iCp-FnKu44spV4pSAzPswoNIP3cd9abgLMnL-uBVezJQD~Q~2fYYGTpcXV2GiaUiaRT969O2xHs23YCkHpwqvRodIgC197NoPqe-njAYXGPl8MlGxzvta-rN9rl94obgHfdMaBksAlGZxpx~8oRDRb-VYwikjTFmgaJ07ymGLvpAVQrfERGnClrBRop6YWIsiRgCASDN6TWzUz5ML8iAzKuOlgn7MISONjhtya1pZCnZRgTaiP8bJ-U-UdvbvLtk8m8oMrNwYxWWCW823ICMjpN8THe1lCsxpyHN5IriiA__'
// 		}
// 	];
// 	// !
// 	const [isOpen, setIsOpen] = useState(false);
// 	const handleOpen = () => {
// 		setIsOpen(true);
// 		setComplain(false);
// 	};

// 	const handleCloseModal = () => {
// 		setIsOpen(false);
// 	};
// 	// !

// 	//! 2
// 	const [isOpen2, setIsOpen2] = useState(false);
// 	const handleOpen2 = () => {
// 		setIsOpen2(true);
// 		setComplain(false);
// 	};

// 	const handleCloseModal2 = () => {
// 		setIsOpen2(false);
// 	};
// 	// !2

// 	// !3
// 	const [isOpen3, setIsOpen3] = useState(false);
// 	const handleOpen3 = () => {
// 		setIsOpen3(true);
// 		setComplain(false);
// 	};

// 	const handleCloseModal3 = () => {
// 		setIsOpen3(false);
// 	};

// 	// !3
// 	// !4
// 	const [isOpen4, setIsOpen4] = useState(false);

// 	const handleOpen4 = () => {
// 		setIsOpen4(true);
// 		setIsOpen3(false);
// 	};

// 	const handleCloseModal4 = () => {
// 		setIsOpen4(false);
// 	};

// 	// !4

// 	const showModal = () => {
// 		setIsModalOpen(!isModalOpen);
// 	};

// 	const handleCancel = () => {
// 		setIsModalOpen(false);
// 	};

// 	const navigate = useNavigate();
// 	const handlePublic = () => {
// 		navigate('/publics');
// 	};

// 	const location = useLocation();

// 	return (
// 		<div className={scss.main_pages}>
// 			<div className={scss.aside}>
// 				{isLoading ? (
// 					<>
// 						<h1>Isloading...</h1>
// 					</>
// 				) : (
// 					<>
// 						{data?.map((item) => (
// 							<div className={scss.head} key={item.id}>
// 								<div className={scss.bag_icon}>
// 									<span>
// 										<img src={item.cover} alt="photo" />
// 										<button className={scss.frame} onClick={handleComplain}>
// 											<IconDots color="white" />
// 										</button>
// 									</span>

// 									{complain && (
// 										<div className={scss.comp}>
// 											<h4 onClick={handleOpen2}>заблокировать пользователя</h4>
// 											<span className={scss.span}></span>
// 											<p onClick={handleOpen}>пожаловаться</p>
// 										</div>
// 									)}

// 									<ModalTs open={isOpen2} onCancel={handleCloseModal2}>
// 										<div className={scss.modalss}>
// 											<div>
// 												<h2>Заблокировать krgz.132?</h2>
// 											</div>
// 											<p>
// 												Этот пользователь не сможет найти ваш профиль,
// 												публикации или истории в peak-space и не узнает о том,
// 												что вы его заблокировали.
// 											</p>
// 											<div className={scss.buttons}>
// 												<button onClick={handleCloseModal2}>
// 													Заблокировать
// 												</button>
// 												<button onClick={handleCloseModal2}>Отмена </button>
// 											</div>
// 										</div>
// 									</ModalTs>

// 									<ModalTs open={isOpen} onCancel={handleCloseModal}>
// 										<div className={scss.wrap}>
// 											<div className={scss.modal_ts}>
// 												<div className={scss.closeModal}>
// 													<h1>Пожаловаться</h1>
// 													<div className={scss.cloose}>
// 														<button onClick={handleCloseModal}>
// 															<IconX />
// 														</button>
// 													</div>
// 												</div>
// 												<div className={scss.hring}>
// 													<span className={scss.hr}></span>
// 												</div>
// 												<div className={scss.h1_teg}>
// 													<h1 className={scss.h1}>
// 														Почему вы хотите пожаловаться на этого пользователя?{' '}
// 													</h1>
// 													<p>
// 														Ваша жалоба является анониной, за исключением
// 														случаев, когда вы сообщаете о нарушениях прав на
// 														интеллектуальную собственность
// 													</p>
// 												</div>
// 												<div className={scss.spaner}>
// 													<span className={scss.span1}> </span>
// 												</div>
// 												<div className={scss.let1}>
// 													<p>Ребенок младше 13 лет</p>
// 												</div>
// 												<div className={scss.spaner}>
// 													<span className={scss.span1}> </span>
// 												</div>
// 												<div className={scss.let1}>
// 													<p>Этот человек выдает себя за другого </p>
// 												</div>
// 												<div className={scss.spaner}>
// 													<span className={scss.span1}> </span>
// 												</div>
// 												<div className={scss.let1}>
// 													<p>Другие</p>
// 												</div>
// 											</div>
// 										</div>
// 									</ModalTs>
// 								</div>

// 								<div className={scss.bar}>
// 									<div className={scss.user_img}>
// 										<img src={item.avatar} alt="avatar" />
// 									</div>
// 									<div className={scss.sidebar}>
// 										<div className={scss.col}>
// 											<div
// 												style={{
// 													display: 'flex',
// 													gap: '5px',
// 													alignItems: 'center'
// 												}}
// 											>
// 												<h4>{item.userName}</h4>
// 												<IconEdit color="rgb(119, 114, 114)" />
// 												<span></span>
// 												<p onClick={handlePublic} className={scss.myfood}>
// 													Myfood
// 												</p>
// 											</div>
// 											<div>
// 												<p>{item.aboutYourSelf}</p>
// 											</div>
// 											<div className={scss.mobile}>
// 												<div
// 													style={{
// 														display: 'flex',
// 														gap: '5px',
// 														alignItems: 'center'
// 													}}
// 												>
// 													<IconBasket color="green" />
// 													<p style={{ fontSize: '13.2px', color: 'gray' }}>
// 														{item.profession}
// 													</p>
// 												</div>
// 											</div>
// 										</div>
// 										<div className={scss.far}>
// 											<div style={{ display: 'flex', gap: '20px' }}>
// 												<div>
// 													<h4>{item.friendsSize}</h4>
// 													<p>друзей</p>
// 												</div>
// 												<div
// 													className={isModalOpen ? scss.active_modal : ''}
// 													onClick={showModal}
// 												>
// 													<h4>{item.publicationsSize}</h4>
// 													<p>паблики</p>
// 													<ModalTs open={isModalOpen} onCancel={handleCancel}>
// 														<div className={scss.aside_modal}>
// 															<div>
// 																<MyFriends />
// 															</div>
// 														</div>
// 													</ModalTs>
// 												</div>
// 											</div>
// 											<div className={scss.button}>
// 												<button onClick={handleOpen3}>дружить</button>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						))}
// 					</>
// 				)}

// 				<ModalTs open={isOpen3} onCancel={handleCloseModal3}>
// 					<div className={scss.friends}>
// 						<div className={scss.containers}>
// 							<h1>Друзья</h1>
// 							<nav>
// 								<ul></ul>
// 								<p>Добавить раздел</p>
// 								<IconCirclePlus
// 									stroke={1}
// 									className={scss.plus_icon}
// 									onClick={() => {}}
// 								/>
// 							</nav>

// 							<div className={scss.search_container}>
// 								<IconSearch className={scss.search_img} />
// 								<input placeholder="Поиск" />
// 							</div>
// 							<div>
// 								<div onClick={handleOpen4} className={scss.form}>
// 									<img
// 										className={scss.images3}
// 										src={friends[2].img}
// 										alt="logo"
// 									/>
// 									<img
// 										className={scss.images1}
// 										src={friends[0].img}
// 										alt="logo"
// 									/>
// 									<img
// 										className={scss.images2}
// 										src={friends[1].img}
// 										alt="logo"
// 									/>
// 								</div>
// 								<h1 className={scss.h1}>Друзья</h1>
// 							</div>
// 						</div>
// 					</div>
// 				</ModalTs>

// 				<ModalTs open={isOpen4} onCancel={handleCloseModal4}>
// 					<div className={scss.modal_friends}>
// 						<div className={scss.text_icon}>
// 							<h1>Друзья</h1>
// 							<IconCirclePlus
// 								stroke={1}
// 								className={scss.plus_icon}
// 								onClick={() => {}}
// 							/>
// 						</div>

// 						<div className={scss.search_container}>
// 							<IconSearch className={scss.search_img} />
// 							<input placeholder="Поиск" />
// 						</div>
// 						<div className={scss.box}>
// 							{isLoading ? (
// 								<>
// 									<h1>Loading....</h1>
// 								</>
// 							) : (
// 								<>
// 									{/* {data?.map((item, index) => (
// 										<div key={index} className={scss.cards}>
// 											<div className={scss.start}>
// 												<img src={item.img} alt={item.name} />
// 												<div className={scss.text}>
// 													<h3>{item.name}</h3>
// 													<h4>{item.title}</h4>
// 												</div>
// 											</div>
// 											<button>удалить</button>
// 										</div>
// 									))} */}
// 								</>
// 							)}
// 						</div>
// 					</div>
// 				</ModalTs>
// 				<div className={scss.links}>
// 					<div>
// 						<Link
// 							className={
// 								location.pathname === '/UsersProfile/side/public'
// 									? `${scss.link} ${scss.active_pages}`
// 									: `${scss.link}`
// 							}
// 							to="side/public"
// 							onClick={() => setActiveItem('side/public')}
// 						>
// 							<IconPhoto color="black" />
// 							<p>Мои публикации</p>
// 						</Link>
// 					</div>

// 					<div>
// 						<Link
// 							className={
// 								location.pathname === '/UsersProfile/side/photo'
// 									? `${scss.link} ${scss.active_pages}`
// 									: `${scss.link}`
// 							}
// 							to="side/photo"
// 							onClick={() => setActiveItem('side/photo')}
// 						>
// 							<IconPinned color="black" />
// 							<p>Фото с вами</p>
// 						</Link>
// 					</div>
// 				</div>

// 				<div>
// 					<Routes>
// 						<Route path="side/public" element={<Publications />} />
// 						<Route path="side/photo" element={<PhotoWith />} />
// 					</Routes>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default userProfile;

import scss from './Style.module.scss';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import {
	IconDots,
	IconEdit,
	IconPhoto,
	IconPinned,
	IconX
} from '@tabler/icons-react';
import {
	useGetFriendsQuery,
	useGetPhotoFriendQuery
} from '@/src/redux/api/friends';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import PhotoWith from './PhotoWith';
import UserPublics from './UserPublics';
import ModalTs from '@/src/ui/modal/Modal';
import { usePutBlockedUsersMutation } from '@/src/redux/api/blocked';

interface Types {
	id: number;
	avatar: string;
	cover: string;
	userName: string;
	aboutYourSelf: string;
	profession: string;
	friendsSize: number;
	publicationsSize: number;
}

const UsersProfile = () => {
	const { idUser } = useParams();
	const { data } = useGetFriendsQuery<Types[]>(idUser as any);
	console.log(data);

	const [profile, setProfile] = useState<Types[]>([]);
	const { data: userPhoto } = useGetPhotoFriendQuery(idUser as any);
	const [putRequest] = usePutBlockedUsersMutation();
	const { pathname } = useLocation();
	const [page, setPage] = useState(true);
	const navigate = useNavigate();
	const [isSecondModal, setIsSecondModal] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const [complain, setComplain] = useState(false);

	const handleComplain = () => {
		setComplain(!complain);
	};

	const secondModalOpen = () => {
		setIsSecondModal(true);
	};

	const secondModalClose = () => {
		setIsSecondModal(false);
		setComplain(false);
	};

	const links = [
		{
			path: '/user-profile/publics',
			icon: <IconPhoto color="black" />,
			label: 'Мои публикации',
			isPage: true
		},
		{
			path: '/user-profile/photo',
			icon: <IconPinned color="black" />,
			label: 'Фото с вами',
			isPage: false
		}
	];

	const success = () => {
		messageApi.open({
			type: 'success',
			content: 'Удачно блокировано!'
		});
	};

	const blockUser = async (id: number) => {
		const response = await putRequest(id);
		if (response.data.httpStatus === 'OK') {
			success();
		}
	};

	// useEffect(() => {
	// 	if (page) {
	// 		navigate('/user-profile/publics');
	// 	} else if (pathname === '/user-profile/photo') {
	// 		navigate('/user-profile/photo');
	// 	}
	// }, [page, pathname, navigate]);

	useEffect(() => {
		if (data) {
			const transformedProfileData = [
				{
					id: data.id,
					avatar: data.avatar,
					cover: data.cover,
					userName: data.userName,
					aboutYourSelf: data.aboutYourSelf,
					profession: data.profession,
					friendsSize: data.friendsSize,
					publicationsSize: data.publicationsSize
				}
			];
			setProfile(transformedProfileData as any);
		}
	}, [data]);

	return (
		<div className={scss.UserProfile}>
			<div className={scss.content}>
				<div>
					{profile.map((item) => (
						<div className={scss.head}>
							{contextHolder}
							<div className={scss.cover_img}>
								<img src={item.cover} alt="Background" />
								<button onClick={handleComplain}>
									<IconDots />
								</button>

								<div className={complain ? scss.active : scss.default}>
									<h4
										onClick={() => blockUser(item.id)}
										style={{ color: 'rgb(207, 22, 22)', cursor: 'pointer' }}
									>
										заблокировать пользователя
									</h4>
									<span className={scss.span}></span>
									<p onClick={secondModalOpen}>пожаловаться</p>
								</div>

								<ModalTs open={isSecondModal} onCancel={secondModalClose}>
									<div className={scss.wrap}>
										<div className={scss.modal_ts}>
											<div className={scss.closeModal}>
												<h1>Пожаловаться</h1>
												<div className={scss.cloose}>
													<button onClick={secondModalClose}>
														<IconX />
													</button>
												</div>
											</div>
											<div className={scss.hring}>
												<span className={scss.hr}></span>
											</div>
											<div className={scss.h1_teg}>
												<h1 className={scss.h1}>
													Почему вы хотите пожаловаться на этого пользователя?
												</h1>
												<p>
													Ваша жалоба является анониной, за исключением случаев,
													когда вы сообщаете о нарушениях прав на
													интеллектуальную собственность
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
									</div>
								</ModalTs>
							</div>
							<div className={scss.bar}>
								<div className={scss.user_img}>
									<img src={item.avatar} alt="User" />
								</div>

								<div className={scss.side_bar}>
									<div className={scss.col}>
										<div className={scss.row}>
											<h4>{item.userName}</h4>
											<button>
												<IconEdit />
											</button>
										</div>
										<p>{item.aboutYourSelf}</p>

										<p>{item.profession}</p>
									</div>
									<div className={scss.fars}>
										<div className={scss.friends_count_user}>
											<h4>{item.friendsSize}</h4>
											<p>друзей </p>
										</div>
										<div className={scss.friends_count_user}>
											<h4>{item.publicationsSize}</h4>
											<p>паблики</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
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

				<div className={scss.imgs}>
					{userPhoto?.map((item: { linkPublications: any[] }) => (
						<div className={scss.user_img}>
							{item.linkPublications.map((el) => (
								<div>
									<img src={el.link} alt="" />
								</div>
							))}
						</div>
					))}

					{/* <Routes>
						<Route path="/publics" element={<UserPublics />} />
						<Route path="/photo" element={<PhotoWith />} />
					</Routes> */}
				</div>
			</div>
		</div>
	);
};

export default UsersProfile;
