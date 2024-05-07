import { useGetUsersprofileQuery } from '@/src/redux/api/usersProfile';
import scss from './Style.module.scss'
const UsersPhoto = () => {
	const { data, isLoading } = useGetUsersprofileQuery();
	return (
		<div className={scss.content1}>
			{data?.map((item) => (
				<div className={scss.image} key={item.id}>
					<img src={item.img} alt="photo" />
				</div>
			))}
		</div>
	);
};

export default UsersPhoto;
