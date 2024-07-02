import { ChangeEvent, useEffect, useState } from 'react';
import Picker from '@emoji-mart/react';
import {
	useAddFavoriteMutation,
	useAddLikeMutation,
	useDeletePostMutation,
	useGetMainPageQuery,
	usePutBlockUserMutation,
	usePutUnsubscribeMutation
} from '@/src/redux/api/mainPage';
import { useGetBlockedUsersQuery } from '@/src/redux/api/blocked';
import ModalTs from '@/src/ui/modal/Modal';
import {
	IconHeart,
	IconMessage,
	IconHeartFilled,
	IconMoodPlus,
	IconBookmark,
	IconBookmarkFilled,
	IconSend2,
	IconDots
} from '@tabler/icons-react';
import scss from './Style.module.scss';
import { Dropdown, MenuProps, Space } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import {
	useAddLikeCommentMutation,
	useGetComentUsersQuery,
	usePostComentUsersMutation
} from '@/src/redux/api/comentsUsers/indexs';
import {
	useCommentPostMutation,
	useInnerCommentByidQuery
} from '@/src/redux/api/userPublic';
interface LinkPublicationResponseList {
	id: number;
	link: string;
}

interface PUBLICATION_TYPE {
	id: number;
	avatar: string;
	username: string;
	location: string;
	postId: number;
	description: string;
	linkPublicationResponseList: LinkPublicationResponseList[];
	countLikes: number;
	countComments: number;
	like: boolean;
	fromMyBlockAccount: boolean;
	favorite: boolean;
}

