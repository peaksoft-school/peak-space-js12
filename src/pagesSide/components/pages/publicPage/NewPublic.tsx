import { useRef, useState } from 'react';
import UserEditProfile from '@/src/ui/userImages/UserEditProfile';
import scss from './NewPublic.module.scss';
import CustomSelect from '@/src/ui/customSelect/CustomSelect';
import { PencilIcon } from '@/src/assets/icons';

const NewPublic: React.FC = () => {
	const [coverName, setCoverName] = useState<string>('');
	const [coverImg, setCoverImg] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleChooseCover = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleChangeCover = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		const reader = new FileReader();
		if (file) {
			reader.onload = (e) => {
				if (e.target) {
					setCoverImg(e.target.result as string);
				}
			};
			setCoverName(file.name);
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className={scss.container}>
			<div className={scss.user_avatar_and_cover}>
				<div className={scss.user_cover}>
					<img
						className={scss.cover_img}
						style={{ display: coverImg ? 'block' : 'none' }}
						src={coverImg ? coverImg : ''}
						alt={coverName}
					/>
					<input
						onChange={handleChangeCover}
						type="file"
						ref={fileInputRef}
						style={{ display: 'none' }}
					/>
					<div className={scss.cover_choose_btn} onClick={handleChooseCover}>
						<PencilIcon className={scss.pencil_icon} />
						<p>{coverImg ? 'Изменить обложку' : 'Добавить обложку'}</p>
					</div>
				</div>
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
