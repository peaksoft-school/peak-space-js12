import { FC } from 'react';
import scss from './PreloaderSpinner.module.scss';

const PreloaderSpinner: FC = () => {
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

export default PreloaderSpinner;
