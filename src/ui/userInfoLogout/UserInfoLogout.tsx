import { FC, useState } from 'react';
import scss from './UserInfoLogout.module.scss';
import elipse from '../../assets/Rectangle 76.svg';
import { IconLogout } from '@tabler/icons-react';
import { Avatar } from 'antd';
import { useGetMeQuery } from '@/src/redux/api/auth';
import { useNavigate } from 'react-router-dom';

const UserInfoLogout: FC = () => {
	const { data } = useGetMeQuery();
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const navigate = useNavigate();

	const toggleDropdown = () => {
		setDropdownVisible(!dropdownVisible);
	};

	const handleLogout = () => {
		navigate('/auth/login');
		setDropdownVisible(false);
	};

	return (
		<div className={scss.UserInfoLogout} onClick={(e) => e.stopPropagation()}>
			<div className={scss.user_profile} onClick={toggleDropdown}>
				<Avatar size={40} icon={<img src={elipse} alt="avatar" />} />
				<p className={scss.user_name}>{data?.userName}</p>
			</div>
			{dropdownVisible && (
				<div
					className={`${scss.dropdown} ${dropdownVisible ? scss.dropdownVisible : ''}`}
					onClick={(e) => e.stopPropagation()}
					style={{ marginTop: '6rem' }}
				>
					<div className={scss.user_data}>
						<button className={scss.logout} onClick={handleLogout}>
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
