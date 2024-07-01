import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfidentPage from './ConfidentPage';
import { usePoastRivateAccountMutation } from '@/src/redux/api/privateAccount';
import { Switch } from 'antd';
import ModalTs from '@/src/ui/modal/Modal';
import {
	IconArrowNarrowLeft,
	IconPhotoVideo,
	IconAt
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
			<ConfidentPage />
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
						Если у вас общедоступный аккаунт, ваш профиль и публикации будут
						видны всем в сети Peakspace
					</p>
					<p>
						Если у вас закрытый аккаунт, только одобренные вами подписчики будут
						видеть ваши публикации, в том числе фото и видео на страницах
						хэштегов и мест, а также список ваших подписчиков и подписок.
					</p>
				</div>
			</div>
			<div>
				<ModalTs open={isModal2} onCancel={closeModal2}>
					<div className={scss.modalka2}>
						<h1>Сделать аккаунт общедоступным?</h1>
						<div className={scss.box}>
							<div className={scss.text_icon}>
								<button>
									<IconPhotoVideo />
								</button>
								<p>Кто угодно может смотреть ваши публикации и истории</p>
							</div>

							<div className={scss.text_icon}>
								<button>
									<IconAt />
								</button>
								<p>
									Настройки того, кто может отправлять вам сообщения, а также
									отмечать и упоминать вас с помощью символа "@", останутся
									прежними.
								</p>
							</div>
						</div>
						<div className={scss.btn}>
							<span></span>
							<button onClick={handleOk2}>Сделать общественным</button>
							<span></span>
							<button onClick={closeModal2}>Отмена</button>
						</div>
					</div>
				</ModalTs>

				<ModalTs open={isModal} onCancel={closeModal}>
					<div className={scss.modalka}>
						<h1>Сделать аккаунт закрытым?</h1>
						<div className={scss.box}>
							<div className={scss.text_icon}>
								<button>
									<IconPhotoVideo />
								</button>
								<p>Только ваши подписчики смогут увидеть ваши фото и видео.</p>
							</div>

							<div className={scss.text_icon}>
								<button>
									<IconAt />
								</button>
								<p>
									Настройки того, кто может отправлять вам сообщения, а также
									отмечать и @упоминать вас, останутся прежними. Но вы не
									сможете отмечать тех, кто на вас не подписан.
								</p>
							</div>
						</div>

						<div className={scss.btn}>
							<span></span>
							<button onClick={handleOk}>Сделать закрытым</button>
							<span></span>
							<button onClick={closeModal}>Отмена</button>
						</div>
					</div>
				</ModalTs>
			</div>
		</div>
	);
};

export default ConfidentTwoPage;
