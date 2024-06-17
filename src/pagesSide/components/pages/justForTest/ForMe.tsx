/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	useAddedCommentMutation,
	useCommentPostMutation,
	useDeleteIdMutation,
	useDeletePhotoByIdMutation,
	useEditCommentMutation,
	useEditPublicMutation,
	useGetIdQuery,
	useGetPublicPhotosQuery,
	useInnerCommentDeleteMutation,
	useLikeCommentMutation,
	useModalCommentQuery,
	usePostPublicByIdMutation,
	useRemoveUserInPublicMutation
} from '@/src/redux/api/userPublic';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import scss from './ForMe.module.scss';
import { IconCamera, IconDots, IconHeart } from '@tabler/icons-react';
import {
	useGetGeocodeQuery,
	usePostCreateFileMutation
} from '@/src/redux/api/publications';
import { PencilIcon, PlusIconSecond } from '@/src/assets/icons'; 
import ModalTs from '@/src/ui/modal/Modal';
import { Switch } from 'antd';
import { Smile } from '@/src/assets/icons';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import CustomButton from '@/src/ui/customButton/CustomButton';
import CustomButtonBold from '@/src/ui/customButton/CustomButtonBold';
const ForMe = () => {
	const { communityId } = useParams();

	const { data: datas, refetch } = useGetIdQuery(communityId as any);
	console.log(datas);

	const { data: photo } = useGetPublicPhotosQuery(communityId as any);
	console.log(photo);

	const [publics, setPublics] = useState<any[]>([]);

	const [isMessage, setIsMessage] = useState(false);
	const [editRequest] = useEditPublicMutation();
	const [deleteRequest] = useDeleteIdMutation();
	const [deletePublicById] = useDeletePhotoByIdMutation();
	const [isEdit, setIsEdit] = useState(null);
	const [editCover, setEdtiCover] = useState('');
	const [edtiAvatar, setEditAvatar] = useState('');
	const [editTematica, setEditTematica] = useState('');
	const [editPablicName, setEditPablicName] = useState('');
	const [editDescriptionPublic, setEditDescriptionPublic] = useState('');
	const [fileUrls, setFileUrls] = useState<string[]>([]);
	const [description, setDescription] = useState('');
	const [ellipsis, setEllipsis] = useState(true);
	const [location, setLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);
	const [isModal, setIsModal] = useState(false);
	const [removeUserInPublic] = useRemoveUserInPublicMutation();
	const [showMessageIs, setShowMessageIs] = useState<any>({});
	const [postRequest] = usePostPublicByIdMutation();
	const [createFile] = usePostCreateFileMutation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const coverInputRef = useRef<HTMLInputElement>(null);
	const avatarInputRef = useRef<HTMLInputElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [inputStr, setInputStr] = useState('');
	const [showPicker, setShowPicker] = useState(false);
	const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
	const [isComment, setIsComment] = useState(false);
	const [commentById, setCommentById] = useState<number | null>(null);
	const [comment, setComment] = useState('');
	const [isModalCommnet, setIsModalComment] = useState(false);
	const [postComment] = useCommentPostMutation();
	const [deleteComment] = useInnerCommentDeleteMutation();
	const [deleteCommentById, setDeleteCommentById] = useState<number | null>(
		null
	);
	const [putRequest] = useEditCommentMutation();
	const [isEditComment, setIsEditCommnet] = useState(null);
	const [editComment, setEditComment] = useState('');
	const [likeRequest] = useLikeCommentMutation();
	const [addedPostComment] = useAddedCommentMutation();
	const navigate = useNavigate();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleGetEmoji = (event: any) => {
		setInputStr((prevInput) => prevInput + event.native);
		setShowPicker(false);
	};

	const showModal = (id: number) => {
		if (id) {
			setSelectedPostId(id);
			setIsModalOpen(true);
		} else {
			console.error('Invalid postId:', id);
		}
	};

	const { data: modalData } = useModalCommentQuery(selectedPostId, {
		skip: !selectedPostId
	});
	console.log(modalData);

	const [modalContent, setModalContent] = useState([]);
	console.log(modalContent);

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const handleChooseCover = () => {
		if (coverInputRef.current) {
			coverInputRef.current.click();
		}
	};

	const handleAvatar = () => {
		if (avatarInputRef.current) {
			avatarInputRef.current.click();
		}
	};

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const openModal = () => {
		setIsModal(true);
	};

	const closeModal = () => {
		setIsModal(false);
	};

	const openModalComment = (id: number) => {
		setIsModalComment(true);
		setDeleteCommentById(id);
	};

	const closeModalComment = () => {
		setIsModalComment(false);
		setDeleteCommentById(null);
	};

	// const links = [
	// 	{
	// 		link: '/public/photo',
	// 		title: 'фотографии',
	// 		icon: <IconPhoto color="black" />,
	// 		isPage: true
	// 	},
	// 	{
	// 		link: '/public/video',
	// 		title: 'видео',
	// 		icon: <IconPhotoVideo color="black" />,
	// 		isPage: false
	// 	}
	// ];

	const editCommentById = (item: any) => {
		setEditComment(item.comment);
		setIsEditCommnet(item.id);
		closeModalComment();
	};

	const saveEditComment = (commentId: number) => {
		const newData = {
			message: editComment
		};
		putRequest({ commentId, newData });
		setIsEditCommnet(null);
	};

	const deleteUserPublic = (friendId: number) => {
		removeUserInPublic(friendId);
	};

	const ShowMessageAgain = (id: any) => {
		setShowMessageIs((prevState: { [x: string]: string }) => ({
			...prevState,
			[id]: !prevState[id]
		}));
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

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			const formData = new FormData();

			formData.append('file', file);

			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await createFile(formData as any);
				const test = JSON.parse(response.data);
				setEdtiCover(test.object);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const handleAddAvatar = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			const formData = new FormData();

			formData.append('file', file);

			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await createFile(formData as any);
				const test = JSON.parse(response.data);
				setEditAvatar(test.object);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	useEffect(() => {
		if (datas) {
			const Data = [
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
			setPublics(Data);
		}
		refetch();
	}, [datas]);

	//! modal content

	useEffect(() => {
		if (modalData) {
			const Data = [
				{
					id: modalData.id,
					avatar: modalData.avatar,
					blockComment: modalData.blockComment,
					commentResponses: modalData.commentResponses,
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
		refetch();
	}, [modalData, refetch]);

	const showMessage = () => {
		setIsMessage(!isMessage);
	};

	const edit = (item: any) => {
		setEdtiCover(item.cover);
		setEditAvatar(item.avatar);
		setEditTematica(item.tematica);
		setEditPablicName(item.pablicName);
		setEditDescriptionPublic(item.descriptionPublic);
		setIsEdit(item.id);
		setIsMessage(false);
	};

	const saveEdit = async (id?: number) => {
		const newData = {
			cover: editCover,
			avatar: edtiAvatar,
			pablicName: editPablicName,
			tematica: editTematica,
			descriptionPublic: editDescriptionPublic
		};
		await editRequest(newData);
		setIsEdit(null);
	};
	const removeId = (publicId: number) => {
		deleteRequest(publicId);
		navigate('/public');
	};

	const handleFilePhoto = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			const newFileUrls: string[] = [];
			const formData = new FormData();

			formData.append('file', file);

			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await createFile(formData as any);
				const test = JSON.parse(response.data);
				newFileUrls.push(test.object);
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

	const RemoveById = (postId: number) => {
		deletePublicById(postId);
	};

	const handleAddComment = (id: number) => {
		console.log(id, 'commentById');
		setCommentById(id);

		setIsComment(!isComment);
	};

	const handleSubmitComment = () => {
		const newData = {
			message: comment
		};
		postComment({ commentId: commentById, newData });
		setIsComment(false);
		setComment('');
	};

	const removeCommetById = (commentId: number) => {
		deleteComment(commentId);
		closeModalComment();
	};

	const OneMoreLike = (commentId: number) => {
		console.log(commentId, 'nurs');

		likeRequest(commentId);
	};

	const handleAddCommentUser = (postId:number) => {
		const newData = {
			message: inputStr
		};
		addedPostComment({ postId, newData });
		setInputStr(''); 
	};

	const handleInputChange = (e:any) => {
		setInputStr(e.target.value);
	};

	const handleInputKeyDown = (e:any, postId:number) => {
		if (e.key === 'Enter') {
			handleAddCommentUser(postId);
		}
	};

	return (
		<div className={scss.nursultan}>
			<div className={scss.Forme}>
				<div className={scss.content}>
					{publics?.map((item) => (
						<>
							{isEdit === item.id ? (
								<>
									<div className={scss.container}>
										<div className={scss.user_avatar_and_cover}>
											<div className={scss.user_cover}>
												<img
													className={scss.cover_img}
													style={{ display: editCover ? 'block' : 'none' }}
													src={editCover}
													alt="#"
												/>
												<input
													onChange={handleFileChange}
													type="file"
													ref={coverInputRef}
													style={{ display: 'none' }}
												/>
												<div
													className={scss.cover_choose_btn}
													onClick={handleChooseCover}
												>
													<PencilIcon className={scss.pencil_icon} />
													<p>
														{editCover
															? 'Изменить обложку'
															: 'Добавить обложку'}
													</p>
												</div>
											</div>
											<div className={scss.user_avatar}>
												<div className={scss.for}>
													<input
														type="file"
														ref={avatarInputRef}
														style={{ display: 'none' }}
														onChange={handleAddAvatar}
													/>
													<img
														className={scss.userEditProfile}
														src={edtiAvatar}
														alt=""
													/>
													<IconCamera
														color="rgba(255, 255, 255, 0.637)"
														onClick={handleAvatar}
														className={scss.editProfileIcon}
													/>
												</div>
											</div>
										</div>
										<div className={scss.public_content}>
											<div className={scss.user_name}>
												<p>Название Сообщества</p>
												<input
													className={scss.user_name_input}
													value={editPablicName}
													onChange={(e) => setEditPablicName(e.target.value)}
													placeholder="Felicity___"
												/>
											</div>
											<div className={scss.about_public}>
												<p>О паблике</p>
												<textarea
													value={editDescriptionPublic}
													onChange={(e) =>
														setEditDescriptionPublic(e.target.value)
													}
													placeholder="Воспылай своим сердцем"
												></textarea>
											</div>
											<div className={scss.subject_matter}>
												<p>Тематика</p>
												<select
													value={editTematica}
													onChange={(e) => setEditTematica(e.target.value)}
												>
													<option value="">CHOOSE SUBJECT MATTER</option>
													<option value="MOVIE">MOVIE</option>
													<option value="MUSIC">MUSIC</option>
													<option value="IT">IT</option>
													<option value="HORROR">HORROR</option>
													<option value="SPORT">SPORT</option>
													<option value="MULTFILM">MULTFILM</option>
													<option value="ANIME">ANIME</option>
													<option value="MEDICINE">MEDICINE</option>
													<option value="TRANSPORT">TRANSPORT</option>
													<option value="CONSTRUCTION">CONSTRUCTION</option>
													<option value="FINANCE">FINANCE</option>
													<option value="TOURISM">TOURISM</option>
												</select>
											</div>
											<div className={scss.save_public_button_container}>
												<button
													onClick={() => setIsEdit(null)}
													className={scss.save_public_button}
												>
													отменить
												</button>
												<button
													onClick={() => saveEdit(item.id)}
													className={scss.save_public_button}
												>
													Сохранить
												</button>
											</div>
										</div>
									</div>
								</>
							) : (
								<>
									<div className={scss.head}>
										<div className={scss.cover_img}>
											<img src={item.cover} alt="Background" />
											<button onClick={showMessage}>
												<IconDots />
											</button>

											<div className={isMessage ? scss.active : scss.default}>
												<p onClick={() => edit(item)}>редактировать</p>
												<span></span>
												<p onClick={() => removeId(item.id)}>удалить</p>
											</div>
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
													<h4>{item.descriptionPublic}</h4>
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
								</>
							)}
						</>
					))}

					<div className={scss.down}>
						<div className={scss.bar} onClick={handleButtonClick}>
							<label>
								<PlusIconSecond />
								<p style={{ textAlign: 'center' }}>
									Добавить <br /> фото
								</p>
							</label>
							<input
								placeholder="file"
								type="file"
								ref={fileInputRef}
								style={{ display: 'none' }}
								onChange={handleFilePhoto}
							/>
						</div>

						{photo?.map((item) => (
							<>
								<div key={item.id} className={scss.photos}>
									<img
										src={item.link}
										onClick={() => showModal(item.id)}
										className={scss.image}
										alt=""
									/>
									<button onClick={() => ShowMessageAgain(item.id)}>
										<IconDots />
									</button>
									<div
										className={
											showMessageIs[item.id]
												? scss.showMessage
												: scss.isNotMessage
										}
									>
										<p onClick={() => deleteUserPublic(item.ownerId)}>
											удалить пользователя
										</p>
										<h4 onClick={() => RemoveById(item.id)}>удалить</h4>
									</div>
								</div>

								<ModalTs open={isModalOpen} onCancel={handleCancel}>
									<div className={scss.tool_tip}>
										{modalContent.map((item) => (
											<>
												<div className={scss.open_modal}>
													<div className={scss.slider}>
														{item.links.map((el) => (
															<img src={el.link} alt="" />
														))}
													</div>
													<div className={scss.aside_bar}>
														<div>
															<div className={scss.header}>
																<div className={scss.avatar}>
																	<img src={item.avatar} alt="" />
																	<div>
																		<p>{item.userName}</p>
																		<p>{item.location}</p>
																	</div>
																</div>
																<button>
																	<IconDots />
																</button>
															</div>
															<div>
																{item.commentResponses.map((el) => (
																	<div>
																		{isEditComment === el.id ? (
																			<>
																				<input
																					value={editComment}
																					onChange={(e) =>
																						setEditComment(e.target.value)
																					}
																					type="text"
																				/>
																				<button
																					onClick={() => saveEditComment(el.id)}
																				>
																					save
																				</button>
																			</>
																		) : (
																			<>
																				<div className={scss.comment}>
																					<img src={el.avatar} alt="" />
																					<div className={scss.commentnickname}>
																						<p>{el.userName}</p>
																						<div className={scss.heart}>
																							<p
																								onClick={() =>
																									openModalComment(el.id)
																								}
																							>
																								{el.comment}
																							</p>
																							<div className={scss.likes}>
																								<p
																									onClick={() =>
																										editCommentById(el)
																									}
																								>
																									{el.countLike}
																								</p>

																								<button
																									onClick={() =>
																										OneMoreLike(el.id)
																									}
																								>
																									<IconHeart />
																								</button>
																							</div>
																						</div>

																						<div className={scss.commentend}>
																							<p>{el.createdAt}</p>
																							<h4
																								onClick={() =>
																									handleAddComment(el.id)
																								}
																							>
																								Ответить
																							</h4>
																							{isComment &&
																								commentById === el.id && (
																									<>
																										<input
																											type="text"
																											placeholder="Введите ваш комментарий"
																											value={comment}
																											onChange={(e) =>
																												setComment(
																													e.target.value
																												)
																											}
																										/>
																										<button
																											onClick={
																												handleSubmitComment
																											}
																										>
																											Отправить
																										</button>
																									</>
																								)}
																						</div>
																					</div>
																				</div>
																			</>
																		)}
																		<ModalTs
																			open={isModalCommnet}
																			onCancel={closeModalComment}
																		>
																			<div
																				className={scss.comment_modal_delete}
																			>
																				<div className={scss.modal_delete}>
																					<p
																						onClick={() =>
																							removeCommetById(
																								deleteCommentById!
																							)
																						}
																					>
																						удалить комментарий
																					</p>
																					<p
																						onClick={() => editCommentById(el)}
																					>
																						edit
																					</p>
																				</div>
																			</div>
																		</ModalTs>
																	</div>
																))}
															</div>
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
											</>
										))}
									</div>
								</ModalTs>
							</>
						))}

						<ModalTs open={isModal} onCancel={closeModal}>
							<div className={scss.is_modal}>
								<div className={scss.modal}>
									<div className={scss.added}>
										<div>
											<h3>добавить сообщество</h3>

											<textarea
												value={description}
												onChange={(e) => setDescription(e.target.value)}
											></textarea>
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

										<div className={scss.buttons}>
											<button onClick={closeModal}>отменить</button>

											<button onClick={() => handleAddPublic(communityId)}>
												добавить
											</button>
										</div>
									</div>
								</div>
							</div>
						</ModalTs>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForMe;
