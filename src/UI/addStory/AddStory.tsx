import firstImg from '../../assets/firrsMan.png';
import plusImg from '../../assets/Plusicon.svg';
import scss from './AddStory.module.scss';
const AddStory = () => {
	return (
		<div>
			<img className={scss.firstMan} src={firstImg} alt="" />
			<img className={scss.plusImg} src={plusImg} alt="" />
		</div>
	);
};

export default AddStory;
