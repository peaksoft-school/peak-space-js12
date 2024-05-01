import { Link, Route, Routes } from 'react-router-dom';
import { Circle, Zip, SubTract, Info } from '@/src/assets/icons';
import scss from './Style.module.scss';
const ConfidentPage = () => {
	return (
		<div className={scss.section1}>
			<div className={scss.content1}>
				<div className={scss.img_Texting}>
					<div className={scss.Circle}>
						<Circle />
						<p>Редактировать профиль</p>
					</div>
					<div className={scss.zip}>
						<Zip />
						<Link to="/ConfidentTwoRegest">
							<p>Конфиденциальность</p>
						</Link>
					</div>

					<div className={scss.sub_Tract}>
						<SubTract />
						<p>Заблокированные аккаунты</p>
					</div>
					<div className={scss.info}>
						<Info />
						<p>Метки и уведомления</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfidentPage;
