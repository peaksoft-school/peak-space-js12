import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getFriends: builder.query<
			FRIENDS.GetFriendsResponse,
			FRIENDS.GetFriendsRequest
		>({
			query: (idUser) => ({
				url: `/publics/profile-friends/${idUser}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),
		getPhotoFriend: builder.query<
			FRIENDS.GetPhotoFriendResponse,
			FRIENDS.GetPhotoFriendRequest
		>({
			query: (idUser) => ({
				url: `publics/${idUser}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		})
	})
});

export const { useGetFriendsQuery, useGetPhotoFriendQuery } = api;
