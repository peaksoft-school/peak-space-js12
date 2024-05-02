import scss from './PublicPage.module.scss';

const PublicPage = () => {
	return (
		<div className={scss.container}>
			<div className={scss.content}>
				<div className={scss.head}>
					<div className={scss.empty_avatar}></div>
					<div className={scss.publics}>
						<p>У вас нет пабликов</p>
						<button className={scss.addNewPublicButton}>Создать паблик</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PublicPage;
