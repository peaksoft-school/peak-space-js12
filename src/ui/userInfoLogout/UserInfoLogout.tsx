import { FC, useState } from 'react';
import scss from './UserInfoLogout.module.scss';
import elipse from '../../assets/Rectangle 76.svg';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';

const UserInfoLogout: FC = () => {
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
				<p className={scss.user_name} onClick={handleLogout}>
					log out
				</p>
			</div>
		</div>
	);
};

export default UserInfoLogout;
