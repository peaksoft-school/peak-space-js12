import { useRef, useState } from 'react';
import { EditProfileImg } from '@/src/assets/icons';
import scss from './Style.module.scss';
import EditProfileName from '@/src/assets/icons/EditProfilName';

const UserEditProfile: React.FC = () => {
	const [imageSrc, setImageSrc] = useState<string>('');
	const [userName, setUserName] = useState('Ivanov Ivan');
	const [userNameEdit, setUserNameEdit] = useState('');
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleButtonClick = () => {
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

	const handleEditName = () => {
		setUserNameEdit(userName);
	};

	const handleSaveName = () => {
		setUserName(userNameEdit);
		setUserNameEdit('');
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
				onClick={handleButtonClick}
				className={scss.editProfileIcon}
			/>
			<div className={scss.bar}>
				{userNameEdit ? (
					<input
						type="text"
						value={userNameEdit}
						onChange={(e) => setUserNameEdit(e.target.value)}
						className={scss.title}
					/>
				) : (
					<p className={scss.title}>{userName}</p>
				)}
				{!userNameEdit && <EditProfileName onClick={handleEditName} />}
				{userNameEdit && <button onClick={handleSaveName}>Save</button>}
			</div>
		</div>
	);
};

export default UserEditProfile;
