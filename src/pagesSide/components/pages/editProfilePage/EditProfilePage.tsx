import { Select } from 'antd';
import type { SelectProps } from 'antd';
import ConfidentPage from './ConfidentPage';
import CustomSelect from '@/src/ui/customSelect/CustomSelect';
import UserEditProfile from '@/src/ui/userImages/UserEditProfile';
import scss from './Style.module.scss';

const EditProfilePage = () => {
	const options: SelectProps['options'] = [];

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
					<div className={scss.edit_img}>
						<UserEditProfile />
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
				<div className={scss.Secondary}>
					<div className={scss.widget}>
						<p className={scss.text}>Среднее образование</p>
						<div className={scss.inner}>
							<p>Город </p>
							<CustomSelect />
						</div>
						<div className={scss.inner}>
							<p>Школа</p>
							<CustomSelect />
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
								<input placeholder="/" type="radio" /> <p>трудоустройство</p>
							</div>
							<div className={scss.radio}>
								<input type="radio" placeholder="/" /> <p>Безработные</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfilePage;
