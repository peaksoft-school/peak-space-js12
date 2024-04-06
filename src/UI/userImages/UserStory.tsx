import userImgStory from '../../assets/userStory.png';
import scss from './UerImages.module.scss';
const UserStory = () => {
	return (
		<>
			<img className={scss.userStory} src={userImgStory} alt="" />
		</>
	);
};

export default UserStory;
