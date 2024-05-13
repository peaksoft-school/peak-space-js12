import { Link, Route, Routes, useLocation } from 'react-router-dom';
import scss from './Style.module.scss';
import { IconPhoto, IconPhotoVideo } from '@tabler/icons-react';
import { useState } from 'react';
import PublicsPhoto from './PublicsPhoto';
import PublicsVideo from './PublicsVideo';
const Publics = () => {
	const [, setLocaltion] = useState('/');
	const { pathname } = useLocation();
	const links = [
		{
			link: 'publics/photo',
			title: 'фотографии'
		},
		{
			link: 'publics/video',
			title: 'видео'
		}
	];
	return (
		<div className={scss.Publics}>
			<div className={scss.content}>
				<div className={scss.head}>
					<div>
						<img
							src={
								'https://i.pinimg.com/564x/ca/6b/7d/ca6b7d0fd21f3d8fcf6513de3943081d.jpg'
							}
							alt=""
						/>
					</div>
					<div className={scss.bar}>
						<div className={scss.user_img}>
							<img
								src={
									'https://s3-alpha-sig.figma.com/img/e476/d620/e74b72d5e3d21c3f2aaccbe6ab54ff3f?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=I2nz1ArZw33avlGO7RkB7nJJQ8nb9Ja3kz9SmYYpq7PquuL31ruoEcbQpIzgypVOWBDPpm2j6yzUuLCpZmqGaBwgTHbrdWUEenjZNfLKyZ61Lnp-mgG~kAzqsssn45jDGXIqEKDZggzkWJxehdwBVkAgf9q3s0EXxeTjNsvoTtjMcnTaivCYJzVyAvmAcnJ6eUAA4ot7P5SAadLiebqmYKaAJxOYc~T-1ZhAhuIpCSOVV5fkzSyQRLRcL2VIw1HzPxwl2EzYa7t~GbDiSVTI1nDDLlV8m7IC9h4d7b8xaUt4uz2CupzM8vi5D8gKVLDWhQKmYeH2cNkDWLubfcptdA__'
								}
								alt=""
							/>
						</div>
						<div className={scss.side_bar}>
							<div className={scss.start}>
								<div className={scss.bar_aside}>
									<h4>Myfood</h4>
									<span></span>
									<p>Usubalieva</p>
								</div>
								<h4>Еду ем</h4>
								<p>еда</p>
							</div>
							<div className={scss.end}>
								<div>
									<h4>500</h4>
									<p>участников</p>
								</div>
								<button>Присоединиться</button>
							</div>
						</div>
					</div>
				</div>
				<div className={scss.links}>
					{links.map((linkItem, index) => (
						<Link
							key={index}
							className={`${pathname === linkItem.link ? scss.active_style : scss.default_style}`}
							to={linkItem.link}
							onClick={() => setLocaltion(linkItem.link)}
						>
							{index === 0 ? (
								<IconPhoto color="black" />
							) : (
								<IconPhotoVideo color="black" />
							)}
							<p>{linkItem.title}</p>
						</Link>
					))}
				</div>
				<div>
					<Routes>
						<Route path="publics/photo" element={<PublicsPhoto />} />
						<Route path="publics/video" element={<PublicsVideo />} />
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default Publics;
