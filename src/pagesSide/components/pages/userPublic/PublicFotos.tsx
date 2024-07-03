// @ts-nocheck
import { useRef, useState } from 'react';
import SliderFoto from './SliderFoto';
import Picker from '@emoji-mart/react';
import {
	useGetUserPublicQuery,
	usePostUserPublicMutation
} from '@/src/redux/api/userPublic';
import ModalTs from '@/src/ui/modal/Modal';

import {
	IconCirclePlus,
	IconDots,
	IconHeartFilled,
	IconMessage,
	IconCornerUpRight,
	IconX,
	IconSearch,
	IconHeart,
	IconMoodPlus
} from '@tabler/icons-react';
import data from '@emoji-mart/data';

import scss from './Style.module.scss';
import { useNavigate } from 'react-router-dom';
import { useGetBlockedUsersQuery } from '@/src/redux/api/blocked';
import { useGetComentUsersQuery } from '@/src/redux/api/comentsUsers/indexs';

const PublicFotos = () => {
	const { data: fotos, isLoading } = useGetUserPublicQuery();
	const [postRequest] = usePostUserPublicMutation();
	const [, setHidePhoto] = useState(false);
	const [image, setImage] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { data: datas } = useGetBlockedUsersQuery();
	const [idModal, setIdModal] = useState<number>(0);
	// !
	const { data: users } = useGetComentUsersQuery();
	const [inputStr, setInputStr] = useState('');
	const [showPicker, setShowPicker] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleGetEmoji = (event: any) => {
		setInputStr((prevInput) => prevInput + event.native);
		setShowPicker(false);
	};
	console.log(fotos, 'array');

	// !modal
	const [isModal, setIsModal] = useState(false);

	const openModal = (id: number, img: string) => {
		console.log(id, img);

		setIsModal(true);
		setIdModal(id);
	};
	const closeModal = () => {
		setIsModal(false);
		setComplain(false);
	};
	// !
	// !modal
	const [isModal2, setIsModal2] = useState(false);

	const openModal2 = () => {
		setIsModal(false);
		setIsModal2(true);
	};
	const closeModal2 = () => {
		setIsModal2(false);
	};
	// !

	const [complain, setComplain] = useState(false);
	const handleComends = () => setComplain(true);
	// !
	const navigate = useNavigate();
	const [usersArray, setUsersArray] = useState<string[]>([]);

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
	//////////////////////////////// !
	const [showMessage, setShowMessage] = useState<{ [key: number]: boolean }>(
		{}
	);

	const ShowMessageAgain = (id: number) => {
		setShowMessage((prevState) => ({
			...prevState,
			[id]: !prevState[id]
		}));
	};

	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			setHidePhoto(true);
			reader.onload = (e) => {
				if (e.target) {
					setImage(e.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleAddPhoto = async () => {
		try {
			let newData;
			if (
				fileInputRef.current &&
				fileInputRef.current.files &&
				fileInputRef.current.files.length > 0
			) {
				const file = fileInputRef.current.files[0];
				const reader = new FileReader();
				reader.onload = (e) => {
					if (e.target) {
						setImage(e.target.result as string);
					}
				};
				reader.readAsDataURL(file);
				newData = {
					img: image
				};
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				await postRequest(newData as any).unwrap();
			} else {
				return;
			}
			setImage('');
		} catch (error) {
			console.error('Error adding photo:', error);
		}
	};
	return (
		<div className={scss.content}>
			{isLoading ? (
				<h1>Loading . . .</h1>
			) : (
				<>
					<div className={scss.bar}>
						<div onClick={handleButtonClick}>
							<IconCirclePlus color=" #000000B2" stroke={1} />
							<p style={{ textAlign: 'center' }}>
								Добавить <br /> фото
							</p>
						</div>
					</div>
					{fotos?.map((item) => (
						<div className={scss.section} key={item._id}>
							<img
								onClick={() => openModal(item._id && item._id, item.img)}
								src={item.img}
								alt="photo"
								className={scss.image}
							/>
							<button onClick={() => ShowMessageAgain(item._id)}>
								<IconDots />
							</button>
							<div
								className={
									showMessage[item._id] ? scss.showMessage : scss.isNotMessage
								}
								onClick={() => ShowMessageAgain(item._id)}
							>
								<h4>заблокировать пользователя</h4>
								<span></span>
								<p>удалить пользователя</p>
								<span></span>
								<p>удалить фото</p>
							</div>
							{/* //!Modal//////////////////////////////////////////////////////////////////! */}

							<ModalTs open={isModal2} onCancel={closeModal2}>
								<div className={scss.modalst}>
									<div className={scss.text}>
										<p className={scss.p}>Поделиться</p>
										<IconX onClick={closeModal2} className={scss.icons} />
									</div>
									<span></span>
									<div className={scss.inputs}>
										<IconSearch />
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
												{datas?.map((item: any) => (
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
						</div>
					))}
					<ModalTs open={isModal} onCancel={closeModal}>
						<div className={scss.mufa}>
							<div className={scss.slider}>
								<SliderFoto idModal={idModal} />
								<div className={scss.buttons}>
									<div className={complain ? ` ${scss.btn}` : `${scss.button}`}>
										<button>
											<IconHeartFilled color="white" />
										</button>
										<p>1808</p>
									</div>
									<div
										className={complain ? ` ${scss.btn}` : `${scss.button}`}
										onClick={handleComends}
									>
										<button>
											<IconMessage color="white" />
										</button>
										<p>1808</p>
									</div>
									<div
										className={complain ? ` ${scss.btn}` : `${scss.button}`}
										onClick={openModal2}
									>
										<button>
											<IconCornerUpRight color="white" />
										</button>
										<p> 1808</p>
									</div>
								</div>
							</div>

							{complain && (
								<>
									{users?.map((item) => (
										<div key={item.id} className={scss.userInfo}>
											<div>
												<div className={scss.card}>
													<div className={scss.start}>
														<img src={item.img} alt={item.name} />
														<div className={scss.texts}>
															<h3>{item.name}</h3>
															<h4>{item.title}</h4>
														</div>
													</div>
													<IconDots />
												</div>
												<div className={scss.preview}>
													<img
														src="https://ca.slack-edge.com/T023L1WBFLH-U05UR1PLN10-13317808de8f-512"
														alt="avatar"
													/>
													<div className={scss.tip}>
														<p>_alina</p>
														<div className={scss.narrow}>
															<p>
																Lorem ipsum dolor sit amet, consectetur
																adipiscing
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
									))}
								</>
							)}
						</div>
					</ModalTs>
				</>
			)}

			<input
				placeholder="text"
				type="file"
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={handleFileChange}
				accept=".jpg, .png"
			/>

			<button onClick={handleAddPhoto}>Добавить фото</button>
		</div>
	);
};

export default PublicFotos;
