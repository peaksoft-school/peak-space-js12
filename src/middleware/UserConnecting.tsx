import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useGetMeQuery } from '../redux/api/auth';

interface UserConnectingProps {
	children: ReactNode;
}

const socketUrl = import.meta.env.VITE_PUBLIC_API_WSS;

const UserConnecting: FC<UserConnectingProps> = ({ children }) => {
	const { data } = useGetMeQuery();
	const [opened, setOpened] = useState(false);
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
					<div
						style={{
							position: 'fixed',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							background: 'rgba(0, 0, 0, 0.5)'
						}}
					>
						<div
							style={{ position: 'relative', width: '100%', height: '100%' }}
						>
							<div
								style={{
									position: 'absolute',
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
									background: 'white',
									padding: '20px',
									borderRadius: '8px'
								}}
							>
								<button
									onClick={closeModal}
									style={{ position: 'absolute', top: '10px', right: '10px' }}
								>
									Close
								</button>
								<h1>This is a custom modal</h1>
								{/* Modal content */}
							</div>
						</div>
					</div>,
					modalContainer
				)}
		</>
	);
};

export default UserConnecting;
