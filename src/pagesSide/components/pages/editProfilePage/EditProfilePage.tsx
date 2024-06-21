import { useRef, useState } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import ConfidentPage from './ConfidentPage';
import UserEditProfile from '@/src/ui/userImages/UserEditProfile';
import scss from './Style.module.scss';
import { PencilIcon } from '@/src/assets/icons';

const EditProfilePage = () => {
	const options: SelectProps['options'] = [];
	const [isInputsAreaVisible, setIsInputsAreaVisible] =
		useState<boolean>(false);
	const [, setIsPersonHasAWork] = useState<string>('');
	const [coverImg, setCoverImg] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleChooseCover = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleChangeCover = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event?.target.files && event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setCoverImg(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleInputsAreaChangeState = () => {
		setIsInputsAreaVisible((prev) => !prev);
	};

	for (let i = 10; i < 36; i++) {
		options.push({
			value: i.toString(36) + i,
			label: i.toString(36) + i
		});
	}

	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};
	return (
		<div className={scss.section}>
			<ConfidentPage />
			<div className={scss.content}>
				<div className={scss.head}>
					<div className={scss.user_img_and_cover}>
						<div className={scss.edit_img}>
							<UserEditProfile />
						</div>
						<div className={scss.user_cover}>
							<img
								className={scss.cover_img}
								style={{ display: coverImg ? 'block' : 'none' }}
								src={coverImg ? coverImg : ''}
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
							<input type="text" placeholder="Ivanov Ivan" />
						</div>
						<div className={scss.bar}>
							<p> Фамилия</p>
							<input type="text" placeholder="Ivanov Ivan Ivanovich" />
						</div>
						<div className={scss.bar}>
							<p>Имя</p>
							<input type="text" placeholder="Ivanov Ivan Ivanovich" />
						</div>
						<div className={scss.bar}>
							<p>Отчество</p>
							<input type="text" placeholder="Ivanov Ivan Ivanovich" />
						</div>
						<div className={scss.bar}>
							<p>Обо мне</p>
							<textarea placeholder="Express yourself with your heart"></textarea>
						</div>
					</div>
				</div>
				<div
					className={
						isInputsAreaVisible ? scss.Secondary_active : scss.secondary_disable
					}
				>
					<div className={scss.widget}>
						<p className={scss.text}>Среднее образование</p>
						<button
							onClick={handleInputsAreaChangeState}
							className={scss.educations_button}
						>
							+
						</button>
					</div>
					<div className={scss.educations_names_area}>
						<div className={scss.bar}>
							<p>Город</p>
							<input type="text" placeholder="Your city" />
						</div>
						<div className={scss.bar}>
							<p>Школа</p>
							<input type="text" placeholder="Your school" />
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
		</div>
	);
};

export default EditProfilePage;
