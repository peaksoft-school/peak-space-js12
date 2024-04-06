import imgProfil from '../../assets/userProfil.png';
import scss from './UerImages.module.scss';
const UserProfile = () => {
	return (
		<>
			<img className={scss.userProfile} src={imgProfil} alt="" />
		</>
	);
};

export default UserProfile;
