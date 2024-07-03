import { FC, ReactNode, useEffect, useState } from 'react';
import scss from './UserConnecting.module.scss';
import { createPortal } from 'react-dom';
import { useGetMeQuery } from '../redux/api/auth';

interface UserConnectingProps {
	children: ReactNode;
}

interface CallRequestPayload {
	callUrl: string;
	email: string;
	name: string;
	image: string;
}

const socketUrl = import.meta.env.VITE_PUBLIC_API_WSS;

const UserConnecting: FC<UserConnectingProps> = ({ children }) => {
	const { data } = useGetMeQuery();
	const [opened, setOpened] = useState(false);
	const [whoCalling, setWhoCalling] = useState<CallRequestPayload>();
	const [modalContainer] = useState(() => document.createElement('div'));
	let socket: WebSocket;

	const openModal = () => setOpened(true);
	const closeModal = () => setOpened(false);

	useEffect(() => {
		document.body.appendChild(modalContainer);

		return () => {
			document.body.removeChild(modalContainer);
		};
	}, [modalContainer]);

	useEffect(() => {
		if (!data?.userName || !data?.email) return;
		// Функция подключения к WebSocket
		const connectWebSocket = () => {
			socket = new WebSocket(socketUrl);

			socket.onopen = () => {
				console.log('Connected to WebSocket server');

				// Отправка сообщения о подключении пользователя
				const userDetails = {
					type: 'connect',
					name: data?.userName,
					email: data?.email
				};
				socket.send(JSON.stringify(userDetails));
				console.log(userDetails);
			};

			socket.onmessage = (event) => {
				const message = JSON.parse(event.data);
				console.log('CallMe Received message:', message);
				setWhoCalling(message.payload);
				openModal();
			};

			socket.onclose = () => {
				console.log('Disconnected from WebSocket server');
			};

			socket.onerror = (error) => {
				console.error('WebSocket error:', error);
			};
		};

		// Подключение к WebSocket при монтировании компонента
		connectWebSocket();

		// Закрытие соединения при размонтировании компонента
		return () => {
			if (socket) {
				socket.close();
			}
		};
	}, [data, socketUrl]);

	return (
		<>
			{children}
			{opened &&
				createPortal(
					<div className={scss.UserConnecting}>
						<div className={scss.content}>
							<button onClick={closeModal} className={scss.close_button}>
								Close
							</button>
							<h1>This is a custom modal</h1>
							<div>
								<img src={whoCalling?.image} alt={whoCalling?.name} />
								<h1>{whoCalling?.name}</h1>
								<h1>{whoCalling?.email}</h1>
								<button
									onClick={() => window.open(whoCalling?.callUrl, '_self')}
								>
									Принять вызов
								</button>
								<button onClick={closeModal}>Отменить вызов</button>
							</div>
						</div>
					</div>,
					modalContainer
				)}
		</>
	);
};

export default UserConnecting;
