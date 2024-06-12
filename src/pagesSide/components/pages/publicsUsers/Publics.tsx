import { useState } from 'react';
import {
	Link,
	Route,
	Routes,
	useLocation,
	useNavigate
} from 'react-router-dom';
import PublicsPhoto from './PublicsPhoto';
import PublicsVideo from './PublicsVideo';
import { IconPhoto, IconPhotoVideo } from '@tabler/icons-react';
import scss from './Style.module.scss';

const Publics = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [page, setPage] = useState(true);

	const handleProfile = () => {
		navigate('/users-profile/side/public');
	};

	// useEffect(() => {
	// 	if (page) {
	// 		navigate('/publics/photo');
	// 	} else {
	// 		navigate('/publics/video');
	// 	}
	// }, [page, navigate]);

	const links = [
		{
			link: '/publics/photo',
			title: 'фотографии',
			icon: <IconPhoto color="black" />,
			isPage: true
		},
		{
			link: '/publics/video',
			title: 'видео',
			icon: <IconPhotoVideo color="black" />,
			isPage: false
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
							alt="Background"
						/>
					</div>
					<div className={scss.bar}>
						<div className={scss.user_img}>
							<img
								src={
									'https://s3-alpha-sig.figma.com/img/e476/d620/e74b72d5e3d21c3f2aaccbe6ab54ff3f?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cCLwLNOcFbyCB0wIYQmfM91IQeWUewjWvLAdxRlogeg7m8zX4tgxaIE5tilAOctjgI5yrZRevcRcbtcl7Ka37FdQZZgeK4ZVE~yUoMDQJrea4h8yfSGigMAQiBZ-uA2mrcI3nLw~dlkbvNHUbm9IGRQT0-XOTQMRjGilYbhx-25WLOI9fWIGu2qF98I0fjCBq3jpCqpWISIj~LD0iPq9M7UQpFKbKxSgNjzpq7dSHWR8aaACtegTCMMydcB5EFTUjxwQfqtr5~Cgj9Xt~pQ-EAW0G8AEN8V7zpIndP8syQlFj6yf3QN9A9DZO3DUJzC~qNcbp5nSt1X2~ctwS~4IuQ__'
								}
								alt="User"
							/>
						</div>
						<div className={scss.side_bar}>
							<div className={scss.start}>
								<div className={scss.bar_aside}>
									<h4>Myfood</h4>
									<span></span>
									<p onClick={handleProfile}>Usubalieva</p>
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
							onClick={() => setPage(linkItem.isPage)}
						>
							{linkItem.icon}
							<p>{linkItem.title}</p>
						</Link>
					))}
				</div>
				<div>
					<Routes>
						<Route path="/photo" element={<PublicsPhoto />} />
						<Route path="/video" element={<PublicsVideo />} />
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default Publics;
