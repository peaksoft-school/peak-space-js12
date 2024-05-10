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
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import PhotoWith from './PhotoWith';
import UsersPhoto from './UsersPhoto';
import { useState } from 'react';

const UsersProfile = () => {
	const [, setActive] = useState('/');
	const { pathname } = useLocation();
	const links = [
		{
			link: 'usersProfile/userPhoto',
			name: 'Мои публикации'
		},
		{
			link: 'usersProfile/PhotoWith',
			name: 'Фото с вами'
		}
	];
	return (
		<div className={scss.content_type}>
			<div className={scss.bag_word}>
				<div className={scss.head1}>
					<div className={scss.heading}>
						<div className={scss.bag_frame}>
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
								<div className={scss.useb_line_Sma}>
									<div className={scss.usub_icon}>
										<h3>Usubalieva</h3>
										<IconEdit />
										<img className={scss.line} src={line} alt="" />
										<p>Myfood</p>
									</div>
									<div className={scss.samaia}>
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
										<CustomButton onClick={() => 'hello'}>
											{'дружить'}
										</CustomButton>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={scss.pub_scss}>
						<div className={scss.public_my}>
							<div className={scss.my_public}>
								{links.map((linkItem, index) => (
									<Link
										key={index}
										className={`${pathname === linkItem.link ? scss.active : scss.default_style}`}
										to={linkItem.link}
										onClick={() => setActive(linkItem.link)}
									>
										{index === 0 ? (
											<IconPhoto color="black" />
										) : (
											<IconPinned color="black" />
										)}
										<p>{linkItem.name}</p>
									</Link>
								))}
							</div>
						</div>
					</div>
					<Routes>
						<Route path="/usersProfile/userPhoto" element={<UsersPhoto />} />
						<Route path="/usersProfile/PhotoWith" element={<PhotoWith />} />
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default UsersProfile;
