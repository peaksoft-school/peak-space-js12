/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';
import { Select } from 'antd';
import { SelectProps, Skeleton } from 'antd';
import ConfidentPage from './ConfidentPage';
import scss from './Style.module.scss';
import { PencilIcon } from '@/src/assets/icons';
import { useGetUserInfoQuery } from '@/src/redux/api/userEditPage';
import { IconCamera } from '@tabler/icons-react';
import { useEditPageMutation } from '@/src/redux/api/editPage';
import { usePostCreateFileMutation } from '@/src/redux/api/publications';
import CustomButton from '@/src/ui/customButton/CustomButton';

const EditProfilePage = () => {
	const { data, refetch, isLoading, error } = useGetUserInfoQuery();
	const [userProfileData, setUserProfileData] = useState([]);
	const [putRequest] = useEditPageMutation();
	const [createFile] = usePostCreateFileMutation();

	// const [userProfileData, setUserProfileData] = useState<any>({});
	const [avatar, setAvatar] = useState<string>('');
	const fileInputRefAvatar = useRef<HTMLInputElement>(null);
	const [coverImg, setCoverImg] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);

	// const [firstName, setFirstName] = useState<string>('');
	// const [lastName, setLastName] = useState<string>('');
	// const [userName, setUserName] = useState<string>('');
	// const [fathersName, setFathersName] = useState<string>('');
	// const [aboutYourSelf, setAboutYourSelf] = useState<string>('');
	// const [educationResponses, setEducationResponses] = useState<any[]>([]);

	// edit
	const [isEdit, setIsEdit] = useState(null);
	const [editFirstName, setEditFirstName] = useState<string>('');
	const [editLastName, setEditLastName] = useState<string>('');
	const [editUserName, setEditUserName] = useState<string>('');
	const [editFathersName, setEditFathersName] = useState<string>('');
	const [editAboutYourSelf, setEditAboutYourSelf] = useState<string>('');
	const [editEducationResponses, setEditEducationResponses] = useState<any[]>(
		[]
	);

	const edit = (item: any) => {
		setEditFirstName(item.firstName);
		setEditLastName(item.lastName);
		setEditUserName(item.userName);
		setEditFathersName(item.setFathersName);
		setEditAboutYourSelf(item.aboutYourSelf);
		setEditEducationResponses(item.educationResponses);
		setIsEdit(item.id);
	};

	const saveEdit = () => {
		const newData = {
			avatar: avatar,
			cover: coverImg,
			userName: editUserName,
			firstName: editFirstName,
			lastName: editLastName,
			patronymicName: 'string',
			aboutYourSelf: editAboutYourSelf,
			profession: 'string',
			workOrNot: true,
			location: editEducationResponses[0].country
		};
		putRequest(newData);
	};

	const handleChooseCover = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleChooseFileButtonClick = () => {
		if (fileInputRefAvatar.current) {
			fileInputRefAvatar.current.click();
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
				setAvatar(test.object);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const handleInputsAreaChangeState = () => {
		setIsInputsAreaVisible((prev) => !prev);
	};

	const handleChangeCover = async (
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
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	useEffect(() => {
		if (data) {
			const userData = [
				{
					avatar: data.avatar,
					cover: data.cover,
					userName: data.userName,
					email: data.email,
					firstName: data.firstName,
					lastName: data.lastName,
					fathersName: data.fathersName,
					aboutYourSelf: data.aboutYourSelf,
					educationResponses: data.educationResponses,
					profession: data.profession,
					workOrNot: data.workOrNot
				}
			];
			setUserProfileData(userData);
		}
		refetch();
	}, [data, refetch]);

	const options: SelectProps['options'] = [];
	const [isInputsAreaVisible, setIsInputsAreaVisible] =
		useState<boolean>(false);
	const [, setIsPersonHasAWork] = useState<string>('');

	for (let i = 10; i < 36; i++) {
		options.push({
			value: i.toString(36) + i,
			label: i.toString(36) + i
		});
	}

	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	// const handleEducationChange = (
	// 	index: number,
	// 	field: string,
	// 	value: string
	// ) => {
	// 	const updatedEducationResponses = [...educationResponses];
	// 	updatedEducationResponses[index] = {
	// 		...updatedEducationResponses[index],
	// 		[field]: value
	// 	};
	// 	setEducationResponses(updatedEducationResponses);
	// };

	if (isLoading) {
		return (
			<div className={scss.error}>
				<Skeleton.Button active block />
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<div
					style={{
						height: '100vh'
					}}
				>
					<h1
						style={{
							fontFamily: "'Courier New', Courier, monospace",
							fontWeight: 'bold',
							textAlign: 'center'
						}}
					>
						Ошибка загрузки данных
					</h1>
				</div>
			</div>
		);
	}

	return (
		<div className={scss.section}>
			<div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
				{/* <ConfidentPage /> */}
				{userProfileData.map((userData) => (
					<>
						<ConfidentPage />
						<div className={scss.content}>
							<div className={scss.head}>
								<div className={scss.user_img_and_cover}>
									<img src={userData.cover} alt="" />
									<div className={scss.edit_img}>
										<div className={scss.aside}>
											<input
												type="file"
												ref={fileInputRefAvatar}
												style={{ display: 'none' }}
												onChange={handleFileChange}
											/>
											<img
												className={scss.userEditProfile}
												src={avatar ? avatar : userData.avatar}
												alt=""
											/>
											<IconCamera
												color="rgba(255, 255, 255, 0.637)"
												onClick={handleChooseFileButtonClick}
												className={scss.editProfileIcon}
											/>
										</div>
									</div>
									<div className={scss.user_cover}>
										<img
											className={scss.cover_img}
											style={{ display: coverImg ? 'block' : 'none' }}
											src={coverImg ? coverImg : userData.cover}
										/>
										<input
											onChange={handleChangeCover}
											type="file"
											ref={fileInputRef}
											style={{ display: 'none' }}
										/>
										<div
											className={scss.cover_choose_btn}
											onClick={handleChooseCover}
										>
											<PencilIcon className={scss.pencil_icon} />
											<p>
												{coverImg ? 'Изменить обложку' : 'Добавить обложку'}
											</p>
										</div>
									</div>
								</div>

								<div className={scss.body}>
									<div className={scss.bar}>
										<p>Имя пользователя</p>
										<input
											type="text"
											placeholder="Ivanov Ivan"
											value={userData.firstName}
										/>
									</div>
									<div className={scss.bar}>
										<p>Фамилия</p>
										<input
											type="text"
											placeholder="Ivanov Ivan Ivanovich"
											value={userData.lastName}
										/>
									</div>
									<div className={scss.bar}>
										<p>Имя</p>
										<input
											type="text"
											placeholder="Ivanov Ivan Ivanovich"
											value={userData.userName}
										/>
									</div>
									<div className={scss.bar}>
										<p>Отчество</p>
										<input
											type="text"
											placeholder="Ivanov Ivan Ivanovich"
											value={userData.fathersName}
										/>
									</div>
									<div className={scss.bar}>
										<p>Обо мне</p>
										<textarea
											placeholder="Express yourself with your heart"
											value={userData.aboutYourSelf}
										></textarea>
									</div>
								</div>
							</div>
							<div
								className={
									isInputsAreaVisible
										? scss.Secondary_active
										: scss.secondary_disable
								}
							>
								<div className={scss.widget}>
									<p className={scss.text}>Среднее образование</p>
									<button
										onClick={handleInputsAreaChangeState}
										className={scss.educations_button}
									>
										{isInputsAreaVisible ? '-' : '+'}
									</button>
								</div>
								<div className={scss.educations_names_area}>
									<div className={scss.bar}>
										<p>Город</p>
										<input
											type="text"
											placeholder="Your city"
											value={userData.educationResponses[0].country}
										/>
									</div>
									<div className={scss.bar}>
										<p>Школа</p>
										<input
											type="text"
											placeholder="Your school"
											value={
												userData.educationResponses[0].educationalInstitution
											}
										/>
									</div>
								</div>
							</div>

							<div className={scss.grid}>
								<div className={scss.col}>
									<p className={scss.lead}>Позиция</p>
									<Select
										mode="tags"
										style={{ width: '100%' }}
										placeholder="Tags Mode"
										onChange={handleChange}
										options={options}
									/>
									<div className={scss.row}>
										<p style={{ fontWeight: 'bold', fontSize: '20px' }}>
											Положение дел
										</p>
										<div className={scss.radio}>
											<input
												type="radio"
												name="work"
												value="has a work"
												onChange={(e) => setIsPersonHasAWork(e.target.value)}
											/>
											<p>трудоустройство</p>
										</div>
										<div className={scss.radio}>
											<input
												type="radio"
												name="work"
												value="doesn't has a work"
												onChange={(e) => setIsPersonHasAWork(e.target.value)}
											/>
											<p>безработный</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				))}
			</div>
		</div>
	);
};

export default EditProfilePage;
