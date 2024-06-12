/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	useDeleteIdMutation,
	useEditPublicMutation,
	useGetIdQuery
} from '@/src/redux/api/userPublic';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import scss from './ForMe.module.scss';
import { IconCamera, IconDots } from '@tabler/icons-react';
import { usePostCreateFileMutation } from '@/src/redux/api/publications';
import { PencilIcon } from '@/src/assets/icons';

const ForMe = () => {
	const { communityId } = useParams();
	const { data } = useGetIdQuery(communityId as any);
	const [publics, setPublics] = useState<any[]>([]);
	const [isMessage, setIsMessage] = useState(false);
	const [editRequest] = useEditPublicMutation();
	const [deleteRequest] = useDeleteIdMutation();
	const [isEdit, setIsEdit] = useState(null);
	const [editCover, setEdtiCover] = useState('');
	const [edtiAvatar, setEditAvatar] = useState('');
	const [editTematica, setEditTematica] = useState('');
	const [editPablicName, setEditPablicName] = useState('');
	const [editDescriptionPublic, setEditDescriptionPublic] = useState('');

	const [createFile] = usePostCreateFileMutation();
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
			const formData = new FormData();

			formData.append('file', file);

			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await createFile(formData as any);
				const test = JSON.parse(response.data);
				setEdtiCover(test.object);
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
				setEditAvatar(test.object);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	useEffect(() => {
		if (data) {
			const Data = [
				{
					id: data.publicId,
					cover: data.cover,
					avatar: data.avatar,
					pablicName: data.pablicName,
					userName: data.userName,
					descriptionPublic: data.descriptionPublic,
					tematica: data.tematica,
					countFollower: data.countFollower
				}
			];
			setPublics(Data);
		}
	}, [data]);

	const showMessage = () => {
		setIsMessage(!isMessage);
	};

	const edit = (item: any) => {
		setEdtiCover(item.cover);
		setEditAvatar(item.avatar);
		setEditTematica(item.tematica);
		setEditPablicName(item.pablicName);
		setEditDescriptionPublic(item.descriptionPublic);
		setIsEdit(item.id);
		setIsMessage(false);
	};

	const saveEdit = async (id?: number) => {
		const newData = {
			cover: editCover,
			avatar: edtiAvatar,
			pablicName: editPablicName,
			tematica: editTematica,
			descriptionPublic: editDescriptionPublic
		};
		await editRequest(newData);
		setIsEdit(null);
	};

	const removeId = (publicId: number) => {
		deleteRequest(publicId);
	};

	return (
		<div className={scss.Forme}>
			{publics?.map((item) => (
				<>
					{isEdit === item.id ? (
						<>
							<div className={scss.container}>
								<div className={scss.user_avatar_and_cover}>
									<div className={scss.user_cover}>
										<img
											className={scss.cover_img}
											style={{ display: editCover ? 'block' : 'none' }}
											src={editCover}
											alt="#"
										/>
										<input
											onChange={handleFileChange}
											type="file"
											ref={coverInputRef}
											style={{ display: 'none' }}
										/>
										<div
											className={scss.cover_choose_btn}
											onClick={handleChooseCover}
										>
											<PencilIcon className={scss.pencil_icon} />
											<p>
												{editCover ? 'Изменить обложку' : 'Добавить обложку'}
											</p>
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
											<img
												className={scss.userEditProfile}
												src={edtiAvatar}
												alt=""
											/>
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
											value={editPablicName}
											onChange={(e) => setEditPablicName(e.target.value)}
											placeholder="Felicity___"
										/>
									</div>
									<div className={scss.about_public}>
										<p>О паблике</p>
										<textarea
											value={editDescriptionPublic}
											onChange={(e) => setEditDescriptionPublic(e.target.value)}
											placeholder="Воспылай своим сердцем"
										></textarea>
									</div>
									<div className={scss.subject_matter}>
										<p>Тематика</p>
										<select
											value={editTematica}
											onChange={(e) => setEditTematica(e.target.value)}
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
											onClick={() => setIsEdit(null)}
											className={scss.save_public_button}
										>
											отменить
										</button>
										<button
											onClick={() => saveEdit(item.id)}
											className={scss.save_public_button}
										>
											Сохранить
										</button>
									</div>
								</div>
							</div>
						</>
					) : (
						<>
							<div className={scss.head}>
								<div className={scss.cover_img}>
									<img src={item.cover} alt="Background" />
									<button onClick={showMessage}>
										<IconDots />
									</button>

									<div className={isMessage ? scss.active : scss.default}>
										<p onClick={() => edit(item)}>редактировать</p>
										<span></span>
										<p onClick={() => removeId(item.id)}>удалить</p>
									</div>
								</div>
								<div className={scss.bar}>
									<div className={scss.user_img}>
										<img src={item.avatar} alt="User" />
									</div>
									<div className={scss.side_bar}>
										<div className={scss.start}>
											<div className={scss.bar_aside}>
												<h4>{item.pablicName}</h4>
												<span></span>
												<p>{item.userName}</p>
											</div>
											<h4>{item.descriptionPublic}</h4>
											<p>{item.tematica}</p>
										</div>
										<div className={scss.end}>
											<div>
												<h4>{item.countFollower}</h4>
												<p>участников</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</>
			))}
		</div>
	);
};

export default ForMe;
