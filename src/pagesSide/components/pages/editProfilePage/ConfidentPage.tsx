import { Link, Route, Routes } from 'react-router-dom';
import Circle from '@/src/assets/icons/Circle';
import Zip from '@/src/assets/icons/Zip';
import SubTract from '@/src/assets/icons/SubTract';
import Info from '@/src/assets/icons/Info';
import scss from './Style.module.scss';
import ConfidentTwoPage from './ConfidentTwoPage';
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
						<Link to="/ConfidentTwoPage">
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
			<Routes>
				<Route path="/ConfidentTwoPage" element={<ConfidentTwoPage />} />
			</Routes>
		</div>
	);
};

export default ConfidentPage;
