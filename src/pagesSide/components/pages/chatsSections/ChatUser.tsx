import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import scss from './ChatUser.module.scss';
import { Link, useParams } from 'react-router-dom';
import { ScrollArea } from '@mantine/core';
import { useGetChatUserQuery } from '@/src/redux/api/chat';
import { useGetMeQuery } from '@/src/redux/api/auth';
import InputEmoji from 'react-input-emoji';
import { IconPhone } from '@tabler/icons-react';

interface Message {
	type: string;
	roomId?: string;
	message?: string;
	name?: string;
	email?: string;
}

const ChatUser = () => {
	const { data: userData } = useGetMeQuery();
	const { data: userChatData = [] } = useGetChatUserQuery();
	const { userEmail } = useParams<{ userEmail: string }>();
	const socket = useRef<WebSocket | null>(null);
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [text, setText] = useState<string>('');
	const chatEndRef = useRef<HTMLDivElement>(null);

	const filteredUserName = useMemo(
		() => userChatData.find((item) => item.email === userEmail),
		[userChatData, userEmail]
	);

	const initWebSocket = useCallback(() => {
		socket.current = new WebSocket(import.meta.env.VITE_PUBLIC_API_WSS);
		socket.current.onopen = () => {
			console.log('WebSocket connection open');
			setIsConnected(true);
		};
		socket.current.onclose = () => {
			console.log('WebSocket connection closed');
			setIsConnected(false);
		};
		socket.current.onerror = (error) =>
			console.error('WebSocket error:', error);
	}, []);

	useEffect(() => {
		initWebSocket();
		return () => socket.current?.close();
	}, [initWebSocket]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
		localStorage.setItem('meetingCallEmail', filteredUserName?.email!);
		if (socket.current) {
			socket.current.onmessage = (event: MessageEvent) => {
				const { payload }: { payload: Message[] } = JSON.parse(event.data);
				setMessages(payload);
			};
		}
		if (isConnected && filteredUserName?.email && userData?.email) {
			const newRoom = `${filteredUserName.email}+${userData.email}`
				.split('+')
				.sort()
				.join('+');
			sendWebSocketMessage({ type: 'getMessage', roomId: newRoom });
		}
	}, [isConnected, filteredUserName, userData, userEmail]);

	const sendWebSocketMessage = (message: Message) => {
		if (socket.current?.readyState === WebSocket.OPEN) {
			socket.current.send(JSON.stringify(message));
		} else {
			console.warn(
				'WebSocket is not open. Ready state is:',
				socket.current?.readyState
			);
		}
	};

	const handleOnEnter = (message: string) => {
		sendWebSocketMessage({
			type: 'message',
			message,
			name: userData?.userName,
			email: userData?.email,
			roomId: `${filteredUserName?.email}+${userData?.email}`
				.split('+')
				.sort()
				.join('+')
		});
		setText('');
	};

	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<div className={scss.ChatUser}>
			<div className={scss.container}>
				<div className={scss.content}>
					<div className={scss.user}>
						<h3>
							{filteredUserName?.firstName} {filteredUserName?.lastName}
						</h3>
						<div className={scss.buttons}>
							<Link to="/call">
								<IconPhone stroke={2} />
							</Link>
						</div>
					</div>
					<ScrollArea h={'80.8vh'}>
						<div className={scss.chat}>
							{messages.map((msg, index) => (
								<p
									className={
										msg.email === userData?.email
											? scss.myMessage
											: scss.otherMessage
									}
									key={index}
								>
									{msg.message}
								</p>
							))}
							<div ref={chatEndRef} />
						</div>
					</ScrollArea>
					<InputEmoji
						value={text}
						onChange={setText}
						cleanOnEnter
						onEnter={handleOnEnter}
						placeholder="Type a message"
						shouldReturn={false}
						shouldConvertEmojiToImage={false}
					/>
				</div>
			</div>
		</div>
	);
};

export default ChatUser;
