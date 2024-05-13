import { useGetUsersprofileQuery } from '@/src/redux/api/usersProfile';
import scss from './Style.module.scss';
const UsersPhoto = () => {
	const { data, isLoading } = useGetUsersprofileQuery();
	return (
		<div className={scss.content1}>
			{isLoading ? (
				<>
					<h1>Loading ...</h1>
				</>
			) : (
				<>
					{data?.map((item) => (
						<div className={scss.image} key={item.id}>
							<img src={item.img} alt="photo" />
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default UsersPhoto;
// {isLoading ? (
// 	<>
// 		<h1>loading . . .</h1>
// 	</>
// ) : (
// 	<>
// 		{data?.map((item) => (
// 			<div className={scss.photo_user} key={item._id}>
// 				<img src={item.img} alt="" />
// 			</div>
// 		))}
// 	</>
// )}
