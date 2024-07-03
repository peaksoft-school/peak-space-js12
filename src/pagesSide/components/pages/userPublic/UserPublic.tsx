// @ts-nocheck
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
	IconPhotoVideo,
	IconPhoto,
	IconDots,
	IconHeart
} from '@tabler/icons-react';
import scss from './Style.module.scss';
import {
	useAddedCommentMutation,
	useCommentResponseQuery,
	useDeletePhotoByIdMutation,
	useGetIdQuery,
	useGetPublicPhotosQuery,
	useModalCommentQuery,
	usePostPublicByIdMutation,
	useLikeCommentMutation
} from '@/src/redux/api/userPublic';
import {
	useGetGeocodeQuery,
	usePostCreateFileMutation
} from '@/src/redux/api/publications';
import { PlusIconSecond, Smile } from '@/src/assets/icons';
import { Switch, Input, Skeleton, Tooltip } from 'antd';
import ModalTs from '@/src/ui/modal/Modal';
import CustomButton from '@/src/ui/customButton/CustomButton';
import { usePostComplainMutation } from '@/src/redux/api/complain';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const UserPublic = () => {
	const [inputStr, setInputStr] = useState('');
	const [showPicker, setShowPicker] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [showMessageIs, setShowMessageIs] = useState<any>({});
	const [createFile] = usePostCreateFileMutation();
	const [fileUrls, setFileUrls] = useState<string[]>([]);
	const [description, setDescription] = useState('');
	const [ellipsis, setEllipsis] = useState(true);
	const [postRequest] = usePostPublicByIdMutation();
	const [textRequest] = usePostComplainMutation();
	const [isModal, setIsModal] = useState(false);
	const [isTextModal, setIsTextModal] = useState(false);
	const [isCommentModal, setIsCommentModal] = useState(false);
	const [_, setSelectedReason] = useState('');
	const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
	const [deletePublicById] = useDeletePhotoByIdMutation();
	const [liked, setLiked] = useState(false);

	const [addedPostComment] = useAddedCommentMutation();

	const [commentResponseById, setCommetnResponseById] = useState<number | null>(
		null
	);
	const { data: commentResponse, isLoading: commentIsloading } =
		useCommentResponseQuery(commentResponseById, {
			skip: !commentResponseById
		});

	// const { pathname } = useLocation();

	// const [page, setPage] = useState(true);
	// const navigate = useNavigate();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleGetEmoji = (event: any) => {
		setInputStr((prevInput) => prevInput + event.native);
		setShowPicker(false);
	};

	const openModal = () => {
		setIsModal(true);
	};

	const closeModal = () => {
		setIsModal(false);
	};

	const openText = () => {
		setIsTextModal(true);
	};

	const closeText = () => {
		setIsTextModal(false);
	};

	const handleLikeClick = () => {
		setLiked(!liked);
	};

	const ShowMessageAgain = (id: any) => {
		setShowMessageIs((prevState: { [x: string]: string }) => ({
			...prevState,
			[id]: !prevState[id]
		}));
	};

	const [location, setLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

	const [likeRequest] = useLikeCommentMutation();
	const OneMoreLike = (commentId: number) => {
		likeRequest(commentId);
	};

	// useEffect(() => {
	// 	if (page) {
	// 		navigate('/user-public/communityId/*');
	// 	} else if (pathname === '/public-user-photos') {
	// 		navigate('/public-user-photos');
	// 	} else {
	// 		navigate('/public-video-video');
	// 	}
	// }, [page, pathname, navigate]);

	const reasons = [
		{ id: 'A', text: 'Это спам' },
		{ id: 'B', text: 'Враждебные высказывания или символы' },
		{ id: 'C', text: 'Насилие или опасные организации' },
		{
			id: 'D',
			text: 'Продажа незаконных или подлежащих правовому регулированию товаров'
		},
		{ id: 'E', text: 'Травля и преследование' },
		{ id: 'F', text: 'Нарушение прав на интеллектуальную собственность' },
		{ id: 'G', text: 'Самоубийство или нанесение себе увечий' },
		{ id: 'H', text: 'Мошенничество или обман' },
		{ id: 'I', text: 'Наркотические средства' },
		{ id: 'J', text: 'Ложная информация' },
		{ id: 'K', text: 'Мне не нравится' }
	];

	const links = [
		{
			path: '/public-photo',
			label: 'фотографии',
			icon: <IconPhoto color="black" />,
			isPage: true
		},
		{
			path: '/public-video',
			label: 'видео',
			icon: <IconPhotoVideo color="black" />,
			isPage: false
		}
	];
	const { TextArea } = Input;
	const { communityId } = useParams();

	const { data: photo } = useGetPublicPhotosQuery(communityId as any);
	console.log(photo);

	const { data: datas, isLoading } = useGetIdQuery(communityId as any);
	console.log(datas);
	const [publics, setPublics] = useState<any[]>([]);
	console.log(publics);

	const { data: modalData, isLoading: modalIsloading } = useModalCommentQuery(
		selectedPostId,
		{
			skip: !selectedPostId
		}
	);
	console.log(modalData);

	const [modalContent, setModalContent] = useState([]);
	console.log(modalContent);

	const handleAddCommentUser = (postId: number) => {
		const trimmedInputStr = inputStr.trim();
		if (trimmedInputStr === '') {
			return;
		}
		const newData = {
			message: trimmedInputStr
		};
		addedPostComment({ postId, newData });
		console.log(postId, 'nursultan');

		setInputStr('');
	};

	const handleInputChange = (e: any) => {
		setInputStr(e.target.value);
	};

	const handleInputKeyDown = (e: any, postId: number) => {
		if (e.key === 'Enter') {
			handleAddCommentUser(postId);
		}
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLocation({ latitude, longitude });
				},
				(error) => {
					console.error('Error getting location:', error);
				}
			);
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	}, []);

	const { data: locationString } = useGetGeocodeQuery(location, {
		skip: !location
	});

	useEffect(() => {
		if (datas) {
			const transformedData = [
				{
					id: datas.publicId,
					cover: datas.cover,
					avatar: datas.avatar,
					pablicName: datas.pablicName,
					userName: datas.userName,
					descriptionPublic: datas.descriptionPublic,
					tematica: datas.tematica,
					countFollower: datas.countFollower
				}
			];
			setPublics(transformedData);
		}
	}, [datas]);

	useEffect(() => {
		if (modalData) {
			const Data = [
				{
					id: modalData.id,
					avatar: modalData.avatar,
					blockComment: modalData.blockComment,
					countLikes: modalData.countLikes,
					description: modalData.description,
					links: modalData.links,
					location: modalData.location,
					userId: modalData.userId,
					userName: modalData.userName
				}
			];
			setModalContent(Data as any);
		}
	}, [modalData]);
	console.log(modalData);

	const showCommentModal = (id: number) => {
		if (id) {
			setSelectedPostId(id);
			setCommetnResponseById(id);
			setIsCommentModal(true);
		} else {
			console.error('Invalid postId:', id);
		}
	};

	const closeCommentModal = () => {
		setIsCommentModal(false);
		setSelectedPostId(null);
	};

	const RemoveById = (postId: number) => {
		deletePublicById(postId);
	};

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFilePhoto = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			const validTypes = ['image/png', 'image/jpeg'];

			if (!validTypes.includes(file.type)) {
				alert('Пожалуйста, загрузите файл формата PNG или JPG.');
				event.target.value = '';
				return;
			}

			const formData = new FormData();
			formData.append('file', file);

			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await createFile(formData as any);
				const test = JSON.parse(response.data);
				const newFileUrls: string[] = [test.object];
				setFileUrls(newFileUrls);
				openModal();
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const handleAddPublic = async (communityId: string | undefined) => {
		const newData = {
			links: fileUrls,
			description: description,
			location: locationString || 'is not found location',
			blockComment: ellipsis
		};
		try {
			await postRequest({ communityId, newData } as any).unwrap();
			setDescription('');
			closeModal();
			console.log('Публикация добавлена успешно');
		} catch (error) {
			console.error('Ошибка при добавлении публикации', error);
		}
	};

	const handleComplainUser = async (reason: any) => {
		try {
			const response = await textRequest({ complain: reason }).unwrap();
			console.log(response);
			alert('Жалоба успешно отправлена');
		} catch (error) {
			// alert('Ошибка при отправке жалобы');
			console.error('error');
		}
	};

	const handleReasonSelection = (reason: SetStateAction<string>) => {
		setSelectedReason(reason);
		handleComplainUser(reason); // Отправляем жалобу сразу при выборе причины
	};

	if (isLoading) {
		return (
			<div className={scss.error}>
				<Skeleton active />
				<Skeleton active />
				<Skeleton active />
				<Skeleton active />
				<Skeleton active />
				<Skeleton active />
			</div>
		);
	}

	if (modalIsloading) {
		return (
			<div className={scss.error}>{/* <Skeleton.Button active block /> */}</div>
		);
	}

	return (
		<div className={scss.main_page}>
			<div className={scss.aside}>
				{publics.map((item) => (
					<div>
						<div className={scss.head}>
							<div className={scss.cover_img}>
								<img src={item.cover} alt="Background" />
							</div>
							<div className={scss.bar}>
								<div className={scss.user_img}>
									<img src={item.avatar} alt="User" />
								</div>
								<div className={scss.side_bar}>
									<div className={scss.start}>
										<div className={scss.bar_aside}>
											<h4>{item.pablicName}</h4>
											<span></span>
											<p>{item.userName}</p>
										</div>
										<h4
											style={{
												width: '100%',
												display: '-webkit-box',
												maxWidth: '250px',
												WebkitLineClamp: 1,
												WebkitBoxOrient: 'vertical',
												overflow: 'hidden'
											}}
										>
											<Tooltip title={item.descriptionPublic}>
												{item.descriptionPublic}
											</Tooltip>
										</h4>
										<p>{item.tematica}</p>
									</div>
									<div className={scss.end}>
										<div>
											<h4>{item.countFollower}</h4>
											<p>участников</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}

				<div className={scss.links}>
					{links.map((link, index) => (
						<div key={index} className={scss.link}>
							{/* <Link
								className={`${pathname === link.path ? scss.active_page : scss.link}`}
								to={link.path}
								onClick={() => setPage(link.isPage)}
							> */}
							{link.icon}
							<p>{link.label}</p>
							{/* </Link> */}
						</div>
					))}
				</div>

				<div className={scss.down}>
					<div className={scss.bar} onClick={handleButtonClick}>
						<label>
							<PlusIconSecond />
							<p style={{ textAlign: 'center' }}>Добавить фото</p>
						</label>
						<input
							placeholder="file"
							type="file"
							ref={fileInputRef}
							style={{ display: 'none' }}
							onChange={handleFilePhoto}
							accept=".jpg, .png"
						/>
					</div>
					{photo?.map((item) => (
						<div key={item.id} className={scss.photos}>
							<img
								onClick={() => showCommentModal(item.id)}
								src={item.link}
								className={scss.image}
								alt=""
							/>
							<button onClick={() => ShowMessageAgain(item.id)}>
								<IconDots />
							</button>
							<div
								className={
									showMessageIs[item.id] ? scss.showMessage : scss.isNotMessage
								}
							>
								<p>Профиль участника</p>
								<h4 onClick={openText}>Пожаловаться</h4>
								<h4 onClick={() => RemoveById(item.id)}>Удалить</h4>
							</div>

							<ModalTs open={isCommentModal} onCancel={closeCommentModal}>
								<div className={scss.first_modal}>
									<div className={scss.center}>
										{modalContent?.map((item) => (
											<div className={scss.modal}>
												<div className={scss.user_img}>
													{item.links?.map((el) => (
														<img src={el.link} alt="" />
													))}
												</div>
												<div>
													<div className={scss.user_content}>
														<div className={scss.user_header}>
															<div className={scss.user_avatar}>
																<img src={item.avatar} alt="" />
																<div className={scss.user_text}>
																	<p>{item.userName}</p>
																	<h4>{item.location}</h4>
																</div>
															</div>

															<button>
																<IconDots />
															</button>
														</div>

														<div className={scss.user_content_main}>
															{commentIsloading ? (
																<>
																	<div className={scss.error}>
																		<Skeleton avatar paragraph={{ rows: 3 }} />
																	</div>
																</>
															) : (
																<>
																	{commentResponse?.map((item) => (
																		<div>
																			<div className={scss.main_center}>
																				<img src={item.avatar} alt="" />
																				<div>
																					<p>{item.userName}</p>
																					<div className={scss.like}>
																						<div>
																							<p className={scss.comment_width}>
																								{item.comment}
																							</p>
																							<p>
																								{new Date(
																									item.createdAt
																								).toLocaleString('ru-RU', {
																									hour: 'numeric',
																									minute: 'numeric',
																									day: '2-digit',
																									month: '2-digit',
																									year: 'numeric'
																								})}
																							</p>
																						</div>
																						<div className={scss.button_like}>
																							<p>{item.countLike}</p>
																							<button
																								onClick={() => {
																									OneMoreLike(item.id);
																									handleLikeClick();
																								}}
																							>
																								<IconHeart
																									className={
																										liked
																											? 'scss.icon'
																											: 'scss.heartIcon'
																									}
																									style={{
																										fill: liked
																											? 'red'
																											: 'none',
																										stroke: liked
																											? 'red'
																											: 'black'
																									}}
																								/>
																							</button>

																							<button
																							// onClick={() =>
																							// 	handleAddComment(item.id)
																							// }
																							>
																								Ответить
																							</button>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	))}
																</>
															)}
														</div>

														<div className={scss.input_smile}>
															<Smile
																onClick={() => setShowPicker((val) => !val)}
															/>
															<input
																type="text"
																placeholder="Добавить комментарий..."
																value={inputStr}
																onChange={handleInputChange}
																onKeyDown={(e) =>
																	handleInputKeyDown(e, item.id)
																}
															/>
															{showPicker && (
																<Picker
																	data={data}
																	onEmojiSelect={handleGetEmoji}
																	theme={'light'}
																/>
															)}
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</ModalTs>
						</div>
					))}
					<ModalTs open={isModal} onCancel={closeModal}>
						<div className={scss.is_modal}>
							<div className={scss.modal}>
								<div className={scss.added}>
									<div>
										<h3>Добавить сообщество</h3>

										<div className={scss.ui}>
											<TextArea
												showCount
												maxLength={100}
												value={description}
												onChange={(e) => setDescription(e.target.value)}
												placeholder="Описание..."
												style={{ height: 230, resize: 'none' }}
											/>
											<div className={scss.boolean}>
												<p>
													{ellipsis
														? 'Выключить комментарии'
														: 'Включить комментарии'}
												</p>
												<Switch
													checked={ellipsis}
													onChange={() => {
														setEllipsis(!ellipsis);
													}}
												/>
											</div>
										</div>
									</div>
									<div className={scss.buttons}>
										<CustomButton children="Отменить" onClick={closeModal} />

										<CustomButton
											onClick={() => handleAddPublic(communityId)}
											children={'Добавить'}
										/>
									</div>
								</div>
							</div>
						</div>
					</ModalTs>

					<ModalTs open={isTextModal} onCancel={closeText}>
						<div className={scss.text_modal}>
							<div className={scss.just_modal}>
								<h2>Пожаловаться</h2>
								<div>
									{reasons.map((el) => (
										<div key={el.id}>
											<p onClick={() => handleReasonSelection(el.id)}>
												{el.text}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</ModalTs>
				</div>
			</div>
		</div>
	);
};

export default UserPublic;
