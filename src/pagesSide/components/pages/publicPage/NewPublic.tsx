import UserEditProfile from '@/src/UI/userImages/UserEditProfile';
import scss from './NewPublic.module.scss';
import CustomSelect from '@/src/UI/customSelect/CustomSelect';

const NewPublic = () => {
	return (
		<div className={scss.container}>
			<div className={scss.userAvatarAndCover}>
				<div className={scss.userAvatar}>
					<UserEditProfile />
				</div>
			</div>
			<div className={scss.publicContent}>
				<div className={scss.userName}>
					<p>Имя пользователя</p>
					<input className={scss.userNameInput} placeholder="Felicity___" />
				</div>
				<div className={scss.aboutPublic}>
					<p>О паблике</p>
					<textarea placeholder="Воспылай своим сердцем"></textarea>
				</div>
				<div className={scss.subjectMatter}>
					<p>Тематика</p>
					<CustomSelect />
				</div>
			</div>
		</div>
	);
};

export default NewPublic;
