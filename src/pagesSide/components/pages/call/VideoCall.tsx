import scss from './Style.module.scss';
import MicrophoneImg from '@/src/assets/icons/MicrophoneImg';
import { CallImg, VidoeImg } from '@/src/assets/icons';
const VideoCall = () => {
	return (
		<div className={scss.video_call}>
			<div className={scss.video_img}>
				<img src="https://a.d-cd.net/LkAAAgIZUeA-1920.jpg" alt="foto" />
			</div>

			<div className={scss.text}>
				<h1>_Bogomdan</h1>
				<p>15:01</p>
			</div>
			<div className={scss.box}>
				<div className={scss.icons}>
					<div>
						<MicrophoneImg />
						<p>микрофон </p>
						<p>включен</p>
					</div>
					<div>
						<VidoeImg />
						<p>видео</p>
						<p>включен</p>
					</div>
					<div>
						<CallImg className={scss.call_icon} />
						<p>завершить </p>
						<p> звонок</p>
					</div>
				</div>
				<div className={scss.image}>
					<img
						src="https://ca.slack-edge.com/T023L1WBFLH-U05UR1PLN10-d76277dee9b1-512"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default VideoCall;
