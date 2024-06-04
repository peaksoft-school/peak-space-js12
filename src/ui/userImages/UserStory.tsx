import userImgStory from '../../assets/userStory.png';
import scss from './Style.module.scss';
const UserStory = () => {
	return (
		<>
			<img className={scss.userStory} src={userImgStory} alt="userImgStory" />
		</>
	);
};

export default UserStory;
