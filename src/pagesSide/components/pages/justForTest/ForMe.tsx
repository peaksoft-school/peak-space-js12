// @ts-nocheck
import {
	useAddedCommentMutation,
	useCommentPostMutation,
	useCommentResponseQuery,
	useDeleteIdMutation,
	useDeletePhotoByIdMutation,
	useEditCommentMutation,
	useEditPublicMutation,
	useGetIdQuery,
	useGetPublicPhotosQuery,
	useInnerCommentByidQuery,
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
import { Switch, Input, Skeleton } from 'antd';
import { Smile } from '@/src/assets/icons';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import CustomButton from '@/src/ui/customButton/CustomButton';
import { Tooltip } from 'antd';

const ForMe = () => {
	const { communityId } = useParams();

	const { data: datas, refetch, isLoading } = useGetIdQuery(communityId as any);
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
	const [commentResponseById, setCommetnResponseById] = useState<number | null>(
		null
	);
	const [liked, setLiked] = useState(false);
	const [innerById, setInnerById] = useState<number | null>(null);
	const [comment, setComment] = useState('');
	const [isModalComment, setIsModalComment] = useState(false);
	const [modalAvatar, setModalAvatar] = useState(false);
	const [postComment] = useCommentPostMutation();
	const [deleteComment] = useInnerCommentDeleteMutation();
	const [deleteCommentById, setDeleteCommentById] = useState<number | null>(
		null
	);
	const [isReplyMode, setIsReplyMode] = useState(false);
	const [putRequest] = useEditCommentMutation();
	const [isEditComment, setIsEditCommnet] = useState(null);
	const [editComment, setEditComment] = useState('');
	const [likeRequest] = useLikeCommentMutation();
	const [addedPostComment] = useAddedCommentMutation();
	const navigate = useNavigate();

	const handleGetEmoji = (event: any) => {
		setInputStr((prevInput) => prevInput + event.native);
		setShowPicker(false);
	};

	const showModal = (id: number) => {
		if (id) {
			setSelectedPostId(id);
			setCommetnResponseById(id);
			setIsModalOpen(true);
		} else {
			console.error('Invalid postId:', id);
		}
	};

	const { data: commentResponse } = useCommentResponseQuery(
		commentResponseById,
		{
			skip: !commentResponseById
		}
	);
	console.log(commentResponse, 'nurs');

	const { data: modalData, isLoading: commentLoading } = useModalCommentQuery(
		selectedPostId,
		{
			skip: !selectedPostId
		}
	);
	console.log(modalData);

	const { data: innerComment } = useInnerCommentByidQuery(innerById, {
		skip: !innerById
	});
	console.log(innerComment);

	const [modalContent, setModalContent] = useState([]);
	console.log(modalContent);

	const { TextArea } = Input;

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

	const openAvatar = () => {
		setTimeout(() => {
			setModalAvatar(true);
		}, 500);
	};

	const closeAvatar = () => {
		setModalAvatar(false);
	};

	const openModal = () => {
		setIsModal(true);
	};

	const closeModal = () => {
		setIsModal(false);
	};

	const handleLikeClick = () => {
		setLiked(!liked);
	};

	const openModalComment = (id: number) => {
		setIsModalComment(true);
		setDeleteCommentById(id);
	};

	const closeModalComment = () => {
		setIsModalComment(false);
		setDeleteCommentById(null);
	};

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
	console.log(modalData);

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
		const trimmedPablicName = editPablicName.trim();
		const trimmedDescriptionPublic = editDescriptionPublic.trim();

		const newData = {
			cover: editCover,
			avatar: edtiAvatar,
			pablicName:
				trimmedPablicName === '' ? item.pablicName : trimmedPablicName,
			tematica: editTematica,
			descriptionPublic:
				trimmedDescriptionPublic === ''
					? item.descriptionPublic
					: trimmedDescriptionPublic
		};

		await editRequest(newData);
		setIsEdit(null);
	};

	const removeId = async () => {
		try {
			await deleteRequest().unwrap();
			navigate('/public');
		} catch (error) {
			console.error('Failed to delete the item:', error);
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
				fileInputRef.current.value = '';
				return;
			}

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

	const OneMoreLike = (commentId: number) => {
		likeRequest(commentId);
	};

	const handleAddComment = (commentId: number, userName: string) => {
		setCommentById(commentId);
		setInnerById(commentId);

		setIsReplyMode(true); // Устанавливаем режим ответа
		setIsComment(!isComment);
		setComment(`@${userName} `);
	};

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

	const handleInputKeyDown = (e: any, postId: number) => {
		if (e.key === 'Enter') {
			handleAddCommentUser(postId);
		}
	};

	const handleSubmitComment = (commentId: number) => {
		if (comment === '') {
			return null;
		}
		const newData = {
			message: comment
		};
		postComment({ commentId, newData });
		setIsComment(false);
		setComment('');
	};

	const handleInputChange = (e: any) => {
		setInputStr(e.target.value);
	};

	const handleInputKeyDownAnswer = (e: any, commentId: number) => {
		if (e.key === 'Enter') {
			handleSubmitComment(commentId);
		}
	};

	if (isLoading) {
		return (
			<div className={scss.error}>
				<Skeleton active className={scss.custom_skeleton} />
				<Skeleton active className={scss.custom_skeleton} />
				<Skeleton active className={scss.custom_skeleton} />
			</div>
		);
	}

	if (commentLoading) {
		return (
			<div>
				<Skeleton avatar paragraph={{ rows: 4 }} />
			</div>
		);
	}

	return (
		<div className={scss.main}>
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
													accept=".jpg, .png"
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
														accept=".jpg, .png"
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
													Отменить
												</button>
												<button
													onClick={() => saveEdit(item.id)}
													className={scss.save_public_button}
													disabled={
														editPablicName === '' ||
														editDescriptionPublic === ''
													}
													style={{
														backgroundColor:
															editPablicName === '' ||
															editDescriptionPublic === ''
																? '#ced4da'
																: '',
														color:
															editPablicName === '' ||
															editDescriptionPublic === ''
																? '#6c757d'
																: '#ffffff',
														cursor:
															editPablicName === '' ||
															editDescriptionPublic === ''
																? 'not-allowed'
																: 'pointer'
													}}
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
											<button onClick={showMessage} className={scss.dots}>
												<IconDots />
											</button>

											<div className={isMessage ? scss.active : scss.default}>
												<p onClick={() => edit(item)}>Редактировать</p>
												<p onClick={() => removeId()} style={{ color: 'red' }}>
													Удалить
												</p>
											</div>
										</div>
										<div className={scss.bar}>
											<div className={scss.user_img}>
												<img
													onClick={openAvatar}
													src={item.avatar}
													alt="User"
												/>
												<ModalTs open={modalAvatar} onCancel={closeAvatar}>
													<div className={scss.modal_avatar}>
														<div></div>
														<img src={item.avatar} alt="" />
													</div>
												</ModalTs>
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
														className={scss.length}
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
								</>
							)}
						</>
					))}

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
							<>
								<div key={item.id} className={scss.photos}>
									<img
										src={item.link}
										onClick={() => (showModal(item.id), console.log(item.id))}
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
										<h4 onClick={() => RemoveById(item.id)}>Удалить</h4>
									</div>
								</div>

								<ModalTs open={isModalOpen} onCancel={handleCancel}>
									<>
										<div className={scss.first_modal}>
											<div className={scss.center}>
												{modalContent.map((item) => (
													<div className={scss.modal}>
														<div className={scss.user_img}>
															{item.links.map((el) => (
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
																	{commentLoading ? (
																		<>
																			<div className={scss.error}>
																				<Skeleton
																					avatar
																					paragraph={{ rows: 3 }}
																				/>
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
																									<p
																										className={
																											scss.comment_width
																										}
																									>
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
																								<div
																									className={scss.button_like}
																								>
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

																{isComment && commentById === item.id ? (
																	<>
																		<input
																			type="text"
																			className={scss.answer}
																			placeholder="Введите ваш комментарий"
																			value={comment}
																			onChange={handleCommentChange}
																			onKeyDown={(e) =>
																				handleInputKeyDownAnswer(e, item.id)
																			}
																		/>
																	</>
																) : (
																	<div
																		className={
																			isComment
																				? scss.is_none
																				: scss.input_smile
																		}
																	>
																		<Smile
																			onClick={() =>
																				setShowPicker((val) => !val)
																			}
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
																)}
															</div>
														</div>
													</div>
												))}
											</div>
										</div>
									</>
								</ModalTs>
							</>
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

										<div className={scss.buttons}></div>
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
