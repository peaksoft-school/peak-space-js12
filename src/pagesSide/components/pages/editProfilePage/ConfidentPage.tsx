import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconUserCircle, IconLock, IconCircleHalf } from '@tabler/icons-react';
import scss from './Style.module.scss';

const ConfidentPage = () => {
	const navigationItems = [
		{
			path: '/settings',
			icon: <IconUserCircle />,
			label: 'Редактировать профиль'
		},
		{ path: '/confindent', icon: <IconLock />, label: 'Конфиденциальность' },
		{
			path: '/blocked',
			icon: <IconCircleHalf className={scss.iconBlock} />,
			label: 'Заблокированные аккаунты'
		}
	];

	const { pathname } = useLocation();
	const navigate = useNavigate();

	const navigateTo = (path: string) => {
		navigate(path);
	};

	return (
		<div className={scss.section1}>
			<div className={scss.content1}>
				<div className={scss.img_texting}>
					{navigationItems.map((item, index) => (
						<li key={index} onClick={() => navigateTo(item.path)}>
							<Link
								className={`${pathname === item.path ? scss.active_page : scss.active_default}`}
								to={item.path}
							>
								{item.icon}
								<p>{item.label}</p>
							</Link>
						</li>
					))}
				</div>
			</div>
		</div>
	);
};

export default ConfidentPage;
