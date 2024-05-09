/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetUsersQuery } from '@/src/redux/api/chat';
import scss from './Style.module.scss';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { IconPhone } from '@tabler/icons-react';
import { IconVideo } from '@tabler/icons-react';
import { IconMoodPlus } from '@tabler/icons-react';
import { IconMicrophone } from '@tabler/icons-react';
import { IconPhoto } from '@tabler/icons-react';
import { IconSend2 } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

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
		navigate('/chatMeg');
	};

	const ursers = [
		{
			name: '_Bogomdan',
			text: 'Сын божий',
			img: 'https://s3-alpha-sig.figma.com/img/0c26/d887/ed060b47018885c4c6847048f8a83758?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HMh6SCEthtsRBcvq-InNBlSkR2JKX3vwep38tQPBZCc32zLCNAG1uKTGBHsWowL5aPrbJgmnXsdVdCYU3OfG91u97PyFDPqI-v6uT8oA3vydJFL~BhD~dZtVuyN7o5o4M8EegjUeDoo86YTByxEnM1-hv42~EpE~6fqUg9nhp4pc-LgKgFlTryNI2UUPaynKlYZgWyq-VOQvqv~U18ksz1sSLnxWy3--FLj7qDiLm-rzA4RreV5riABl-eIfiRhSsRImMgX76cYdchLfz~b53dg-812DVHbK1GtnvE2BOSiICtVvbvf9qPrctQOEXt1~OMgc4y8pVILzhAn588M0Mw__'
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
							<IconArrowNarrowLeft
								onClick={arrowNavigate}
								stroke={1}
								className={scss.arrow}
							/>
							{ursers.map((item) => (
								<div className={scss.bar}>
									<img src={item.img} alt="foto" />
									<div className={scss.text}>
										<h1>{item.name}</h1>
										<p>{item.text}</p>
									</div>
								</div>
							))}
							<div className={scss.icons}>
								<IconPhone stroke={1} className={scss.icon} />
								<IconVideo stroke={1} className={scss.icon} />
							</div>
						</div>

						{showPicker && (
							<Picker  data={data} onEmojiSelect={handleGetEmoji} />
						)}

						<div className={scss.input}>
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
