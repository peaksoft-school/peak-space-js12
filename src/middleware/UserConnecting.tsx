import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import scss from './UserConnecting.module.scss';
import { createPortal } from 'react-dom';
import { useGetMeQuery } from '../redux/api/auth';
import { IconPhoneCall, IconPhoneOff } from '@tabler/icons-react';
import { audio } from '../music';

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
	console.log(whoCalling);

	const [modalContainer] = useState(() => document.createElement('div'));
	const audioRef = useRef<HTMLAudioElement>(null);
	const socketRef = useRef<WebSocket | null>(null);

	const openModal = () => {
		setOpened(true);
		setTimeout(() => {
			handlePlayButton();
		}, 200);
		setTimeout(closeModal, 25 * 1000);
	};

	const closeModal = () => {
		setOpened(false);
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}
	};

	const handlePlayButton = () => {
		if (audioRef.current) {
			audioRef.current.src = audio;
			audioRef.current
				.play()
				.catch((err) => console.error('Error playing audio: ', err));
		}
	};

	useEffect(() => {
		document.body.appendChild(modalContainer);
		return () => {
			document.body.removeChild(modalContainer);
		};
	}, [modalContainer]);

	useEffect(() => {
		if (!data?.userName || !data?.email) return;

		const connectWebSocket = () => {
			const socket = new WebSocket(socketUrl);

			socket.onopen = () => {
				console.log('Connected to WebSocket server');
				const userDetails = {
					type: 'connect',
					name: data.userName,
					email: data.email
				};
				socket.send(JSON.stringify(userDetails));
			};

			socket.onmessage = (event) => {
				const message = JSON.parse(event.data);
				if (message.payload) {
					setWhoCalling(message.payload);
					openModal();
				}
			};

			socket.onclose = () => {
				console.log('Disconnected from WebSocket server');
			};

			socket.onerror = (error) => {
				console.error('WebSocket error:', error);
			};

			socketRef.current = socket;
		};

		connectWebSocket();

		return () => {
			if (socketRef.current) {
				socketRef.current.close();
			}
		};
	}, [data]);

	const simulateClickButton = () => {
		console.log('Simulating click');
	};

	useEffect(() => {
		const simulateClick = () => {
			if (audioRef.current) {
				const clickEvent = new MouseEvent('click', {
					view: window,
					bubbles: true,
					cancelable: true
				});
				document.body.dispatchEvent(clickEvent);
				simulateClickButton();
			}
		};
		simulateClick();
	}, [data]);

	return (
		<>
			{children}
			<audio ref={audioRef} />
			{opened &&
				createPortal(
					<div onClick={simulateClickButton} className={scss.UserConnecting}>
						<div className={scss.content}>
							<img
								src={
									whoCalling?.image
										? whoCalling.image
										: 'https://elcho.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Felcho911.eabc74a3.png&w=640&q=75'
								}
								alt={whoCalling?.name}
							/>
							<div className={scss.user_info}>
								<h1 className={scss.name}>{whoCalling?.name}</h1>
								<h1 className={scss.email}>{whoCalling?.email}</h1>
							</div>
							<div className={scss.buttons}>
								<button
									className={scss.call_on}
									onClick={() => window.open(whoCalling?.callUrl, '_self')}
								>
									<IconPhoneCall stroke={2} />
								</button>
								<button className={scss.close_button} onClick={closeModal}>
									<IconPhoneOff stroke={2} />
								</button>
							</div>
						</div>
					</div>,
					modalContainer
				)}
		</>
	);
};

export default UserConnecting;
