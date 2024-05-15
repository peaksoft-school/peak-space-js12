import scss from './Style.module.scss';
import foto from '../../../../assets/userStory.png';
import foto2 from '../../../../assets/FirstMan2.png';
import { ArrowImg } from '@/src/assets/icons';

const VideoEnd = () => {
	return (
		<div className={scss.video_end}>
			<div className={scss.image}>
				<img src="https://a.d-cd.net/LkAAAgIZUeA-1920.jpg" alt="" />
			</div>

			<ArrowImg />
			<div className={scss.box}>
				<div className={scss.img_user}>
					<img className={scss.img1} src={foto} alt="foto" />
					<img className={scss.img2} src={foto2} alt="foto" />
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
