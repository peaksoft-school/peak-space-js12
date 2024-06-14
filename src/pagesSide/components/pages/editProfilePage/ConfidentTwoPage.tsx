import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfidentPage from './ConfidentPage';
import { usePoastRivateAccountMutation } from '@/src/redux/api/privateAccount';
import { Switch } from 'antd';
import ModalTs from '@/src/ui/modal/Modal';
import {
	IconArrowNarrowLeft,
	IconPhotoVideo,
	IconAt,
	IconCodePlus
} from '@tabler/icons-react';
import scss from './Style.module.scss';

const ConfidentTwoPage: FC = () => {
	const [isModal, setIsModal] = useState(false);
	const [isModal2, setIsModal2] = useState(false);
	const [ellipsis, setEllipsis] = useState(false);

	const [postPrivateAccount] = usePoastRivateAccountMutation();
	const navigate = useNavigate();

	const openModal = () => {
		if (ellipsis === false) {
			setIsModal(true);
		} else if (ellipsis === true) {
			setIsModal2(true);
		}
	};

	const closeModal = () => {
		setIsModal(false);
	};

	const closeModal2 = () => {
		setIsModal2(false);
	};

	const handleOk = async () => {
		const response = await postPrivateAccount();
		if ('data' in response) {
			if (response.data?.httpStatus === 'OK') {
				localStorage.setItem('galochka', 'true');
			}
		}
		setIsModal(false);
	};

	const handleOk2 = async () => {
		const response = await postPrivateAccount();
		if ('data' in response) {
			if (response.data?.httpStatus === 'OK') {
				localStorage.removeItem('galochka');
				localStorage.setItem('galochka', 'false');
			}
		}

		setIsModal2(false);
	};
	useEffect(() => {
		const test = localStorage.getItem('galochka');
		if (test === 'true') {
			setEllipsis(true);
		} else if (test === 'false') {
			setEllipsis(false);
		}
	}, [ellipsis, localStorage, handleOk]);

	return (
		<div className={scss.confident_content}>
			<div>
				<ConfidentPage />
			</div>
			<div className={scss.vector_switch}>
				<div className={scss.vector}>
					<button onClick={() => navigate(-2)}>
						<IconArrowNarrowLeft />
					</button>
					<h2>Конфиденциальность</h2>
				</div>
				<div className={scss.Switch}>
					<p>Закрытый аккаунт </p>
					<Switch onClick={openModal} checked={ellipsis} />
				</div>
				<div className={scss.lorem_confident}>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna <br /> aliqua.
						Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
						nisi ut aliquip ex ea commodo consequat. <br /> Duis aute irure
						dolor in reprehenderit in voluptate velit esse cillum dolore eu
						fugiat nulla pariatur. <br /> Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est
						laborum.
					</p>
				</div>
			</div>
			<div>
				<ModalTs open={isModal2} onCancel={closeModal2}>
					<div className={scss.modalka}>
						<h1>Сделать аккаунт закрытым?</h1>
						<div className={scss.box}>
							<div className={scss.text_icon}>
								<IconPhotoVideo />
								<p>
									Кто угодно может смотреть ваши публикации, видео Reels и
									истории, а также использовать вашу оригинальную аудиодорожку.
								</p>
							</div>

							<div className={scss.text_icon}>
								<IconAt />
								<p>
									Настройки того, кто может отправлять вам сообщения, а также
									отмечать и упоминать вас с помощью символа "@", останутся
									прежними.
								</p>
							</div>

							<div className={scss.text_icon}>
								<IconCodePlus />
								<p>
									Люди могут делать ремиксы с вашими видео Reels и скачивать их
									как часть ремиксов. Вы можете изменить это в настройках.
								</p>
							</div>
						</div>

						<div className={scss.btn}>
							<button onClick={handleOk2}>Сделать закрытым</button>
							<button onClick={closeModal2}>Отмена</button>
						</div>
					</div>
				</ModalTs>

				<ModalTs open={isModal} onCancel={closeModal}>
					<div className={scss.modalka2}>
						<h1>Сделать аккаунт общедоступным?</h1>
						<div className={scss.box}>
							<div className={scss.text_icon}>
								<IconPhotoVideo />
								<p>Только ваши подписчики смогут увидеть ваши фото и видео.</p>
							</div>

							<div className={scss.text_icon}>
								<IconAt />
								<p>
									Настройки того, кто может отправлять вам сообщения, а также
								</p>
							</div>
						</div>
						<div className={scss.btn}>
							<button onClick={handleOk}>Сделать общественным</button>
							<button onClick={closeModal}>Отмена</button>
						</div>
					</div>
				</ModalTs>
			</div>
		</div>
	);
};

export default ConfidentTwoPage;
