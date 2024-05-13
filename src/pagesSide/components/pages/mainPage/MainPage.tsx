import MainPost from './MainPost';
import MainStory from './MainStory';
import scss from './Style.module.scss';

const MainPage = () => {
	return (
		<>
			<div className={scss.Main_page}>
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
