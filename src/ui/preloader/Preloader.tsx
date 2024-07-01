import { FC } from 'react';
import scss from './PreLoader.module.scss';

const PreLoader: FC = () => {
	return (
		<div className={scss.loader}>
			<div className={scss.infinityChrome}>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default PreLoader;
