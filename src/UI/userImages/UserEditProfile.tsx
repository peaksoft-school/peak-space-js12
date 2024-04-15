import { useRef, useState } from 'react';
import { EditProfileImg } from '@/src/assets/icons';
import scss from './Style.module.scss';
import {
	useGetEditQuery,
	usePatchEditMutation
} from '@/src/redux/api/editPage';

const UserEditProfile: React.FC = () => {
	const [imageSrc, setImageSrc] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { data } = useGetEditQuery();
	const [update] = usePatchEditMutation();

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

			if (data && data.id) {
				const formData = new FormData();
				formData.append('newImg', file);
				update({ id: data.id, newImg: formData });
			}
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
			<img
				className={scss.userEditProfile}
				src={imageSrc || data?.profileImage}
				alt=""
			/>
			<EditProfileImg
				onClick={handleChooseFileButtonClick}
				className={scss.editProfileIcon}
			/>
			<div className={scss.bar}>
				{/* Add logic to display user name and edit functionality */}
			</div>
		</div>
	);
};

export default UserEditProfile;
