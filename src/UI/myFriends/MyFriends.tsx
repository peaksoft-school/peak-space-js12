import { useGetMyFriendsQuery } from '@/src/redux/api/myFriends';

const MyFriends = () => {
	const { data, error, refetch } = useGetMyFriendsQuery();
	console.log(data, error, refetch);

	return <div>MyFriends</div>;
};

export default MyFriends;
