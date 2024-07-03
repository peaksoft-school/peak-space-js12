// @ts-nocheck
import { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useGetNotificationQuery } from '@/src/redux/api/notification';
import ModalTs from '@/src/ui/modal/Modal';
import { Smile } from '@/src/assets/icons';
import scss from './Notifications.module.scss';
import { Skeleton } from 'antd';

const Notifications = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedNotification, setSelectedNotification] = useState(null);
	const { data: datas, isLoading, error } = useGetNotificationQuery();
	console.log(datas);

	const [inputStr, setInputStr] = useState('');
	const [showPicker, setShowPicker] = useState(false);

	const handleGetEmoji = (event: any) => {
		setInputStr((prevInput) => prevInput + event.native);
		setShowPicker(false);
	};

	const showModal = (notification: any) => {
		setSelectedNotification(notification);
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedNotification(null);
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
		<div className={scss.notifi}>
			<div className={scss.aside}>
				<div className={scss.head}>
					<h2>Уведомления</h2>
				</div>
				<div className={scss.bar}>
					{datas?.map((item) => (
						<div className={scss.box} key={item.id}>
							<div className={scss.comment}>
								<div className={scss.start}>
									<img
										className={scss.user_img}
										src={item.senderProfileImageUrl}
										alt="userPhoto"
									/>
									<div>
										<h4>{item.senderUserName}</h4>
										<p className={scss.text}>{item.message}</p>
									</div>
								</div>
							</div>

							<div className={scss.end}>
								{/* <p>{item.createdAt}</p> */}
								<p>
									{new Date(item.createdAt).toLocaleString('ru-RU', {
										hour: 'numeric',
										minute: 'numeric', 
										day: '2-digit',
										month: '2-digit',
									})}
								</p>
								<img
									onClick={() => showModal(item)}
									src={item.publicationOrStoryImageUrl}
									alt="photo"
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			{selectedNotification && (
				<ModalTs open={isModalOpen} onCancel={handleCancel}>
					<div className={scss.tool_tip}>
						<div className={scss.open_modal}>
							<div className={scss.slider}>
								<img
									src={selectedNotification.publicationOrStoryImageUrl}
									alt=""
								/>
							</div>
							<div className={scss.aside_bar}>
								<div className={scss.input_smile}>
									<Smile onClick={() => setShowPicker((val) => !val)} />
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
					</div>
				</ModalTs>
			)}
		</div>
	);
};

export default Notifications;
