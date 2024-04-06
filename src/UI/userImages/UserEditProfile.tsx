import scss from './Style.module.scss';
import { EditProfileImg, EditProfileName } from '@/src/assets/icons';
import firstMan from '../../assets/FirstMan2.png';

const UserEditProfile = () => {
	return (
		<>
			<div className={scss.aside}>
				<img className={scss.userEditProfile} src={firstMan} alt="firstMan" />
				<EditProfileImg className={scss.editProfileIcon} />
				<div className={scss.bar}>
					<p className={scss.title}>Ivanov Ivan</p>
					<EditProfileName />
				</div>
			</div>
		</>
	);
};

export default UserEditProfile;
