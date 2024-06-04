import { useNavigate } from 'react-router-dom';
import foto from '../../../../assets/userStory.png';
import * as iconsReact from '@tabler/icons-react';
import scss from './Style.module.scss';

const CallTime = () => {
	const navigate = useNavigate();
	const navigateToBack = () => {
		navigate('/call');
	};
	return (
		<div className={scss.callTIme}>
			<button onClick={navigateToBack}>
				<iconsReact.IconArrowNarrowLeft />
			</button>
			<div className={scss.content_call}>
				<div className={scss.col}>
					<img src={foto} alt="avatar" />
					<h4>_Bogomdan</h4>
					<p>13:30</p>
					<div className={scss.icons}>
						<button>
							<iconsReact.IconMicrophone />
						</button>
						<button>
							<iconsReact.IconVideo />
						</button>
						<button>
							<iconsReact.IconPhoneCall />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CallTime;
