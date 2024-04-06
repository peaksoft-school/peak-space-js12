import addImgStory from '../../assets/FirstMan.png';
import plusImg from '../../assets/Plusicon.svg';
import scss from './UerImages.module.scss';
const AddStory = () => {
	return (
		<>
			<img src={addImgStory} alt="" />
			<img className={scss.plusImg} src={plusImg} alt="" />
		</>
	);
};

export default AddStory;
