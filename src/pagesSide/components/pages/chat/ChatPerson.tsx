/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useGetUsersQuery } from '@/src/redux/api/chat';
import {
	IconArrowNarrowLeft,
	IconSend2,
	IconPhoto,
	IconMicrophone,
	IconMoodPlus,
	IconVideo,
	IconPhone
} from '@tabler/icons-react';
import scss from './Style.module.scss';

const ChatPerson = () => {
	const { data: user, isLoading } = useGetUsersQuery();
	const [message, setMessage] = useState<string>('');

	const [showPicker, setShowPicker] = useState(false);

	const handleInputChange = (e: any) => {
		setMessage(e.target.value);
	};

	const handleGetEmoji = (emoji: any) => {
		setMessage((prevInput) => prevInput + emoji.native);
		setShowPicker(false);
	};

	const navigate = useNavigate();
	const arrowNavigate = () => {
		navigate('/chat');
	};

	const navigateToCall = () => {
		setTimeout(() => {
			navigate('/call');
		}, 1000);
	};

	const navigateTVideoCall = () => {
		setTimeout(() => {
			navigate('/videocall');
		}, 1000);
	};

	const ursers = [
		{
			name: '_Bogomdan',
			text: 'Сын божий',
			img: 'https://ca.slack-edge.com/T023L1WBFLH-U05UR1PLN10-13317808de8f-512'
		}
	];

	const handleTextareaResize = (e: any) => {
		e.target.style.height = 'auto';
		e.target.style.height = e.target.scrollHeight + 'px';
	};

	return (
		<div className={scss.chat_person}>
			{isLoading ? (
				<>
					<h1>Loading.....</h1>
				</>
			) : (
				<>
					<div className={scss.box}>
						{user?.map((item) => (
							<div className={scss.aside} key={item.id}>
								<div className={scss.form}>
									<img className={scss.image} src={item.img} alt={item.name} />
									<div className={scss.text}>
										<h1>{item.name}</h1>
										<p>{item.text}</p>
									</div>
								</div>
								<p>{item.title}</p>
							</div>
						))}
					</div>
					<div className={scss.cards}>
						<div className={scss.card}>
							<button>
								<IconArrowNarrowLeft
									onClick={arrowNavigate}
									stroke={1}
									className={scss.arrow}
								/>
							</button>
							{ursers.map((item) => (
								<div className={scss.bar}>
									<img src={item.img} alt="foto" />
									<div className={scss.text}>
										<p className={scss.title_second}>{item.name}</p>
										<p>{item.text}</p>
									</div>
								</div>
							))}
							<div className={scss.icons}>
								<button onClick={navigateToCall}>
									<IconPhone stroke={2} />
								</button>
								<button onClick={navigateTVideoCall}>
									<IconVideo stroke={2} />
								</button>
							</div>
						</div>

						{showPicker && (
							<Picker
								data={data}
								onEmojiSelect={handleGetEmoji}
								theme={'light'}
							/>
						)}

						<div className={scss.send_message}>
							<IconMoodPlus
								onClick={() => setShowPicker((val) => !val)}
								stroke={1.5}
								className={scss.icons}
							/>
							<textarea
								value={message}
								onChange={handleInputChange}
								placeholder="Написать сообщение"
								onInput={handleTextareaResize}
							/>

							<IconMicrophone
								stroke={1.5}
								className={scss.icons}
								style={{
									display: message.trim() === '' ? 'inline-block' : 'none'
								}}
							/>
							<IconPhoto
								stroke={1.5}
								className={scss.icons}
								style={{
									display: message.trim() === '' ? 'inline-block' : 'none'
								}}
							/>
							<IconSend2
								className={scss.icons}
								style={{ display: message.trim() === '' ? 'none' : '' }}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ChatPerson;
