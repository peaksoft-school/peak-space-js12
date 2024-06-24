import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon } from '@/src/assets/icons';
import { IconCamera } from '@tabler/icons-react';
import scss from './NewPublic.module.scss';
import { useCreatePublicMutation } from '@/src/redux/api/userPublic';
import { usePostCreateFileMutation } from '@/src/redux/api/publications';

const NewPublic: React.FC = () => {
	const [createPublic] = useCreatePublicMutation();
	const [createFile] = usePostCreateFileMutation();
	const [coverName, setCoverName] = useState<string>('');
	const [coverImg, setCoverImg] = useState<string>('');
	const [avatarImg, setAvatarImg] = useState<string>('');
	const [pablicName, setPablicName] = useState('');
	const [tematica, setTematica] = useState('');
	const [descriptionPublic, setDescriptionPublic] = useState('');

	const coverInputRef = useRef<HTMLInputElement>(null);
	const avatarInputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

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
			const formData = new FormData();

			formData.append('file', file);

			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await createFile(formData as any);
				const test = JSON.parse(response.data);
				setCoverImg(test.object);
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
			const formData = new FormData();

			formData.append('file', file);

			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await createFile(formData as any);
				const test = JSON.parse(response.data);
				setAvatarImg(test.object);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const CreatePublicUser = async () => {
		const newData = {
			cover: coverImg,
			avatar: avatarImg,
			pablicName: pablicName,
			descriptionPublic: descriptionPublic,
			tematica: tematica
		};
		try {
			const response = await createPublic(newData).unwrap();

			navigate('/public');

			console.log(response, 'full response from createPublic');
		} catch (error) {
			console.error('Error creating public:', error);
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
						<img className={scss.userEditProfile} src={avatarImg} alt="" />
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
					<p>Название Сообщества</p>
					<input
						className={scss.user_name_input}
						value={pablicName}
						onChange={(e) => setPablicName(e.target.value)}
						placeholder="Felicity___"
					/>
				</div>
				<div className={scss.about_public}>
					<p>О паблике</p>
					<textarea
						value={descriptionPublic}
						onChange={(e) => setDescriptionPublic(e.target.value)}
						placeholder="Воспылай своим сердцем"
					></textarea>
				</div>
				<div className={scss.subject_matter}>
					<p>Тематика</p>
					<select
						value={tematica}
						onChange={(e) => setTematica(e.target.value)}
					>
						<option value="">CHOOSE SUBJECT MATTER</option>
						<option value="MOVIE">MOVIE</option>
						<option value="MUSIC">MUSIC</option>
						<option value="IT">IT</option>
						<option value="HORROR">HORROR</option>
						<option value="SPORT">SPORT</option>
						<option value="MULTFILM">MULTFILM</option>
						<option value="ANIME">ANIME</option>
						<option value="MEDICINE">MEDICINE</option>
						<option value="TRANSPORT">TRANSPORT</option>
						<option value="CONSTRUCTION">CONSTRUCTION</option>
						<option value="FINANCE">FINANCE</option>
						<option value="TOURISM">TOURISM</option>
					</select>
				</div>
				<div className={scss.save_public_button_container}>
					<button
						onClick={CreatePublicUser}
						className={scss.save_public_button}
					>
						Сохранить
					</button>
				</div>
			</div>
		</div>
	);
};

export default NewPublic;
