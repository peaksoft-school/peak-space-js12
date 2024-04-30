import scss from './MainPage.module.scss';
import MainPost from './MainPost';
import MainStory from './MainStory';

const MainPage = () => {
	return (
		<>
			<div className={scss.MainPage}>
				<div className={scss.container}>
					<div className={scss.content}>
						<MainStory />
						<MainPost />
					</div>
				</div>
			</div>
		</>
	);
};

export default MainPage;
