// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { SelectProps, Skeleton, message } from 'antd';
import ConfidentPage from './ConfidentPage';
import scss from './Style.module.scss';
import { PencilIcon } from '@/src/assets/icons';
import { useGetUserInfoQuery } from '@/src/redux/api/userEditPage';
import { IconCamera } from '@tabler/icons-react';
import { useEditPageMutation } from '@/src/redux/api/editPage';
import { usePostCreateFileMutation } from '@/src/redux/api/publications';
import CustomButtonWhite from '@/src/ui/customButton/CustomButtonWhite';
import CustomButton from '@/src/ui/customButton/CustomButton';
import ModalTs from '@/src/ui/modal/Modal';

interface Type {
	avatar: string;
	cover: string;
	coverImg: string;
	userName: string;
	email: string;
	firstName: string;
	lastName: string;
	fathersName: string;
	aboutYourSelf: string;
	educationResponses: string[];
	profession: string;
	workOrNot: null;
}

const EditProfilePage = () => {
	const { data, refetch, isLoading, error } = useGetUserInfoQuery();

	const [userProfileData, setUserProfileData] = useState<Type>();
	const [putRequest] = useEditPageMutation();
	const [createFile] = usePostCreateFileMutation();

	const [isModal, setIsModal] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const fileInputRefAvatar = useRef<HTMLInputElement>(null);
	const [avatar, setAvatar] = useState<string>('');

	const [coverImg, setCoverImg] = useState<string>('');

	const [editProfession, setEditProfession] = useState<string>('');
	const [editFirstName, setEditFirstName] = useState<string>('');
	const [editLastName, setEditLastName] = useState<string>('');
	const [editUserName, setEditUserName] = useState<string>('');
	const [editFathersName, setEditFathersName] = useState<string>('');
	const [editAboutYourSelf, setEditAboutYourSelf] = useState<string>('');
	const [editEducationResponses, setEditEducationResponses] = useState<any[]>(
		[]
	);
	const [isPersonHasAWork, setIsPersonHasAWork] = useState<string | null>(null);

	const [editCity] = useState<string>('');
	const [editSchool] = useState<string>('');
	const [messageApi, contextHolder] = message.useMessage();

	const success = () => {
		messageApi.open({
			type: 'success',
			content: 'успешно сохранено'
		});
	};

	const saveEdit = async () => {
		const newData = {
			avatar: avatar,
			cover: coverImg,
			userName: editUserName,
			firstName: editFirstName,
			lastName: editLastName,
			patronymicName: editFathersName,
			aboutYourSelf: editAboutYourSelf,
			profession: editProfession,
			workOrNot: true,
			location: editCity,
			educationResponses: [
				{
					id: editEducationResponses[0],
					country: editCity,
					educationalInstitution: editSchool
				}
			]
		};
		const response = await putRequest(newData);
		if (response.data.httpStatus === 'OK') {
			closeModal();
			success();
		}

		refetch();
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
			const userData = {
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
			};
			setUserProfileData(userData as any);
			setCoverImg(data.cover);
			setAvatar(data.avatar);
			setEditProfession(data.profession);
			setEditFirstName(data.firstName);
			setEditLastName(data.lastName);
			setEditUserName(data.userName);
			setEditFathersName(data.fathersName);
			setEditAboutYourSelf(data.aboutYourSelf);
			setEditEducationResponses(data.educationResponses);
			setIsPersonHasAWork(data.workOrNot ? 'has a work' : "doesn't has a work");
		}
		refetch();
	}, [data, refetch]);

	const options: SelectProps['options'] = [];
	const [isInputsAreaVisible, setIsInputsAreaVisible] =
		useState<boolean>(false);

	for (let i = 10; i < 36; i++) {
		options.push({
			value: i.toString(36) + i,
			label: i.toString(36) + i
		});
	}

	const openModal = () => {
		setIsModal(true);
	};

	const closeModal = () => {
		setIsModal(false);
	};

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
				<div style={{ height: '100vh' }}>
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
				<ConfidentPage />
				<div className={scss.content}>
					{contextHolder}
					<div className={scss.head}>
						<div className={scss.user_img_and_cover}>
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
										src={avatar || userProfileData?.avatar}
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
									src={coverImg || userProfileData?.coverImg}
									alt={`cover${userProfileData?.userName}`}
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
									<p>{coverImg ? 'Изменить обложку' : 'Добавить обложку'}</p>
								</div>
							</div>
						</div>
						<div className={scss.body}>
							<div className={scss.bar}>
								<p>Имя пользователя</p>
								<input
									type="text"
									placeholder="Ivanov Ivan"
									value={editFirstName}
									onChange={(e) => setEditFirstName(e.target.value)}
								/>
							</div>
							<div className={scss.bar}>
								<p>Фамилия</p>
								<input
									type="text"
									placeholder="Ivanov Ivan Ivanovich"
									value={editLastName}
									onChange={(e) => setEditLastName(e.target.value)}
								/>
							</div>
							<div className={scss.bar}>
								<p>Имя</p>
								<input
									type="text"
									placeholder="Ivanov Ivan Ivanovich"
									value={editUserName}
									onChange={(e) => setEditUserName(e.target.value)}
								/>
							</div>
							<div className={scss.bar}>
								<p>Отчество</p>
								<input
									type="text"
									placeholder="Ivanov Ivan Ivanovich"
									value={editFathersName}
									onChange={(e) => setEditFathersName(e.target.value)}
								/>
							</div>
							<div className={scss.bar}>
								<p>Обо мне</p>
								<textarea
									placeholder="Express yourself with your heart"
									value={editAboutYourSelf}
									onChange={(e) => setEditAboutYourSelf(e.target.value)}
								></textarea>
							</div>
						</div>
					</div>

					{/* 
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
							{editEducationResponses?.map((el) => (
								<div>
									<div className={scss.bar}>
										<p>Город</p>

										<input
											type="text"
											placeholder="Your city"
											value={el.country}
										/>
									</div>
									<div className={scss.bar}>
										<p>ВУЗ</p>
										<input
											type="text"
											placeholder="Your school"
											value={el.educationalInstitution}
										/>
									</div>
								</div>
							))}
						</div>
					</div> */}

					<div className={scss.grid}>
						<div className={scss.col}>
							<p className={scss.lead}>Должность</p>
							<input
								type="text"
								onChange={(e) => setEditProfession(e.target.value)}
								value={editProfession}
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
										checked={isPersonHasAWork === 'has a work'}
										onChange={(e) => setIsPersonHasAWork(e.target.value)}
									/>
									<p>трудоустройство</p>
								</div>
								<div className={scss.radio}>
									<input
										type="radio"
										name="work"
										value="doesn't has a work"
										checked={isPersonHasAWork === "doesn't has a work"}
										onChange={(e) => setIsPersonHasAWork(e.target.value)}
									/>
									<p>безработный</p>
								</div>

								<ModalTs open={isModal} onCancel={closeModal}>
									<div className={scss.is_modal}>
										<div className={scss.modal}>
											<div className={scss.f}>
												<img
													className={scss.userEditProfile}
													src={avatar || userProfileData?.avatar}
													alt=""
												/>
												<p>Cохранить изменения?</p>
											</div>
											<div className={scss.s}>
												<CustomButton onClick={saveEdit}>
													Сохранить
												</CustomButton>
												<CustomButtonWhite
													children={'отмена'}
													onClick={closeModal}
												/>
											</div>
										</div>
									</div>
								</ModalTs>
								<CustomButton onClick={openModal}>Сохранить</CustomButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfilePage;
