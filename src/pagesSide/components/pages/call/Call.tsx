import scss from './Style.module.scss';
import MicrophoneImg from '@/src/assets/icons/MicrophoneImg';
import { CallImg, VidoeImg } from '@/src/assets/icons';
import foto from '../../../../assets/userStory.png';

const Call = () => {
	return (
		<div className={scss.call}>
			<div className={scss.box}>
				<div className={scss.image}>
					<img src={foto} alt="foto" />
				</div>
				<div className={scss.text}>
					<h1>_Bogomdan</h1>
					<p>Соединение...</p>
				</div>
				<div className={scss.icons}>
					<MicrophoneImg />
					<VidoeImg />
					<CallImg className={scss.call_icon} />
				</div>
			</div>
		</div>
	);
};

export default Call;