const MainPost = () => {
	const { data: items, refetch } = useGetMainPageQuery();
	const [isFavorite] = useAddFavoriteMutation();
	const [putBlockUser] = usePutBlockUserMutation();
	const [putUnsubscribe] = usePutUnsubscribeMutation();
	const [addLike] = useAddLikeMutation();
	const [deletePost] = useDeletePostMutation();
	const [postComentUsers] = usePostComentUsersMutation();
	const [addLikeComment] = useAddLikeCommentMutation();
	const [commentPost] = useCommentPostMutation();

	const [isModal, setIsModal] = useState(false);
	const [inputStr, setInputStr] = useState('');
	const [showPicker, setShowPicker] = useState(false);
	const [commentUserName, setCommentUserName] = useState('');
	const [isOpenInnerCommnet, setIsOpenInnerCommnet] = useState<{
		[key: string]: boolean;
	}>({});
	const [isOpenInnerCommnetChange, setIsOpenInnerCommnetChange] =
		useState(false);
	const [innerCommentValue, setInnerCommentValue] = useState('');

	const [commentId, setCommentId] = useState(0);
	const { data } = useGetBlockedUsersQuery();
	const [comentItem, setComentItem] = useState<PUBLICATION_TYPE>({
		id: 0,
		avatar: '',
		username: '',
		location: '',
		postId: 0,
		description: '',
		linkPublicationResponseList: [],
		countLikes: 0,
		countComments: 0,
		like: false,
		fromMyBlockAccount: false,
		favorite: false
	});
	const { data: commentData } = useGetComentUsersQuery(comentItem.postId);
	const { data: innerComnetData } = useInnerCommentByidQuery(commentId);
	console.log(innerComnetData, 'alihan');

	const [isExpanded, setIsExpanded] = useState(false);
	const [countLike, setCountLike] = useState(0);

	useEffect(() => {
		setInnerCommentValue(commentUserName);
	}, [commentUserName]);

	useEffect(() => {
		if (innerCommentValue === '') {
			setIsOpenInnerCommnetChange(false);
		}
	}, [innerCommentValue]);
	const handleGetEmoji = (event: { native: string }) => {
		setInputStr((prevInput) => prevInput + event.native);
		setShowPicker(false);
	};

	const storedValue = localStorage.getItem('userId');
	const myId: number | null =
		storedValue !== null ? JSON.parse(storedValue) : null;

	const handleAddFavorite = (postId: number) => {
		try {
			isFavorite({ id: postId });
			refetch();
			console.log('added favorite', postId);
		} catch (error) {
			console.error('Failed to add post to favorites', error);
		}
	};

	const openModal = async (item: PUBLICATION_TYPE) => {
		setIsModal(true);
		setComentItem(item);
	};
	const closeModal = () => setIsModal(false);

	const containerStyle =
		items && items.length > 0 ? scss.main_container : scss.none;

	const handleBlockUser = async (id: number) => {
		await putBlockUser(id);
	};

	const handleUnsubscribe = async (id: number) => {
		await putUnsubscribe(id);
	};

	const OPTION_ITEMS = (item: PUBLICATION_TYPE): MenuProps['items'] => [
		{
			key: '1',
			label: (
				<a style={{ color: 'red' }} onClick={() => handleBlockUser(item.id)}>
					{item.fromMyBlockAccount
						? 'Разблокировать пользователя'
						: 'Заблокировать пользователя'}
				</a>
			)
		},
		{
			key: '2',
			label: <a onClick={() => handleUnsubscribe(item.id)}>Отписаться</a>
		}
	];

	const handleDeletePost = (id: number) => deletePost(id);

	const OPTION_MY_ITEMS = (item: PUBLICATION_TYPE): MenuProps['items'] => [
		{
			key: '1',
			label: (
				<a
					style={{ color: 'red' }}
					onClick={() => handleDeletePost(item.postId)}
				>
					Удаления поста
				</a>
			)
		}
	];

	const handleToggleLike = (id: number) => addLike({ id });

	const getDisplayText = (text: string) => {
		const words = text.split(' ');
		if (isExpanded || words.length <= 20) {
			return text;
		} else {
			return words.slice(0, 20).join(' ');
		}
	};

	const toggleText = () => {
		setIsExpanded(!isExpanded);
	};

	const doubleClick = (id: number) => {
		setCountLike((prev) => prev + 1);
		if (countLike % 2 === 0) {
			addLike({ id });
		} else {
			setCountLike(0);
		}
	};

	const timeAgo = (dateString: string): string => {
		const now = new Date();
		const pastDate = new Date(dateString);
		const diff = now.getTime() - pastDate.getTime();

		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const weeks = Math.floor(days / 7);
		const months = Math.floor(days / 30);
		const years = Math.floor(days / 365);

		if (years > 0) {
			return years === 1 ? '1 year ago' : `${years} years ago`;
		} else if (months > 0) {
			return months === 1 ? '1 month ago' : `${months} months ago`;
		} else if (weeks > 0) {
			return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
		} else if (days > 0) {
			return days === 1 ? '1 day ago' : `${days} days ago`;
		} else if (hours > 0) {
			return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
		} else if (minutes > 0) {
			return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
		} else {
			return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
		}
	};

	const sendComment = (id: number) => {
		console.log({ id, massage: inputStr });

		if (isOpenInnerCommnetChange) {
			const newData = { message: innerCommentValue };
			commentPost({ commentId, newData });
		} else {
			postComentUsers({ id, message: inputStr });
			setInputStr('');
		}
	};

	const handleAddLikeCommnet = (id: number) => addLikeComment({ id });

	const handleOpenInnerComent = (id: number) => {
		setCommentId(id);
		setIsOpenInnerCommnet({ [id]: true });
	};

	const handleCloseInnerComent = (id: number) => {
		setIsOpenInnerCommnet({ [id]: false });
	};

	const handleInnerComment = (name: string, id: number) => {
		setIsOpenInnerCommnetChange(true);
		setCommentUserName(`@${name}`);
		setCommentId(id);
	};

	const handleChangeInnerComment = (e: ChangeEvent<HTMLInputElement>) =>
		setInnerCommentValue(e.target.value);

	return (
		<div className={containerStyle}>
			{items?.map((item) => (
				<>
					<div className={scss.section} key={item.id}>
						<div className={scss.holder}>
							<div className={scss.wrapper}>
								<div className={scss.wrap}>
									<img src={item.avatar} alt="avatar" />
									<div className={scss.texts}>
										<h5>{item.username}</h5>
										<p>{item.location}</p>
									</div>
								</div>
								<Space direction="vertical">
									<Space wrap>
										<Dropdown
											className={scss.story_drop_down}
											menu={{
												items:
													myId === item.id
														? OPTION_MY_ITEMS(item)
														: OPTION_ITEMS(item)
											}}
											placement="bottomLeft"
											arrow={{ pointAtCenter: true }}
										>
											<IconDots
												style={{
													cursor: 'pointer',
													width: '2rem',
													height: '2rem'
												}}
											/>
										</Dropdown>
									</Space>
								</Space>
							</div>

							<div className={scss.posts}>
								<Swiper
									slidesPerView={1}
									spaceBetween={30}
									pagination={{
										clickable: true
									}}
									navigation={true}
									modules={[Pagination, Navigation]}
									className={scss.mySwiper}
								>
									{item.linkPublicationResponseList?.map((test, index) => (
										<SwiperSlide key={index}>
											<img
												onClick={() => doubleClick(item.postId)}
												src={test.link}
												alt="photo"
											/>
										</SwiperSlide>
									))}
								</Swiper>

								<div className={scss.icons}>
									<div className={scss.inner}>
										{item.like ? (
											<IconHeartFilled
												color="red"
												onClick={() => handleToggleLike(item.postId)}
											/>
										) : (
											<IconHeart
												color="black"
												onClick={() => handleToggleLike(item.postId)}
											/>
										)}
										<span className={scss.count}>{item.countLikes}</span>
										<IconMessage
											onClick={() => openModal(item)}
											color="black"
										/>
										<span className={scss.count}>{item.countComments}</span>
									</div>
									<div>
										{item.favorite ? (
											<IconBookmarkFilled
												color="black"
												onClick={() => handleAddFavorite(item.postId)}
											/>
										) : (
											<IconBookmark
												color="black"
												onClick={() => handleAddFavorite(item.postId)}
											/>
										)}
									</div>
								</div>
								{item.description && (
									<p className={scss.text}>
										<span className={scss.user_name}>@{item.username}:</span>{' '}
										{getDisplayText(item.description)}{' '}
										{item.description.split(' ').length > 20 && (
											<span
												style={{
													cursor: 'pointer',
													color: 'black',
													fontWeight: 'bold'
												}}
												onClick={toggleText}
											>
												{isExpanded ? '<-' : '. . .'}
											</span>
										)}
									</p>
								)}
							</div>
						</div>
					</div>
				</>
			))}

			<ModalTs open={isModal} onCancel={closeModal}>
				<div className={scss.modal_aside}>
					<div className={scss.widget}>
						<Swiper
							slidesPerView={1}
							pagination={{
								clickable: true
							}}
							navigation={true}
							modules={[Pagination, Navigation]}
						>
							{comentItem.linkPublicationResponseList?.map((test, index) => (
								<SwiperSlide key={index}>
									<img
										style={{
											height: '42rem',
											marginBottom: '-0.3rem'
										}}
										src={test.link}
										alt="photo"
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className={scss.main}>
						<div className={scss.excerpt}>
							<div className={scss.popup}>
								<div className={scss.bullet}>
									<img src={comentItem.avatar} alt="avatar" />
									<div>
										<h5>{comentItem.username}</h5>
										<p>{comentItem.location}</p>
									</div>
								</div>
							</div>
							{commentData?.map((comment) => (
								<div className={scss.preview} key={comment.id}>
									<img src={comment.avatar} alt="avatar" />
									<div className={scss.tip}>
										<p>{comment.userName}</p>
										<div className={scss.narrow}>
											<p className={scss.comment}>{comment.comment}</p>
											<div className={scss.like}>
												<IconHeart
													style={
														comment.like ? { fill: 'red', color: 'red' } : {}
													}
													onClick={() => handleAddLikeCommnet(comment.id)}
												/>
												<p>{comment.countLike}</p>
											</div>
										</div>
										<div className={scss.end_message}>
											<p>{timeAgo(comment.createdAt)}</p>
											{!isOpenInnerCommnet[comment.id] ? (
												<h5 onClick={() => handleOpenInnerComent(comment.id)}>
													----Посмотреть ответы{' '}
												</h5>
											) : (
												<h5 onClick={() => handleCloseInnerComent(comment.id)}>
													---- Скрыть ответы
												</h5>
											)}
											<h5
												onClick={() =>
													handleInnerComment(comment.userName, comment.id)
												}
											>
												Ответить
											</h5>
										</div>
										{/* <div> */}
										{isOpenInnerCommnet[comment.id] === true
											? innerComnetData?.map((innerComnet) => (
													<div className={scss.innerBox} key={innerComnet.id}>
														<div className={scss.innerbullet}>
															<img src={innerComnet.avatar} alt="avatar" />
															<div>
																<div className={scss.innerbullet}>
																	<h5>{innerComnet.userName} .</h5>
																	<p>{innerComnet.comment}</p>
																</div>
																<p>{timeAgo(innerComnet.createdAt)}</p>
															</div>
														</div>
													</div>
												))
											: ''}
										{/* </div> */}
									</div>
								</div>
							))}
						</div>

						<div className={scss.input_smile}>
							<IconMoodPlus
								className={scss.plus}
								onClick={() => setShowPicker((val) => !val)}
							/>
							<input
								type="text"
								placeholder="Добавить комментарий..."
								value={isOpenInnerCommnetChange ? innerCommentValue : inputStr}
								onChange={
									isOpenInnerCommnetChange
										? handleChangeInnerComment
										: (e) => setInputStr(e.target.value)
								}
							/>
							<IconSend2
								className={scss.send}
								onClick={() => sendComment(comentItem.postId)}
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
			</ModalTs>
		</div>
	);
};
export default MainPost;
