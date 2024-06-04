import imgProfil from '../../assets/userProfil.png';
import scss from './Style.module.scss';
const UserProfile = () => {
	return (
		<>
			<img className={scss.userProfile} src={imgProfil} alt="imgProfil" />
		</>
	);
};

export default UserProfile;
