import { EditProfileImg } from '@/src/assets/icons';
import fisrtMan from '../../assets/FirstMan2.png';
import scss from './Style.module.scss';
import EditProfilName from '@/src/assets/icons/EditProfilName';
const UserEditProfile = () => {
	return (
		<>
			<div className={scss.aside}>
				<img className={scss.userEditProfile} src={fisrtMan} alt="" />
				<EditProfileImg className={scss.editProfileIcon} />
				<div className={scss.bar}>
					<p className={scss.title}>Ivanov ivan</p>
					<EditProfilName />
				</div>
			</div>
		</>
	);
};

export default UserEditProfile;
