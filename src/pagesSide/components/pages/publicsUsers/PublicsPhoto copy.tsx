import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicsSlider from './PublicsSlider';
import {
	useGetPublicsFoodQuery,
	usePostPublicFoodMutation
} from '@/src/redux/api/publications';
import ModalTs from '@/src/ui/modal/Modal';
// import { PlusIconSecond } from '@/src/assets/icons';
import { IconDots, IconX } from '@tabler/icons-react';
import scss from './Style.module.scss';

const PublicsPhoto = () => {
	const [, setHidePhoto] = useState(false);
	const [image, setImage] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [showMessage, setShowMessage] = useState<Record<string, boolean>>({});
	const [filteredImages, setFilteredImages] = useState<Record<string, boolean>>(
		{}
	);
	const [isModal, setIsModal] = useState(false);
	const [isSecondModal, setIsSecondModal] = useState(false);

	const { data: publics, isLoading } = useGetPublicsFoodQuery();
	const [postRequest] = usePostPublicFoodMutation();

	const showMessageAgain = (id: number) => {
		setShowMessage((prevState) => ({
			...prevState,
			[id]: !prevState[id]
		}));
	};

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const validTypes = ['image/png', 'image/jpeg'];

			if (!validTypes.includes(file.type)) {
				alert('Пожалуйста, загрузите файл формата PNG или JPG.');
				event.target.value = '';
				return;
			}

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
			if (
				fileInputRef.current &&
				fileInputRef.current.files &&
				fileInputRef.current.files.length > 0
			) {
				const file = fileInputRef.current.files[0];
				const validTypes = ['image/png', 'image/jpeg'];

				if (!validTypes.includes(file.type)) {
					alert('Пожалуйста, загрузите файл формата PNG или JPG.');
					fileInputRef.current.value = '';
					return;
				}

				const reader = new FileReader();
				reader.onload = (e) => {
					if (e.target) {
						setImage(e.target.result as string);
					}
				};
				reader.readAsDataURL(file);
			} else {
				return;
			}
		} catch (error) {
			console.error('Error adding photo:', error);
		}
	};

	useEffect(() => {
		const postImage = async () => {
			if (image) {
				const newData = {
					img: image
				};
				try {
					await postRequest(newData).unwrap();
					setImage('');
				} catch (error) {
					console.error('Error posting photo:', error);
				}
			}
		};

		postImage();
	}, [image, postRequest]);

	const handleImageClick = (id: number) => {
		setFilteredImages((prevState) => ({
			...prevState,
			[id]: !prevState[id]
		}));
	};

	const navigate = useNavigate();

	const navigateToProfile = () => {
		navigate('/users-profile');
	};

	const handleCancelModal = () => {
		setIsModal(false);
	};

	const handleOpenModal = () => {
		setIsModal(true);
	};

	const secondModalOpen = () => {
		setIsSecondModal(true);
	};

	const secondModalClose = () => {
		setIsSecondModal(false);
	};

	return (
		<div className={scss.photoes}>
			{isLoading ? (
				<p>Loading . .</p>
			) : (
				<>
					<div className={scss.bar}>
						<div onClick={handleButtonClick}>
							{/* <PlusIconSecond /> */}
							<p style={{ textAlign: 'center' }}>
								Добавить <br /> фото
							</p>
						</div>
					</div>
					{publics?.map((item) => (
						<div className={scss.section} key={item.id}>
							<img
								src={item.img}
								alt="photo"
								className={filteredImages[item.id] ? scss.filter_img : ''}
								onClick={secondModalOpen}
							/>
							<ModalTs open={isSecondModal} onCancel={secondModalClose}>
								<div className={scss.slider_modal}>
									<PublicsSlider />
									<div className={scss.wibget_modal}></div>
								</div>
							</ModalTs>

							<button
								onClick={() => {
									showMessageAgain(item.id);
									handleImageClick(item.id);
								}}
							>
								<IconDots />
							</button>
							<div
								className={
									showMessage[item.id] ? scss.showMessage : scss.isNotMessage
								}
								onClick={() => {
									showMessageAgain(item.id);
									handleImageClick(item.id);
								}}
							>
								<h4 onClick={handleOpenModal}>Пожаловаться</h4>
								<span></span>
								<p onClick={navigateToProfile}>Профиль участника</p>
							</div>
							<ModalTs open={isModal} onCancel={handleCancelModal}>
								<div className={scss.modal}>
									<div className={scss.modal_first}>
										<div className={scss.title_and_close_icon}>
											<h2 className={scss.title}>Пожаловаться</h2>
											<IconX
												onClick={handleCancelModal}
												className={scss.close_modal_icon}
											/>
										</div>
										<span></span>
										<h2>Почему вы хотите пожаловаться на эту публикацию?</h2>
										<span></span>
										<p>Это спам</p>
										<span></span>
										<p>Враждебные высказывания или символы</p>
										<span></span>
										<p>Насилие или опасные организации</p>
										<span></span>
										<p>
											Продажа незаконных или подлежащих правовому регулированию
											товаров
										</p>
										<span></span>
										<p>Травля и преследование</p>
										<span></span>
										<p>Нарушение прав на интеллектуальную собственность</p>
										<span></span>
										<p>Самоубийство или нанесение себе увечий</p>
										<span></span>
										<p>Мошенничество или обман</p>
										<span></span>
										<p>Наркотические средства</p>
										<span></span>
										<p>Ложная информация</p>
										<span></span>
										<p>Мне не нравится</p>
									</div>
								</div>
							</ModalTs>
						</div>
					))}
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

export default PublicsPhoto;
