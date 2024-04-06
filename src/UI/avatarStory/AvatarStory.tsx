import StoryBorder from '../../assets/userStory.png';
import scss from './AvatarStory.module.scss';
const AvatarStory = () => {
	return (
		<div className={scss.div}>
			<img className={scss.img} src={StoryBorder} alt="" />
		</div>
	);
};

export default AvatarStory;
