import { useNavigate } from 'react-router-dom';
import foto from '../../../../assets/userStory.png';
import { IconMicrophone, IconVideo, IconPhoneCall } from '@tabler/icons-react';
import scss from './Style.module.scss';

const Call = () => {
	const navigate = useNavigate();
	const navigateToCall = () => {
		setTimeout(() => {
			navigate('/calltime');
		}, 1000);
	};
	return (
		<div className={scss.call}>
			<div className={scss.box}>
				<img src={foto} alt="user" />
				<div className={scss.text}>
					<h4>_Bogomdan</h4>
					<p>Соединение...</p>
				</div>
				<div className={scss.icons}>
					<button>
						<IconMicrophone />
					</button>
					<button>
						<IconVideo />
					</button>
					<button onClick={navigateToCall}>
						<IconPhoneCall />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Call;
