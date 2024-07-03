import { FC, useState } from 'react';
import scss from './UserInfoLogout.module.scss';
import { IconLogout } from '@tabler/icons-react';
import { Avatar } from 'antd';
import { useGetMeQuery } from '@/src/redux/api/auth';

const UserInfoLogout: FC = () => {
	const { data } = useGetMeQuery();
	const [dropdownVisible, setDropdownVisible] = useState(false);

	const toggleDropdown = () => {
		setDropdownVisible(!dropdownVisible);
	};

	const closeDropdown = () => {
		setDropdownVisible(false);
	};

	return (
		<div className={scss.UserInfoLogout} onClick={(e) => e.stopPropagation()}>
			<div className={scss.user_profile} onClick={toggleDropdown}>
				<Avatar size={40} icon={<img src={'/src/assets/album.svg'} alt="avatar" />} />
				<p className={scss.user_name}>{data?.userName}</p>
			</div>
			{dropdownVisible && (
				<div
					className={`${scss.dropdown} ${dropdownVisible ? scss.dropdownVisible : ''}`}
					onClick={(e) => e.stopPropagation()}
				>
					<div className={scss.user_data}>
						<p className={scss.user_email}>{data?.email}</p>
						<div className={scss.existing_accounts}>
							<div className={scss.account}>
								<p>{data?.email}</p>
							</div>
						</div>
						<button className={scss.add_account}>+ Добавить аккаунт</button>
						<button className={scss.logout} onClick={closeDropdown}>
							<IconLogout stroke={2} />
							Выйти
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserInfoLogout;
