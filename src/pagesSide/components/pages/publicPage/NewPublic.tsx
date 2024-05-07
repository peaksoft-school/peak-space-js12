import UserEditProfile from '@/src/UI/userImages/UserEditProfile';
import scss from './NewPublic.module.scss';
import CustomSelect from '@/src/UI/customSelect/CustomSelect';

const NewPublic = () => {
	return (
		<div className={scss.container}>
			<div className={scss.user_avatar_and_cover}>
				<div className={scss.user_avatar}>
					<UserEditProfile />
				</div>
			</div>
			<div className={scss.public_content}>
				<div className={scss.user_name}>
					<p>Имя пользователя</p>
					<input className={scss.user_name_input} placeholder="Felicity___" />
				</div>
				<div className={scss.about_public}>
					<p>О паблике</p>
					<textarea placeholder="Воспылай своим сердцем"></textarea>
				</div>
				<div className={scss.subject_matter}>
					<p>Тематика</p>
					<CustomSelect />
				</div>
			</div>
		</div>
	);
};

export default NewPublic;
