import scss from './Style.module.scss';
import MicrophoneImg from '@/src/assets/icons/MicrophoneImg';
import { ArrowImg, CallImg, VidoeImg } from '@/src/assets/icons';
import foto from '../../../../assets/userStory.png';

const CallTime = () => {
	return (
		<div className={scss.call_Time}>
			<ArrowImg />
			<div className={scss.box}>
				<div className={scss.image}>
					<img src={foto} alt="foto" />
				</div>
				<div className={scss.text}>
					<h1>_Bogomdan</h1>
					<p>13:30</p>
				</div>
				<div className={scss.icons_time}>
					<MicrophoneImg />
					<VidoeImg />
					<CallImg className={scss.call_icon} />
				</div>
			</div>
		</div>
	);
};

export default CallTime;
