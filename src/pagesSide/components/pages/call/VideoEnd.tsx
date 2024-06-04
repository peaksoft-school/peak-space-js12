import { useNavigate } from 'react-router-dom';
import foto from '../../../../assets/userStory.png';
import foto2 from '../../../../assets/FirstMan2.png';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import scss from './Style.module.scss';

const VideoEnd = () => {
	const navigate = useNavigate();
	const navigateToBack = () => {
		navigate('/videocall');
	};

	return (
		<div className={scss.video_end}>
			<div className={scss.image}>
				<img
					src="https://s3-alpha-sig.figma.com/img/5241/cf3d/263063a8a026b6f7a7d151f2e4bdc330?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qvlYohdbkTfPMsVUebosO2UPRfIVyKHuRff44LNJQGWTJQsdzMMY81ba65-f0Tx9ZNrHctpU7QScx4-XTgcJCGKuFRm-7doiDcRQasL8bAxZDDoUrcty9IqKrUkaZNbDlVYvAsdAuPKAYO5xedYnxfdfdy1qYJ97~Vekh1-VHiUeFOJW1m69MVvSyLg27yLXOcQykUG2NmAGSktrB9wKQWVgY~YB~KwDJQcmc~AOwEtbhVgKnr404SjFYbYaELLo3rRm5tDtzrgwqZWqc8k-PGQglJUO9JYqAidq7TIDAT0jlaUaS~kUP14~TlQSk9Ib0XH6VyLg5Ee9LeGNjy~-TA__"
					alt="foto"
				/>
			</div>
			<button onClick={navigateToBack}>
				<IconArrowNarrowLeft />
			</button>

			<div className={scss.box}>
				<div className={scss.img_user}>
					<img className={scss.img1} src={foto} alt="avatar" />
					<img className={scss.img2} src={foto2} alt="avatar" />
				</div>
				<div className={scss.text}>
					<h1>_Bogomdan</h1>
					<p>15:01</p>
				</div>
			</div>
		</div>
	);
};

export default VideoEnd;
