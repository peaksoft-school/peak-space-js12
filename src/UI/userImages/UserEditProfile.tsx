import { useRef, useState } from 'react';
import { EditProfileImg } from '@/src/assets/icons';
import scss from './Style.module.scss';

const UserEditProfile: React.FC = () => {
	const [imageSrc, setImageSrc] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleChooseFileButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files ? event.target.files[0] : null;
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target) {
					setImageSrc(e.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className={scss.aside}>
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={handleFileChange}
				
			/>
			<img className={scss.userEditProfile} src={imageSrc} alt="" />
			<EditProfileImg
				onClick={handleChooseFileButtonClick}
				className={scss.editProfileIcon}
			/>
		</div>
	);
};

export default UserEditProfile;
