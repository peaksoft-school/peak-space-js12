import profilImg from '../../assets/profileImg.png';
import scss from './ProfilUser.module.scss';
const ProfilUser = () => {
	return (
		<div>
			<img className={scss.profil} src={profilImg} alt="" />
		</div>
	);
};

export default ProfilUser;
