import { FC } from 'react';
import scss from './UserInfoLogout.module.scss';
import { IconLogout } from '@tabler/icons-react';
import { Avatar } from 'antd';
import { useGetMeQuery } from '@/src/redux/api/auth';

const UserInfoLogout: FC = () => {
	const { data } = useGetMeQuery();

	const logout = () => {
		
	}

	return (
		<>
			<div className={scss.UserInfoLogout} onClick={(e) => e.stopPropagation()}>
				<div className={scss.content}>
					<div className={scss.user_profile}>
						<Avatar size={40} icon={<img src={data?.avatar} alt="avatar" />} />
						<div className={scss.user_data}>
							<p className={scss.user_name}>{data?.userName}</p>
							<p className={scss.user_email}>{data?.email}</p>
						</div>
					</div>
					<div className={scss.auth}>
						<button className={scss.logout}>
							<IconLogout stroke={2} /> Log Out
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
export default UserInfoLogout;
