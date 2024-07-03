import { FC, ReactNode, useEffect } from 'react';
import { useGetMeQuery } from '../redux/api/auth';

interface UserConnectingProps {
	children: ReactNode;
}

const socketUrl = import.meta.env.VITE_PUBLIC_API_WSS;

const UserConnecting: FC<UserConnectingProps> = ({ children }) => {
	const { data } = useGetMeQuery();
	let socket: WebSocket;

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

	return <>{children}</>;
};

export default UserConnecting;
