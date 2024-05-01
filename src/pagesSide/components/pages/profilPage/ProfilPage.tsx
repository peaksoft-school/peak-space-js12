import { Link, Route, Routes } from 'react-router-dom';
import Publications from './Publications';
import Favourites from './Favourites';
import PhotoWith from './PhotoWith';
import userProfilImg from '../../../../assets/FirstMan2.png';
import backgroundImg from '../../../../assets/backgroundWhite.jpeg';

import { useState } from 'react';
import scss from './Style.module.scss';
import { IconEdit } from '@tabler/icons-react';
import { IconBasket } from '@tabler/icons-react';
import { IconPhoto } from '@tabler/icons-react';
import { IconHeart } from '@tabler/icons-react';
import { IconPinned } from '@tabler/icons-react';

const ProfilPage = () => {
	const [activeItem, setActiveItem] = useState<string>('/');

	return (
		<div className={scss.mainPage}>
			<div className={scss.aside}>
				<div className={scss.head}>
					<div>
						<img src={backgroundImg} alt="" />
					</div>
					<div className={scss.bar}>
						<div className={scss.userImg}>
							<img src={userProfilImg} alt="" />
						</div>
						<div className={scss.sidebar}>
							<div className={scss.col}>
								<div
									style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
								>
									<h4>Ivanov ivan</h4>
									<IconEdit />
								</div>
								<div>
									<p>Что-то что-то</p>
								</div>
								<div className={scss.mobile}>
									<div
										style={{
											display: 'flex',
											gap: '5px',
											alignItems: 'center'
										}}
									>
										<IconBasket color="green" />
										<p style={{ fontSize: '13.4px', color: 'gray' }}>
											Фотограф
										</p>
									</div>
								</div>
							</div>
							<div className={scss.far}>
								<div>
									<h4>110</h4>
									<p>друзей </p>
								</div>
								<div>
									<h4>365</h4>
									<p>сообщества</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={scss.links}>
					<div>
						<Link
							className={`${activeItem === 'side/public' ? scss.activePage : scss.link}`}
							to="side/public"
							onClick={() => setActiveItem('side/public')}
						>
							<IconPhoto color="black" />
							<p>Мои публикации</p>
						</Link>
					</div>
					<div>
						<Link
							className={`${activeItem === 'side/favorite' ? scss.activePage : scss.link}`}
							to="side/favorite"
							onClick={() => setActiveItem('side/favorite')}
						>
							<IconHeart color="black" />
							<p>Избранное</p>
						</Link>
					</div>
					<div>
						<Link
							className={`${activeItem === 'side/photo' ? scss.activePage : scss.link}`}
							to="side/photo"
							onClick={() => setActiveItem('side/photo')}
						>
							<IconPinned color="black"/>
							<p>Фото с вами</p>
						</Link>
					</div>
				</div>

				<div>
					<Routes>
						<Route path="side/public" element={<Publications />} />
						<Route path="side/favorite" element={<Favourites />} />
						<Route path="side/photo" element={<PhotoWith />} />
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default ProfilPage;
