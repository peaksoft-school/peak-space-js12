import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getFriends: builder.query<
			FRIENDS.GetFriendsRespose,
			FRIENDS.GetFriendsRequest
		>({
			query: (foundUserId) => ({
				url: `/publics/profile-friends/${foundUserId}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		})
	})
});

export const { useGetFriendsQuery } = api;
