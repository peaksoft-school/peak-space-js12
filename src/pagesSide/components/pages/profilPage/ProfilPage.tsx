/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key, ReactNode, ReactPortal, useEffect, useState } from 'react';
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
import type { SearchProps } from 'antd/es/input/Search';
import {
	IconEdit,
	IconPhoto,
	IconHeart,
	IconPinned,
	IconCirclePlus
} from '@tabler/icons-react';
import scss from './Style.module.scss';
import { useGetMyPublicationQuery } from '@/src/redux/api/publications';
import {
	useAddChaptersQuery,
	usePostChapterMutation,
	useUserFriendsQuery
} from '@/src/redux/api/usersProfile';
import ModalTs from '@/src/ui/modal/Modal';
import Search from 'antd/es/input/Search';
import CustomButton from '@/src/ui/customButton/CustomButton';
import { Input, Skeleton } from 'antd';

interface Types {
	userId: number;
	cover: string;
	avatar: string;
	userName: string;
	aboutMe: string;
	major: string;
	countFriends: number;
	countPablics: number;
}

const ProfilPage = () => {
	const { data, isLoading, error } = useGetMyPublicationQuery();
	const [profil, setProfil] = useState<Types[]>([]);
	const [friendById, setFriendById] = useState<number | null>(null);
	const { data: friendsData } = useUserFriendsQuery(friendById, {
		skip: !friendById
	});
	console.log(friendsData);

	const [chaptersById, setChaptersById] = useState<number | null>(null);
	const { data: chapters } = useAddChaptersQuery(chaptersById, {
		skip: !chaptersById
	});
	console.log(chapters);

	const { pathname } = useLocation();
	const [page, setPage] = useState(true);
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [addChapter] = usePostChapterMutation();
	const [isValue, setIsValue] = useState('');
	const [isModal, setIsModal] = useState(false);

	const navigateToEditPage = () => {
		navigate('/settings');
	};

	const showModal = (userId: number) => {
		if (userId) {
			setIsModalOpen(true);
			setFriendById(userId);
			setChaptersById(userId);
		} else {
			console.log('is not ', userId);
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setFriendById(null);
	};

	const openModal = () => {
		setIsModal(true);
	};

	const handleCloseModal = () => {
		setIsModal(false);
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

	useEffect(() => {
		if (data) {
			const transformedProfilData = [
				{
					aboutMe: data.aboutMe,
					avatar: data.avatar,
					countFriends: data.countFriends,
					countPablics: data.countPablics,
					cover: data.cover,
					major: data.major,
					publications: data.publications,
					userId: data.userId,
					userName: data.userName
				}
			];
			setProfil(transformedProfilData as any);
		}
	}, [data]);

	const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
		console.log(info?.source, value);

	const postRequestAddChapter = async () => {
		const newData = {
			groupName: isValue
		};
		await addChapter(newData);
		setIsValue('');
		handleCloseModal();
	};

	const navigateToProfile = (id: number) => {
		navigate(`users-profile/${id}`);
	};

	if (isLoading) {
		return (
			<div className={scss.error}>
				<Skeleton.Button active block />
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<div
					style={{
						height: '100vh'
					}}
				>
					<h1
						style={{
							fontFamily: "'Courier New', Courier, monospace",
							fontWeight: 'bold',
							textAlign: 'center'
						}}
					>
						Ошибка загрузки данных
					</h1>
				</div>
			</div>
		);
	}

	return (
		<div className={scss.main_page}>
			<div className={scss.aside}>
				{profil.map((item) => (
					<div className={scss.head}>
						<div className={scss.cover_img}>
							<img src={item.cover} alt="Background" />
						</div>
						<div className={scss.bar}>
							<div className={scss.user_img}>
								<img src={item.avatar} alt="User" />
							</div>

							<div className={scss.side_bar}>
								<div className={scss.col}>
									<div className={scss.row}>
										<h4>{item.userName}</h4>
										<button onClick={navigateToEditPage}>
											<IconEdit />
										</button>
									</div>
									<p>{item.aboutMe}</p>

									<p>{item.major}</p>
								</div>
								<div className={scss.fars}>
									<div
										onClick={() => showModal(item.userId!)}
										className={scss.friends_count}
									>
										<h4>{item.countFriends}</h4>
										<p>друзей </p>
									</div>
									<div className={scss.friends_count}>
										<h4>{item.countPablics}</h4>
										<p>паблики</p>
									</div>

									<ModalTs open={isModalOpen} onCancel={closeModal}>
										<div className={scss.is_friends}>
											<div className={scss.modal}>
												<div className={scss.header_friends}>
													<h2>Друзья</h2>
													<div className={scss.chapters}>
														<div className={scss.chapters_user}>
															{chapters?.map(
																(item: {
																	groupName:
																		| string
																		| number
																		| boolean
																		| Iterable<ReactNode>
																		| ReactPortal
																		| null
																		| undefined;
																}) => (
																	<div>
																		<p>{item.groupName}</p>
																	</div>
																)
															)}
														</div>
														<button onClick={openModal}>
															<IconCirclePlus />
														</button>

														<ModalTs open={isModal} onCancel={handleCloseModal}>
															<div className={scss.modal_chapter}>
																<div className={scss.modal}>
																	<h2>Cоздание раздела</h2>
																	<div className={scss.text}>
																		<Input
																			placeholder="Filled"
																			variant="filled"
																			value={isValue}
																			onChange={(e) =>
																				setIsValue(e.target.value)
																			}
																		/>

																		<div className={scss.buttons}>
																			<CustomButton
																				children={'отмена'}
																				onClick={handleCloseModal}
																			/>

																			<CustomButton
																				children={'добавить'}
																				onClick={postRequestAddChapter}
																			/>
																		</div>
																	</div>
																</div>
															</div>
														</ModalTs>
													</div>
												</div>
												<div className={scss.content_friends}>
													<div>
														<Search
															placeholder="input search text"
															onSearch={onSearch}
															enterButton
														/>
													</div>

													<div className={scss.center_friends}>
														{friendsData?.map(
															(item: {
																isUser: number;
																avatar: string | undefined;
																userName:
																	| string
																	| number
																	| boolean
																	| Iterable<ReactNode>
																	| ReactPortal
																	| null
																	| undefined;
																aboutMe:
																	| string
																	| number
																	| boolean
																	| Iterable<ReactNode>
																	| ReactPortal
																	| null
																	| undefined;
															}) => (
																<div className={scss.friends} key={item.isUser}>
																	<div className={scss.over}>
																		<img src={item.avatar} alt="" />
																		<div
																			onClick={() =>
																				navigateToProfile(item.isUser)
																			}
																			className={scss.dec}
																		>
																			<h4>{item.userName}</h4>
																			<p>{item.aboutMe}</p>
																		</div>
																	</div>

																	<CustomButton
																		children={'написать'}
																		onClick={function (): void {
																			throw new Error(
																				'Function not implemented.'
																			);
																		}}
																	/>
																</div>
															)
														)}
													</div>
												</div>
											</div>
										</div>
									</ModalTs>
								</div>
							</div>
						</div>
					</div>
				))}
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
