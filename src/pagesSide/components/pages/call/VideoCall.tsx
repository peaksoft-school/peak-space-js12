import scss from './Style.module.scss';
import { IconMicrophone, IconVideo, IconPhoneCall } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const VideoCall = () => {
	const navigate = useNavigate();
	const navigateToEndCall = () => {
		navigate('/videoend');
	};
	return (
		<div className={scss.video_call}>
			<div className={scss.video_img}>
				<img
					src="https://s3-alpha-sig.figma.com/img/5241/cf3d/263063a8a026b6f7a7d151f2e4bdc330?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qvlYohdbkTfPMsVUebosO2UPRfIVyKHuRff44LNJQGWTJQsdzMMY81ba65-f0Tx9ZNrHctpU7QScx4-XTgcJCGKuFRm-7doiDcRQasL8bAxZDDoUrcty9IqKrUkaZNbDlVYvAsdAuPKAYO5xedYnxfdfdy1qYJ97~Vekh1-VHiUeFOJW1m69MVvSyLg27yLXOcQykUG2NmAGSktrB9wKQWVgY~YB~KwDJQcmc~AOwEtbhVgKnr404SjFYbYaELLo3rRm5tDtzrgwqZWqc8k-PGQglJUO9JYqAidq7TIDAT0jlaUaS~kUP14~TlQSk9Ib0XH6VyLg5Ee9LeGNjy~-TA__"
					alt="foto"
				/>
			</div>

			<div className={scss.text}>
				<h1>_Bogomdan</h1>
				<p>15:01</p>
			</div>
			<div className={scss.box}>
				<div className={scss.icons}>
					<div className={scss.row}>
						<button>
							<IconMicrophone />
						</button>
						<div>
							<p>микрофон </p>
							<p>включен</p>
						</div>
					</div>
					<div className={scss.row}>
						<button>
							<IconVideo />
						</button>
						<div>
							<p>видео</p>
							<p>включен</p>
						</div>
					</div>
					<div className={scss.row}>
						<button style={{ background: 'red' }} onClick={navigateToEndCall}>
							<IconPhoneCall style={{ color: 'white' }} />
						</button>
						<div>
							<p>завершить </p>
							<p> звонок</p>
						</div>
					</div>
				</div>
				<div className={scss.image}>
					<img
						src="https://s3-alpha-sig.figma.com/img/7cc8/bdc8/6e702c9838b3c26c54b2bd49481ec1e2?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n24e1NrJjqiUk0jrvo~E~c5XAOfsr6~gNTNO3-wdYjBLhee-jxFtZSwwI741K3a-p65ICD3wpRCzda3B2GOLV44KBgJyBT4jSWjBb3Mb61GirWset~JoRk4Z9LFk6b-FZ1xQ1rofhdmgl~RhISfhhm~ZykHY96DQZcRIoRgYkwiOr2iVufDicvXM1xkIV1dhxwaj-WbrO0SgyMXx8rvPx85-EZCpoFaC8qdFym-rRcYCeoX-IcspHzs5jz1PyGhsqqGkXwMpAhF4JKzTygk9zpRARPcAhpIwPOdZbPRgr2BJdL9iYp6SBZLy4V1hQtyjOib6xWl2HubExVk~~iRhVg__"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default VideoCall;
