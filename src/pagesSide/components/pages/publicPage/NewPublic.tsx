// import { useRef, useState } from 'react';
// import CustomSelect from '@/src/ui/customSelect/CustomSelect';
// import { PencilIcon } from '@/src/assets/icons';
// import scss from './NewPublic.module.scss';
// import { usePostCreateFileMutation } from '@/src/redux/api/publications';
// import { IconCamera } from '@tabler/icons-react';

// const NewPublic: React.FC = () => {
// 	const [createFile] = usePostCreateFileMutation();
// 	const [coverName, setCoverName] = useState<string>('');
// 	const [coverImg, setCoverImg] = useState<string>('');
// 	const [imageSrc, setImageSrc] = useState<string>('');

// 	const fileInputRef = useRef<HTMLInputElement>(null);

// 	const handleChooseCover = () => {
// 		if (fileInputRef.current) {
// 			fileInputRef.current.click();
// 		}
// 	};

// 	const handleAvatar = () => {
// 		if (fileInputRef.current) {
// 			fileInputRef.current.click();
// 		}
// 	};

// 	const handleChangeCover = async (
// 		event: React.ChangeEvent<HTMLInputElement>
// 	) => {
// 		const files = event.target.files;
// 		if (files && files[0]) {
// 			const file = files[0];
// 			const newFileUrls: string[] = [];
// 			const formData = new FormData();

// 			formData.append('file', file);

// 			try {
// 				// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 				const response: any = await createFile(formData as any);
// 				const test = JSON.parse(response.data);
// 				newFileUrls.push(test.object);
// 				setCoverImg(newFileUrls);
// 				setCoverName(file.name);
// 			} catch (error) {
// 				console.error('Error uploading file:', error);
// 			}
// 		}
// 	};

// 	const handleAddAvatar = async (
// 		event: React.ChangeEvent<HTMLInputElement>
// 	) => {
// 		const files = event.target.files;
// 		if (files && files[0]) {
// 			const file = files[0];
// 			const newFileUrls: string[] = [];
// 			const formData = new FormData();

// 			formData.append('file', file);

// 			try {
// 				// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 				const response: any = await createFile(formData as any);
// 				const test = JSON.parse(response.data);
// 				newFileUrls.push(test.object);
// 				setImageSrc(newFileUrls);
// 			} catch (error) {
// 				console.error('Error uploading file:', error);
// 			}
// 		}
// 	};

// 	return (
// 		<div className={scss.container}>
// 			<div className={scss.user_avatar_and_cover}>
// 				<div className={scss.user_cover}>
// 					<img
// 						className={scss.cover_img}
// 						style={{ display: coverImg ? 'block' : 'none' }}
// 						src={coverImg ? coverImg : ''}
// 						alt={coverName}
// 					/>
// 					<input
// 						onChange={handleChangeCover}
// 						type="file"
// 						ref={fileInputRef}
// 						style={{ display: 'none' }}
// 					/>
// 					<div className={scss.cover_choose_btn} onClick={handleChooseCover}>
// 						<PencilIcon className={scss.pencil_icon} />
// 						<p>{coverImg ? 'Изменить обложку' : 'Добавить обложку'}</p>
// 					</div>
// 				</div>
// 				<div className={scss.user_avatar}>
// 					<div className={scss.for}>
// 						<input
// 							type="file"
// 							ref={fileInputRef}
// 							style={{ display: 'none' }}
// 							onChange={handleAddAvatar}
// 						/>
// 						<img className={scss.userEditProfile} src={imageSrc} alt="" />
// 						<IconCamera
// 							color="rgba(255, 255, 255, 0.637)"
// 							onClick={handleAvatar}
// 							className={scss.editProfileIcon}
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 			<div className={scss.public_content}>
// 				<div className={scss.user_name}>
// 					<p>Имя пользователя</p>
// 					<input className={scss.user_name_input} placeholder="Felicity___" />
// 				</div>
// 				<div className={scss.about_public}>
// 					<p>О паблике</p>
// 					<textarea placeholder="Воспылай своим сердцем"></textarea>
// 				</div>
// 				<div className={scss.subject_matter}>
// 					<p>Тематика</p>
// 					<CustomSelect />
// 				</div>
// 				<div className={scss.save_public_button_container}>
// 					<button onClick={() => {}} className={scss.save_public_button}>
// 						Сохранить
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default NewPublic;
import { useRef, useState } from 'react';
import CustomSelect from '@/src/ui/customSelect/CustomSelect';
import { PencilIcon } from '@/src/assets/icons';
import scss from './NewPublic.module.scss';
import { usePostCreateFileMutation } from '@/src/redux/api/publications';
import { IconCamera } from '@tabler/icons-react';

const NewPublic: React.FC = () => {
	const [createFile] = usePostCreateFileMutation();
	const [coverName, setCoverName] = useState<string>('');
	const [coverImg, setCoverImg] = useState<string>('');
	const [imageSrc, setImageSrc] = useState<string>('');

	const coverInputRef = useRef<HTMLInputElement>(null);
	const avatarInputRef = useRef<HTMLInputElement>(null);

	const handleChooseCover = () => {
		if (coverInputRef.current) {
			coverInputRef.current.click();
		}
	};

	const handleAvatar = () => {
		if (avatarInputRef.current) {
			avatarInputRef.current.click();
		}
	};

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			const newFileUrls: string[] = [];
			const formData = new FormData();

			formData.append('file', file);

			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await createFile(formData as any);
				const test = JSON.parse(response.data);
				newFileUrls.push(test.object);
				setCoverImg(newFileUrls);
				setCoverName(file.name);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const handleAddAvatar = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			const newFileUrls: string[] = [];
			const formData = new FormData();

			formData.append('file', file);

			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await createFile(formData as any);
				const test = JSON.parse(response.data);
				newFileUrls.push(test.object);
				setImageSrc(newFileUrls);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	return (
		<div className={scss.container}>
			<div className={scss.user_avatar_and_cover}>
				<div className={scss.user_cover}>
					<img
						className={scss.cover_img}
						style={{ display: coverImg ? 'block' : 'none' }}
						src={coverImg}
						alt={coverName}
					/>
					<input
						onChange={handleFileChange}
						type="file"
						ref={coverInputRef}
						style={{ display: 'none' }}
					/>
					<div className={scss.cover_choose_btn} onClick={handleChooseCover}>
						<PencilIcon className={scss.pencil_icon} />
						<p>{coverImg ? 'Изменить обложку' : 'Добавить обложку'}</p>
					</div>
				</div>
				<div className={scss.user_avatar}>
					<div className={scss.for}>
						<input
							type="file"
							ref={avatarInputRef}
							style={{ display: 'none' }}
							onChange={handleAddAvatar}
						/>
						<img className={scss.userEditProfile} src={imageSrc} alt="" />
						<IconCamera
							color="rgba(255, 255, 255, 0.637)"
							onClick={handleAvatar}
							className={scss.editProfileIcon}
						/>
					</div>
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
				<div className={scss.save_public_button_container}>
					<button onClick={() => {}} className={scss.save_public_button}>
						Сохранить
					</button>
				</div>
			</div>
		</div>
	);
};

export default NewPublic;
