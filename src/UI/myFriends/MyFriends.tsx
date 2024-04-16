import { useGetMyFriendsQuery } from '@/src/redux/api/myFriends';

const MyFriends = () => {
	const { data: MyFriends = [], error } = useGetMyFriendsQuery();
	return <div>MyFriends</div>;
};

export default MyFriends;
