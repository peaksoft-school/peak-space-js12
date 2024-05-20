import { useState } from 'react';
import scss from './PublicPage.module.scss';
import { Link } from 'react-router-dom';

const PublicPage = () => {
	const [activeItem, setActiveItem] = useState<string>('/');
	return (
		<div className={scss.container}>
			<div className={scss.content}>
				<div className={scss.head}>
					<div className={scss.empty_avatar}></div>
					<div className={scss.publics}>
						<p>У вас нет пабликов</p>
						<Link
							className={`${activeItem === 'new-public' ? scss.activePage : scss.newPublic}`}
							to="new-public"
						>
							<button
								onClick={() => setActiveItem('new-public')}
								className={scss.add_new_public_button}
							>
								Создать паблик
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PublicPage;
