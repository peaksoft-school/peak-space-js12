import scss from './EditProfilePage.module.scss';
import CustomSelect from '@/src/ui/customSelect/CustomSelect';
import UserEditProfile from '@/src/ui/userImages/UserEditProfile';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
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
			<div className={scss.content}>
				<div className={scss.head}>
					<div className={scss.edit_img}>
						<UserEditProfile />
					</div>

					<div className={scss.body}>
						<div className={scss.bar}>
							<p>Username</p>
							<input type="text" placeholder="Ivanov Ivan" />
						</div>
						<div className={scss.bar}>
							<p>Full Name</p>
							<input type="text" placeholder="Ivanov Ivan Ivanovich" />
						</div>
						<div className={scss.bar}>
							<p>About Me</p>
							<textarea placeholder="Express yourself with your heart"></textarea>
						</div>
					</div>
				</div>
				<div className={scss.Secondary}>
					<div className={scss.widget}>
						<p className={scss.text}>Secondary Education</p>
						<div className={scss.inner}>
							<p>City</p>
							<CustomSelect />
						</div>
						<div className={scss.inner}>
							<p>School</p>
							<CustomSelect />
						</div>
					</div>
				</div>
				{/* <div className={scss.Secondary}>
					<div className={scss.widget}>
						<p className={scss.text}>Higher Education</p>
						<div className={scss.inner}>
							<p>City</p>	
							<CustomSelect />
						</div>
						<div className={scss.inner}>
							<p>University</p>
							<CustomSelect />
						</div>
					</div>
				</div> */}
				<div className={scss.grid}>
					<div className={scss.col}>
						<p className={scss.lead}>Position</p>
						<Select
							mode="tags"
							style={{ width: '100%' }}
							placeholder="Tags Mode"
							onChange={handleChange}
							options={options}
						/>
						<div className={scss.row}>
							<p style={{ fontWeight: 'bold', fontSize: '20px' }}>Status</p>
							<div className={scss.radio}>
								<input type="radio" /> <p>Employed</p>
							</div>
							<div className={scss.radio}>
								<input type="radio" /> <p>Unemployed</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfilePage;
