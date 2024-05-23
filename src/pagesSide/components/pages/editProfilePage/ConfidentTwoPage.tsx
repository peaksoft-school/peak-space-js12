import { FC } from 'react';
import scss from './Style.module.scss';
import vector from '../../../../assets/Vector (2).svg';
import { Link } from 'react-router-dom';
import Siwtchback from '@/src/assets/icons/Switchback';
const ConfidentTwoPage: FC = () => {
	return (
		<div className={scss.confident_content}>
			<div className={scss.vector_switch}>
				<div className={scss.vector}>
					<Link to="/settings">
						<img src={vector} alt="" />
					</Link>
					<h2>Конфиденциальность</h2>
				</div>
				<div className={scss.Switch}>
					<p>Закрытый аккаунт </p>
					<Siwtchback />
				</div>
				<div className={scss.lorem_confident}>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna <br /> aliqua.
						Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
						nisi ut aliquip ex ea commodo consequat. <br /> Duis aute irure
						dolor in reprehenderit in voluptate velit esse cillum dolore eu
						fugiat nulla pariatur. <br /> Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est
						laborum.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ConfidentTwoPage;
