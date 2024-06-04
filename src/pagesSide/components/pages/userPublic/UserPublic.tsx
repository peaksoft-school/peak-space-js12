/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import PublicFotos from './PublicFotos';
import PublicVideo from './PublicVideo';
import { IconEdit , IconPhotoVideo, IconPhoto } from '@tabler/icons-react';
import scss from './Style.module.scss';

const UserPublic = () => {
	const [, setActiveItem] = useState<string>('/');

	return (
		<div className={scss.main_page}>
			<div className={scss.aside}>
				<div className={scss.head}>
					<div>
						<img
							src={
								'https://s3-alpha-sig.figma.com/img/38ce/fde2/8d4d4905f82d6125c313a1f3a2867b1c?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b79MQyDX4XuJp5s-RhxyIXO7zQxTaeOYHkh1WVunHFcR4KF5CcA7MVPKQH8Ud1PMGOziDvy380C5KkEjvNFxwr6f~AMRIN9g0iMlvUc37kv40QcByB5zpuP7ZGbG2kKRoGW7IjJeql-vyUon1dHCRo~w-NDyrWH6S~NKkyT6654cC7DB5sVhbh~citbUWv8luDoqiEaVNYndoV2au32DSOWQttG7dgVTdj6hE-fQ4I5sGVAMjFK00l9mSA8-iT8YrSIltcY7Ujt6bLgX62or7HuDOtvkEWdlnFT1dbe~cqIg~Hb9h4z~If--MOuayPPoKEHwLBYNHXcvnjDEspHZgg__'
							}
							alt="photo"
						/>
					</div>
					<div className={scss.bar}>
						<div>
							<img
								src={
									'https://s3-alpha-sig.figma.com/img/e130/95cb/b2621f3e3ad04474652a4b375b683d50?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=URq0AHwrwkEoAMND37clOPLizIcyLZo8DMkJzfS9sBdOTkcD4O16Yd-iUW3VVNq~x7FVWI9ucJB8g4~5WdsdXnwhvVBb8z~mNi6O7Qi8nHEB78-~sSuXxvbBcAiD~EKjKrUE-TJx1tW~TyHonKh42ALEI4FCUVIrp1DiFpJAzDWp6tTSuK-3Iidv2hFFceL~PHUjT9dQaraBzlitNosc1uOVS8Vk9tQIUi0Lle2BA~HSOtVfan5aSjkVdw9PgJCpmK8tqQjskjvwLvIT99zgiUvAWidrlKa1uEvVdEzwrQQUBsj8h0Tb6DXmBfsb-EWEXYKjp7kV86WG7XJRZrRjwQ__'
								}
								alt="photo"
							/>
						</div>
						<div className={scss.sidebar}>
							<div className={scss.col}>
								<div
									style={{ display: 'flex', gap: '5px', alignItems: 'center' }}
								>
									<h4>Felicity__</h4>
									<IconEdit color=" #000000B2" />
								</div>
								<div>
									<p>Я един с силой, сила течет во мне</p>
								</div>
								<div className={scss.mobile}>
									<div
										style={{
											display: 'flex',
											gap: '5px',
											alignItems: 'center'
										}}
									>
										<p style={{ fontSize: '13.2px', color: 'gray' }}>
											Фотограф
										</p>
									</div>
								</div>
							</div>
							<div className={scss.far}>
								<div className={scss.active_modal}>
									<h4>365</h4>
									<p>паблики</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={scss.links}>
					<div>
						<Link
							className={`${location.pathname === 'public-photos' ? scss.active_page : scss.link}`}
							to="public-photos"
							onClick={() => setActiveItem('public-photos')}
						>
							<IconPhoto color="black" />
							<p>фотографии</p>
						</Link>
					</div>
					<div>
						<Link
							className={`${location.pathname === 'public-video' ? scss.active_page : scss.link}`}
							to="public-video"
							onClick={() => setActiveItem('public-video')}
						>
							<IconPhotoVideo color="black" />
							<p>видео</p>
						</Link>
					</div>
				</div>

				<div>
					<Routes>
						<Route path="/public-photos*" element={<PublicFotos />} />
						<Route path="/public-video*" element={<PublicVideo />} />
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default UserPublic;
