import Frame from '@/src/assets/icons/Frame';
import baground from '../../../../assets/album.svg';
import scss from './Style.module.scss';
import user from '../../../../assets/userProfile.png';
import {
	IconBasket,
	IconEdit,
	IconPhoto,
	IconPinned
} from '@tabler/icons-react';
import line from '../../../../assets/line.svg';
import CustomButton from '@/src/UI/customButton/CustomButton';
import { Link, Route, Routes } from 'react-router-dom';
import PhotoWith from './PhotoWith';
import UsersPhoto from './UsersPhoto';

const UsersProfile = () => {
	return (
		<div className={scss.content_Type}>
				<div className={scss.bag_Frame}>
					<img className={scss.bagk} src={baground} alt="" />
					<div>
						<Frame />
					</div>
				</div>
				<div className={scss.teg_is}>
					<div className={scss.user_R}>
						<img className={scss.user} src={user} alt="" />
					</div>
					<div className={scss.every_class}>
						<div className={scss.useb_Line_Sma}>
							<div className={scss.usub_Icon}>
								<h3>Usubalieva</h3>
								<IconEdit />
								<img className={scss.line} src={line} alt="" />
								<p>Myfood</p>
							</div>
							<div className={scss.Samaia}>
								<p>Самая самая </p>
							</div>
							<div className={scss.basket_doctor}>
								<IconBasket color="green" />
								<p>Врач-ортопед </p>
							</div>
						</div>
						<div className={scss.friends}>
							<div className={scss.tens}>
								<div>
									<h4>110</h4>
									<p>друзей </p>
								</div>
								<div>
									<h4>110</h4>
									<p>друзей </p>
								</div>
							</div>
							<div>
								<CustomButton onClick={() => 'hello'}>{'friend'}</CustomButton>
							</div>

							{/* <IconPhoto color="black" /> */}
						</div>
					</div>
				</div>
				<div className={scss.pub_scss}> 
					<div className={scss.public_my}>
						<div className={scss.my_public}>
							<div className={scss.icon_photo}>
								<IconPhoto color="black" />
								<Link to={'usersProfile/userPhoto'}>
									<p>Мои публикации</p>
								</Link>
							</div>
							<div className={scss.icon_pinned}>
								<IconPinned color="black" />
								<Link to={'usersProfile/PhotoWith	'}>
									<p>Фото с вами</p>
								</Link>
							</div>
						</div>
					</div>
					<Routes>
						<Route path="usersProfile/userPhoto" element={<UsersPhoto />} />
						<Route path="usersProfile/PhotoWith" element={<PhotoWith />} />
					</Routes>
				</div>
		</div>
	);
};

export default UsersProfile;
