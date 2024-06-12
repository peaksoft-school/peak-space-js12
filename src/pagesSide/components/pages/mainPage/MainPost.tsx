import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import SliderMain from './SliderMain';
import { useGetMainPageQuery } from '@/src/redux/api/mainPage';
import { useGetBlockedUsersQuery } from '@/src/redux/api/blocked';
import ModalTs from '@/src/ui/modal/Modal';

import {
	IconHeart,
	IconMessage,
	IconCornerUpRight,
	IconDotsVertical,
	IconMoodPlus,
	IconBookmarks,
	IconX,
	IconSearch
} from '@tabler/icons-react';
import scss from './Style.module.scss';
import { useAddFavoriteMutation } from '@/src/redux/api/favourites';

const MainPost = () => {
	const { data: items, refetch } = useGetMainPageQuery();
	const [isFavorite] = useAddFavoriteMutation();

	const [isState, setIsState] = useState(false);
	const [isModal, setIsModal] = useState(false);
	const [inputStr, setInputStr] = useState('');
	const [showPicker, setShowPicker] = useState(false);
	const [isModal2, setIsModal2] = useState(false);
	const [usersArray, setUsersArray] = useState<string[]>([]);
	const navigate = useNavigate();
	const { data, isLoading } = useGetBlockedUsersQuery();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleGetEmoji = (event: any) => {
		setInputStr((prevInput) => prevInput + event.native);
		setShowPicker(false);
	};

	const handleAddFavorite = (postId: number) => {
		try {
			isFavorite({ id: postId });
			refetch();
			console.log('added favorite', postId);
		} catch (error) {
			console.error('Failed to add post to favorites', error);
		}
	};

	const changeState = () => {
		setIsState(!isState);
	};
	const openModal = () => {
		setIsModal(true);
	};
	const closeModal = () => {
		setIsModal(false);
	};
	// !2
	const openModal2 = () => {
		setIsModal2(true);
	};
	const closeModal2 = () => {
		
		setIsModal2(false);
	};

	const handleOpenUsers = (userName: string) => {
		if (!usersArray.includes(userName)) {
			setUsersArray((prevValue) => [...prevValue, userName]);
		} else {
			const filtred = usersArray.filter((el) => el !== userName);
			setUsersArray(filtred);
		}
	};

	const handleButtonStyleResult = () => {
		if (usersArray.length !== 0) {
			return `${scss.noo_active} ${scss.active_button}`;
		} else {
			return `${scss.noo_active}`;
		}
	};

	return (
		<div>
			{items?.map((item) => (
				<div className={scss.section} key={item.id}>
					<div className={scss.holder}>
						<div className={scss.wrapper}>
							<div className={scss.wrap}>
								<img src={item.avatar} alt="avatar" />
								<div>
									<h5>{item.username}</h5>
									<p>{item.location}</p>
								</div>
							</div>
							<button onClick={changeState}>
								<IconDotsVertical onClick={changeState} />
							</button>
						</div>
						<div
							className={isState ? scss.one : scss.two}
							onClick={changeState}
						>
							<p className={scss.red}>заблокировать пользователя</p>
							<p>Пожаловаться</p>
							<p>удалить фото</p>
							<p>Отписаться</p>
						</div>
						<p className={scss.text}>{item.description}</p>
						<div className={scss.posts}>
							{item.linkPublicationResponseList?.map((test) => (
								<img src={test.link} alt="photos" />
							))}

							<div className={scss.icons}>
								<div className={scss.inner}>
									<IconHeart />
									<IconMessage onClick={openModal} />
									<IconCornerUpRight onClick={openModal2} />
								</div>
								<div>
									<IconBookmarks onClick={() => handleAddFavorite(item.id)} />
								</div>
							</div>
						</div>
						<p className={scss.comment}>Добавить комментарий...</p>

						<ModalTs open={isModal2} onCancel={closeModal2}>
							<div className={scss.modalst}>
								<div className={scss.text}>
									<p className={scss.p}>Поделиться</p>
									<IconX onClick={closeModal2} className={scss.icons}  color='black'/>
								</div>
								<span></span>
								<div className={scss.inputs}>
									<IconSearch color='black' />
									{usersArray.map((el, index) => (
										<div
											className={scss.div_users_names}
											key={index}
											onClick={() => handleOpenUsers(el)}
										>
											<p>{el}</p>
											<IconX style={{ cursor: 'pointer' }} />
										</div>
									))}
									<input type="text" placeholder="Поиск" />
								</div>
								<span></span>

								<div className={scss.box}>
									<p>Рекомендуемые</p>
									{isLoading ? (
										<>
											<h1>Loading.......</h1>
										</>
									) : (
										<>
											{data?.map((item) => (
												<div
													key={item.id}
													className={scss.cards}
													onClick={() => handleOpenUsers(item.name)}
												>
													<div className={scss.start}>
														<img src={item.img} alt={item.name} />
														<div className={scss.texts}>
															<h3>{item.name}</h3>
															<h4>{item.title}</h4>
														</div>
													</div>
													<input
														type="checkbox"
														checked={usersArray.includes(item.name)}
													/>
												</div>
											))}
										</>
									)}
								</div>
								<span></span>
								{usersArray.length !== 0 && (
									<input
										className={scss.input_users}
										type="text"
										placeholder="Напишите Сообщение..."
									/>
								)}
								<button
									onClick={() => {
										usersArray.length !== 0 && navigate('/chatperson');
									}}
									className={handleButtonStyleResult()}
								>
									{usersArray.length === 0 || usersArray.length === 1
										? 'Отправить'
										: 'Отправить по отделбности'}
								</button>
							</div>
						</ModalTs>

						<ModalTs open={isModal} onCancel={closeModal}>
							<div className={scss.modal_aside}>
								<div className={scss.widget}>
									<SliderMain />
								</div>
								<div className={scss.main}>
									<div className={scss.excerpt}>
										<div className={scss.popup}>
											<div className={scss.bullet}>
												<img src={item.avatar} alt="avatar" />
												<div>
													<h5>{item.username}</h5>
													<p>{item.location}</p>
												</div>
											</div>
											<IconDotsVertical onClick={closeModal} />
										</div>
										<div className={scss.preview}>
											<img
												src="https://i.pinimg.com/564x/42/91/b4/4291b466ec6093fd98c40f213e17c8e6.jpg"
												alt="avatar"
											/>
											<div className={scss.tip}>
												<p>_alina</p>
												<div className={scss.narrow}>
													<p>
														Lorem ipsum dolor sit amet, consectetur adipiscing
														elit, sed do eiusmod tempor incididunt ut labore et
														dolore magna aliqua. Ut enim ad minim veniam, quis
														nostrud exercitation ullamco laboris nisi ut aliquip
													</p>
													<button>
														<IconHeart />
													</button>
												</div>
												<div className={scss.end_message}>
													<p>17:27 19.03.2024</p>
													<h5>Ответить</h5>
												</div>
											</div>
										</div>
									</div>

									<div className={scss.input_smile}>
										<IconMoodPlus
											onClick={() => setShowPicker((val) => !val)}
										/>
										<input
											type="text"
											placeholder="Добавить комментарий..."
											value={inputStr}
											onChange={(e) => setInputStr(e.target.value)}
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
				</div>
			))}
		</div>
	);
};
export default MainPost;
